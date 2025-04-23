module.exports = {
    // Discord Bot Token
    token: process.env.DISCORD_TOKEN,
    
    // Mod Logs Channel ID
    modLogsChannelId: process.env.MOD_LOGS_CHANNEL_ID,
    
    // Spam Detection Settings
    spamSettings: {
        // Message flood settings
        messageLimit: process.env.MESSAGE_LIMIT || 5,      // Maximum messages allowed
        timeWindow: process.env.TIME_WINDOW || 5000,     // Time window in milliseconds (5 seconds)
        timeoutDuration: process.env.TIMEOUT_DURATION || 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        
        // Allowed domains for links
        allowedDomains: (process.env.ALLOWED_DOMAINS || '').split(','),
        
        // Spam detection thresholds
        maxEmojis: process.env.MAX_EMOJIS || 5,
        maxSpaces: process.env.MAX_SPACES || 3,
        maxPunctuation: process.env.MAX_PUNCTUATION || 3,
        maxMentions: process.env.MAX_MENTIONS || 3,
        maxLineBreaks: process.env.MAX_LINE_BREAKS || 3,
        maxSpecialCharRatio: process.env.MAX_SPECIAL_CHAR_RATIO || 0.3,
        maxWordRepetition: process.env.MAX_WORD_REPETITION || 3,
        maxMessageLength: process.env.MAX_MESSAGE_LENGTH || 2000,
        maxAttachments: process.env.MAX_ATTACHMENTS || 3,
        maxEmbeds: process.env.MAX_EMBEDS || 1,
        maxRoleMentions: process.env.MAX_ROLE_MENTIONS || 3,
        maxChannelMentions: process.env.MAX_CHANNEL_MENTIONS || 3,
        maxCustomEmoji: process.env.MAX_CUSTOM_EMOJI || 5,
        maxUnicodeEmoji: process.env.MAX_UNICODE_EMOJI || 5,
        maxSpoilerTags: process.env.MAX_SPOILER_TAGS || 3,
        maxCodeBlocks: process.env.MAX_CODE_BLOCKS || 2
    }
}; 