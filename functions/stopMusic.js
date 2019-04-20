'use strict';

/* 音楽を止める */

module.exports = message => {
  if (message.guild.voiceConnection) {
    message.guild.voiceConnection.disconnect();
  } else {
    message.reply('同じボイスチャンネルにいないと停止できないよ');
  }
};