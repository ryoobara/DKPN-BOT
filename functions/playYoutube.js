'use strict';

/* Youtubeの音声を流す */

const {getQuery} = require('../utils/youtubeHelper');
const ytdl = require('ytdl-core');
const youtube = require('youtube-node');
const youtubeSearch = new youtube();

youtubeSearch.addParam('type', 'video');
youtubeSearch.addParam('regionCode', 'JP');

const youtubeStreamOptions = {quality: 'highestaudio',filter : 'audioonly'};
const discordStreamOptions = {seek: 0, volume: 0.05};
const searchResultsNum = 10;
const YOUTUBE_BASE_PATH = `https://www.youtube.com/watch?v=`;

module.exports = message => {
  const sender = message.member; // 送信者
  const voiceChannel = sender.voiceChannel; // 送信者の接続しているボイスチャンネル
  if (message.guild.voiceConnection) {
    return message.reply(`再生中だぜ。
停止したかったら \`!stop\` な。`);
  }
  const query = getQuery(message.content); // キーワード or URL を切り出す
  console.log('query: %s', query);
  if (!query) {
    return message.reply('キーワードがないぞ？');
  }
  // URLの場合とキーワードの場合で処理を分ける
  if (ytdl.validateURL(query)) {
    const videoId = ytdl.getVideoID(query);
    if (voiceChannel) {
      // 同じボイスチャンネルに接続
      return voiceChannel.join()
        .then(connection => {
          const stream = ytdl(`${YOUTUBE_BASE_PATH}${videoId}`, youtubeStreamOptions);
          const dispatcher = connection.playStream(stream, discordStreamOptions);
            dispatcher.on('end', reason => {
              console.log(reason);
              connection.disconnect();
            });
          })
        .catch(console.error);
    } else {
      return message.reply('まずはボイスチャンネルに入ろうか');
    }
  } else {
    youtubeSearch.setKey(process.env.YOUTUBE_API_KEY);
    youtubeSearch.search(query, searchResultsNum, (err, result) => {
      if (err) {
        console.log(err);
        return message.reply('検索失敗したぜ。');
      }
      if (result.items.length === 0) {
        return message.reply('何も見つからなかったな。');
      }
      let i = 0;
      let videoId = '';
      // videoIdが取得できるまで先頭から探す
      while (i < result.items.length && videoId === '') {
        videoId = result.items[i].id && result.items[i].id.videoId ? result.items[i].id.videoId : '';
        i++;
      }
      if (!videoId) {
        return message.reply('何も見つからなかったな。');
      }
      if (voiceChannel) {
        // 同じボイスチャンネルに接続
        return voiceChannel.join()
          .then(connection => {
            message.reply(`これでいいか？
  ${YOUTUBE_BASE_PATH}${videoId}`);
            const stream = ytdl(`${YOUTUBE_BASE_PATH}${videoId}`, youtubeStreamOptions);
            const dispatcher = connection.playStream(stream, discordStreamOptions);
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
  }
};