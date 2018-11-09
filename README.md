# Telegram / Discord Integrator

## Allows you to see the messages from one platform on the other

### Installation

Just run `npm install`.

### Configuration

Copy `config.sample.json` and rename it to `config.json`, using the following parameters:

- discord : Place your Discord Bot token there.
- discord_client : Place here the bot's Client ID. It can be found on the Application page on the Discord Developer site.
- discord_group : The group ID where you plan to send/receive messages on Discord.
- telegram: Place here the Telegram Bot Token.
- telegram_group: Place here the Telegram Group ID.

### Example configuration

```json
{
    "discord": "ABCDEFGHIJKL...",
    "discord_client": "123456789...",
    "discord_group": "123456789...",
    "telegram": "123456ABC:defghiJKL...",
    "telegram_group": -1234566780
}
```

### Troubleshooting

Any issue or guess let me know here or on Telegram: @kyngo