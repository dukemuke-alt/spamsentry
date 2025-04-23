const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const config = require('./config');

// Initialize Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel]
});

// Load banned words from external file
let bannedWords = [];
try {
    bannedWords = JSON.parse(fs.readFileSync('./banned_words.json', 'utf8'));
} catch (error) {
    console.error('Error loading banned words:', error);
    bannedWords = [];
}

// Message cooldown tracking
const messageCooldown = new Map();

// Helper functions
function isSpamMessage(message) {
    const content = message.content.toLowerCase();
    
    // Check for banned words
    if (bannedWords.some(word => content.includes(word.toLowerCase()))) {
        return 'Banned word detected';
    }
    
    // Check for mass mentions
    if (content.includes('@everyone') || content.includes('@here')) {
        return 'Mass mention detected';
    }
    
    // Check for excessive capital letters (more than 70% of message)
    const capitalRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capitalRatio > 0.7) {
        return 'Excessive capital letters detected';
    }
    
    // Enhanced URL checking for Google and YouTube services
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex) || [];
    for (const url of urls) {
        try {
            const domain = new URL(url).hostname.toLowerCase();
            // Check if the domain or any of its parent domains are in the allowed list
            const isDomainAllowed = config.spamSettings.allowedDomains.some(allowed => 
                domain === allowed || domain.endsWith('.' + allowed)
            );
            if (!isDomainAllowed) {
                return 'Suspicious link detected';
            }
        } catch (error) {
            return 'Invalid URL detected';
        }
    }

    // Check for repeated messages (exact same content)
    const recentMessages = messageCooldown.get(message.author.id) || [];
    const isRepeatedMessage = recentMessages.some(msg => msg.content === message.content);
    if (isRepeatedMessage) {
        return 'Repeated message detected';
    }

    // Check for excessive emojis
    const emojiRegex = /<a?:.+?:\d+>|[\u{1F300}-\u{1F9FF}]/gu;
    const emojiCount = (content.match(emojiRegex) || []).length;
    if (emojiCount > config.spamSettings.maxEmojis) {
        return 'Excessive emojis detected';
    }

    // Check for excessive spaces
    if (/\s{4,}/.test(content)) {
        return 'Excessive spacing detected';
    }

    // Check for excessive punctuation
    if (/[!?]{4,}/.test(content)) {
        return 'Excessive punctuation detected';
    }

    // Check for excessive mentions
    const mentionCount = (content.match(/<@!?\d+>/g) || []).length;
    if (mentionCount > config.spamSettings.maxMentions) {
        return 'Excessive mentions detected';
    }

    // Check for excessive line breaks
    if (/\n{4,}/.test(content)) {
        return 'Excessive line breaks detected';
    }

    // Check for excessive special characters
    const specialCharRatio = (content.match(/[^a-zA-Z0-9\s]/g) || []).length / content.length;
    if (specialCharRatio > config.spamSettings.maxSpecialCharRatio) {
        return 'Excessive special characters detected';
    }

    // Check for excessive word repetition
    const words = content.split(/\s+/);
    const wordCounts = {};
    for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
        if (wordCounts[word] > config.spamSettings.maxWordRepetition) {
            return 'Excessive word repetition detected';
        }
    }

    // Check for excessive message length
    if (content.length > config.spamSettings.maxMessageLength) {
        return 'Excessive message length detected';
    }

    // Check for excessive attachments
    if (message.attachments.size > config.spamSettings.maxAttachments) {
        return 'Excessive attachments detected';
    }

    // Check for excessive embeds
    if (message.embeds.length > config.spamSettings.maxEmbeds) {
        return 'Excessive embeds detected';
    }

    // Check for suspicious invite links
    const inviteRegex = /(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+/g;
    if (inviteRegex.test(content)) {
        return 'Suspicious invite link detected';
    }

    // Check for excessive role mentions
    const roleMentionCount = (content.match(/<@&\d+>/g) || []).length;
    if (roleMentionCount > config.spamSettings.maxRoleMentions) {
        return 'Excessive role mentions detected';
    }

    // Check for excessive channel mentions
    const channelMentionCount = (content.match(/<#\d+>/g) || []).length;
    if (channelMentionCount > config.spamSettings.maxChannelMentions) {
        return 'Excessive channel mentions detected';
    }

    // Check for excessive custom emoji
    const customEmojiCount = (content.match(/<a?:.+?:\d+>/g) || []).length;
    if (customEmojiCount > config.spamSettings.maxCustomEmoji) {
        return 'Excessive custom emoji detected';
    }

    // Check for excessive Unicode emoji
    const unicodeEmojiCount = (content.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
    if (unicodeEmojiCount > config.spamSettings.maxUnicodeEmoji) {
        return 'Excessive Unicode emoji detected';
    }

    // Check for excessive spoiler tags
    const spoilerCount = (content.match(/\|\|/g) || []).length / 2;
    if (spoilerCount > config.spamSettings.maxSpoilerTags) {
        return 'Excessive spoiler tags detected';
    }

    // Check for excessive code blocks
    const codeBlockCount = (content.match(/```/g) || []).length / 2;
    if (codeBlockCount > config.spamSettings.maxCodeBlocks) {
        return 'Excessive code blocks detected';
    }

    return false;
}

function checkMessageFlood(message) {
    const userId = message.author.id;
    const now = Date.now();
    
    if (!messageCooldown.has(userId)) {
        messageCooldown.set(userId, []);
    }
    
    const userMessages = messageCooldown.get(userId);
    userMessages.push({
        time: now,
        content: message.content
    });
    
    // Remove messages older than TIME_WINDOW
    const recentMessages = userMessages.filter(msg => now - msg.time < config.spamSettings.timeWindow);
    messageCooldown.set(userId, recentMessages);
    
    // Check for message flooding (3 messages in 5 seconds)
    if (recentMessages.length >= 3) {
        return 'Message flooding detected (3 messages in 5 seconds)';
    }
    
    return false;
}

// Helper function to check if user has admin/moderator permissions
function hasAdminOrModeratorPermissions(member) {
    if (!member) return false;
    
    const permissions = member.permissions;
    return permissions.has(PermissionsBitField.Flags.Administrator) || 
           permissions.has(PermissionsBitField.Flags.ManageMessages) ||
           permissions.has(PermissionsBitField.Flags.ManageGuild);
}

// Event handlers
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) {
        console.log(`Ignoring message from bot: ${message.author.tag}`);
        return;
    }
    
    // Ignore messages from admins and moderators
    if (hasAdminOrModeratorPermissions(message.member)) {
        console.log(`Ignoring message from admin/moderator: ${message.author.tag}`);
        return;
    }
    
    // Check for spam
    const spamReason = isSpamMessage(message) || checkMessageFlood(message);
    
    if (spamReason) {
        try {
            // Double check permissions before taking action
            if (hasAdminOrModeratorPermissions(message.member)) {
                console.log(`Prevented action against admin/moderator: ${message.author.tag}`);
                return;
            }
            
            // Delete the message
            await message.delete();
            
            // Timeout the user
            await message.member.timeout(config.spamSettings.timeoutDuration, spamReason);
            
            // Log the action
            const modLogsChannel = await client.channels.fetch(config.modLogsChannelId);
            if (modLogsChannel) {
                await modLogsChannel.send({
                    embeds: [{
                        color: 0xFF0000,
                        title: 'Spam Detected',
                        description: `User ${message.author.tag} (${message.author.id}) was timed out for 24 hours.`,
                        fields: [
                            { name: 'Reason', value: spamReason },
                            { name: 'Message Content', value: message.content.substring(0, 1024) }
                        ],
                        timestamp: new Date()
                    }]
                });
            }
        } catch (error) {
            console.error('Error handling spam message:', error);
        }
    }
});

// Login to Discord
client.login(config.token);

// Update config settings
config.spamSettings.messageLimit = 3;      // Changed to 3 messages
config.spamSettings.timeWindow = 5000;     // 5 seconds window 