'use strict';

/* Youtubeの音声を流す */

const ytdl = require('ytdl-core');

const streamOptions = {seek: 0, volume: 0.05};
const YOUTUBE_BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = message => {
  const sender = message.member; // 送信者
  const voiceChannel = sender.voiceChannel; // 送信者の接続しているボイスチャンネル
  const url = message.content.slice(6); // '!play '以降を切り出す
  if (message.guild.voiceConnection) {
    return message.reply(`再生中だぜ。
停止したかったら \`!stop\` な。`);
  }
  // urlをチェック
  if (!ytdl.validateURL(url)) {
    return message.reply('URLあってる？');
  }
  let videoId = ytdl.getURLVideoID(url);
  if (!ytdl.validateID(videoId)) {
    return message.reply('動画のID間違ってるぞ');
  }
  if (voiceChannel) {
    // 同じボイスチャンネルに接続
    return voiceChannel.join()
      .then(connection => {
        const stream = ytdl(`${YOUTUBE_BASE_PATH}${videoId}`, {quality: 'lowestaudio',filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
          dispatcher.on('end', reason => {
            console.log(reason);
            connection.disconnect();
          });
        })
      .catch(console.error);
  } else {
    return message.reply('まずはボイスチャンネルに入ろうか');
  }
};