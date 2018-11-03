process.env["NTBA_FIX_319"] = 1;

const Discord = require('discord.io');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const auth = require('./config.json');

// BOT INVOCATIONS

const discordBot = new Discord.Client({ // discord bot
    token: auth.discord,
    autorun: true
});

const telegramBot = new TelegramBot(auth.telegram, { // telegram bot
    polling: true
});

// DISCORD => TELEGRAM

discordBot.on('message', function (user, userID, channelID, message, evt) {
    console.log(channelID)
    if (userID !== auth.discord_client && channelID === auth.discord_group) {
        const isCommand = message.substr(0, 1);
        if (isCommand !== "!" && isCommand !== "=" && isCommand !== "\\") {
            console.log(channelID)
            const payload = "[DC] " + user + ": " + message;
            console.log(payload);
            telegramBot.sendMessage(auth.telegram_group, payload);
        }
    }
});

// TELEGRAM => DISCORD

telegramBot.onText(/^.*$/, (msg, match) => {
    if (msg.from === auth.telegram_group) {
        const payload = "[TG] " + msg.from.first_name + ": " + msg.text;
        console.log(payload);
        console.log("DCG: " + auth.discord_group);
        discordBot.sendMessage({
            to: auth.discord_group,
            message: payload
        });
    }
});
