module.exports = {
    // Discord Bot Token
    token: 'MTM2NDY2NzQwMzE2NTc2NTc3NQ.GD9mkg.EfeYN5QVwwF5a2R9KaUR5EMgcx6l8ZSFyjh7Io',
    
    // Mod Logs Channel ID
    modLogsChannelId: '1364616986352422932',
    
    // Spam Detection Settings
    spamSettings: {
        // Message flood settings
        messageLimit: 5,      // Maximum messages allowed
        timeWindow: 5000,     // Time window in milliseconds (5 seconds)
        timeoutDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        
        // Allowed domains for links
        allowedDomains: [
            // Google domains
            'google.com',
            'googleapis.com',
            'google.co',
            'google.ai',
            'googleusercontent.com',
            'googlevideo.com',
            'googleadservices.com',
            'googleanalytics.com',
            'googleblog.com',
            'googlebot.com',
            'googlecode.com',
            'googlecommerce.com',
            'googledrive.com',
            'googleearth.com',
            'googlemail.com',
            'googlemaps.com',
            'googlepagecreator.com',
            'googlescholar.com',
            'googlesource.com',
            'googlesyndication.com',
            'googletagmanager.com',
            'googletagservices.com',
            'googleusercontent.com',
            'gstatic.com',
            'chrome.com',
            'chromium.org',
            'ggpht.com',
            'gmail.com',
            'goo.gl',
            'goog',
            
            // YouTube domains
            'youtube.com',
            'youtu.be',
            'youtube-nocookie.com',
            'youtubeeducation.com',
            'youtubegaming.com',
            'youtubei.com',
            'youtubekids.com',
            'yt.be',
            'ytimg.com',
            
            // Other Google services
            'blogger.com',
            'blogspot.com',
            'chromebook.com',
            'doubleclick.net',
            'feedburner.com',
            'firebaseio.com',
            'g.co',
            'gcr.io',
            'golang.org',
            'keyhole.com',
            'madewithcode.com',
            'panoramio.com',
            'picasa.com',
            'android.com',
            'tensorflow.org',
            'tfhub.dev',
            'waze.com',
            'whatbrowser.org',
            'withgoogle.com'
        ],
        
        // Spam detection thresholds
        maxEmojis: 5,
        maxSpaces: 3,
        maxPunctuation: 3,
        maxMentions: 3,
        maxLineBreaks: 3,
        maxSpecialCharRatio: 0.3,
        maxWordRepetition: 3,
        maxMessageLength: 2000,
        maxAttachments: 3,
        maxEmbeds: 1,
        maxRoleMentions: 3,
        maxChannelMentions: 3,
        maxCustomEmoji: 5,
        maxUnicodeEmoji: 5,
        maxSpoilerTags: 3,
        maxCodeBlocks: 2
    }
}; 