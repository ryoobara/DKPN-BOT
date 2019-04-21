'use strict';

/* Youtubeの音声を流す */

const ytdl = require('ytdl-core');
const youtube = require('youtube-node');
const youtubeSearch = new youtube();

youtubeSearch.setKey(process.env.YOUTUBE_API_KEY);
youtubeSearch.addParam('type', 'video');
youtubeSearch.addParam('regionCode', 'JP');

const streamOptions = {seek: 0, volume: 0.05};
const searchResultsNum = 1;
const YOUTUBE_BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = message => {
  const sender = message.member; // 送信者
  const voiceChannel = sender.voiceChannel; // 送信者の接続しているボイスチャンネル
  const keywords = message.content.slice(9); // '!youtube '以降を切り出す
  if (message.guild.voiceConnection) {
    return message.reply(`再生中だぜ。
停止したかったら \`!stop\` な。`);
  }
  if (keywords) {
    return message.reply('キーワードがないぞ？');
  }
  youtubeSearch.search(keywords, searchResultsNum, (err, result) => {
    if (err) {
      console.log(err);
      return message.reply('検索失敗したぜ。');
    }
    if (result.items.length === 0) {
      return message.reply('何も見つからなかったな。');
    }
    const videoId = result.items[0].id.videoId;
    if (voiceChannel) {
      // 同じボイスチャンネルに接続
      return voiceChannel.join()
        .then(connection => {
          message.reply(`これでいいか？
${YOUTUBE_BASE_PATH}${videoId}`);
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
  })
};