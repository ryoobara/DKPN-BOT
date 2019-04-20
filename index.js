'use strict';

const Discord = require('discord.js');
const commands = require('./setting/commands.js');
const client = new Discord.Client();
require('dotenv').config();

const DKPN_BOT_TOKEN = process.env.DKPN_BOT_TOKEN;

client.on('ready', () => {
  console.log(`start DKPN BOT.`);
});

client.on('message', message => {
  // 先頭が「!」なら commands.js に該当するコマンドがあるかチェックする
  const isNeedCheckCommands = message.content.charAt(0) === '!';
  if (isNeedCheckCommands) {
    const command = commands.find(c => {
      return c.regex.test(message.content);
    });
    if (command) {
      command.func(message);
    }
  }
});

client.login(DKPN_BOT_TOKEN);