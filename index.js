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
    console.log("Discord: " + channelID);
    if (userID !== auth.discord_client && channelID === auth.discord_group) {
        const isCommand = message.substr(0, 1);
        if (isCommand !== "!" && isCommand !== "=" && isCommand !== "\\") {
            if (evt.d.attachments.length > 0) { // what kind of message?
                console.log(evt.d.attachments);
                evt.d.attachments.map(idx => {
                    if (idx.hasOwnProperty("width") && idx.hasOwnProperty("height") && !idx.url.match(/gif$/)) { // picture
                        console.log("[DC] Image: " + idx.url);
                        telegramBot.sendPhoto(auth.telegram_group, idx.url, { caption: "[DC] " + user + (message ? (": " + message) : "") });
                    } else { // file
                        console.log("[DC] File: " + idx.url)
                        telegramBot.sendDocument(auth.telegram_group, idx.url);
                    }
                })
            } else { // text
                const payload = "[DC] " + user + ": " + message;
                telegramBot.sendMessage(auth.telegram_group, payload);
            }
        }
    }
});

// TELEGRAM => DISCORD

telegramBot.onText(/^.*$/, (msg, match) => {
    console.log("Telegram: " + msg.chat.id);
    console.log(msg);
    if (msg.chat.id === auth.telegram_group) {
        const payload = "[TG] " + msg.from.first_name + ": " + msg.text;
        console.log(payload);
        console.log("DCG: " + auth.discord_group);
        discordBot.sendMessage({
            to: auth.discord_group,
            message: payload
        }).then(r => console.log(r));
    }
});
