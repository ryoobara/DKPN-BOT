'use strict';

/* Youtubeの音声を流す */

const ytdl = require('ytdl-core');
const youtube = require('youtube-node');
const youtubeSearch = new youtube();

youtubeSearch.setKey(process.env.YOUTUBE_API_KEY);
youtubeSearch.addParam('type', 'video');
youtubeSearch.addParam('regionCode', 'JP');
youtubeSearch.addParam('maxResults', '1');

const streamOptions = {seek: 0, volume: 0.05};

module.exports = message => {
  const sender = message.member; // 送信者
  const voiceChannel = sender.voiceChannel; // 送信者の接続しているボイスチャンネル
  const url = message.content.slice(9); // '!youtube '以降を切り出す
  if (message.guild.voiceConnection) {
    return message.reply(`再生中だぜ。
停止したかったら \`!stop\` な。`);
  }
};