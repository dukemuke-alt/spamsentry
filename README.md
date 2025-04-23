# SpamSentry Discord Bot

A Discord bot for spam detection and moderation.

## Features

- Spam detection
- Banned words filtering
- Message cooldown
- Admin/Moderator protection
- Automated moderation actions

## Deployment to Render.com

1. Create a new account on [Render.com](https://render.com) if you don't have one

2. Create a new Web Service:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this bot

3. Configure the service:
   - Name: `spamsentry` (or your preferred name)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. Add Environment Variables:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `MOD_LOGS_CHANNEL_ID`: Your mod logs channel ID
   - Other environment variables as needed (see .env.example)

5. Deploy:
   - Click "Create Web Service"
   - Wait for the deployment to complete

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Start the bot: `npm start`

## Environment Variables

See `.env.example` for all required environment variables and their descriptions.

## License

MIT 