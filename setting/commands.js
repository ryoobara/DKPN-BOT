'use strict';

const help = require('../functions/help.js');
const hi = require('../functions/hi.js');
const competitiveProgramming = require('../functions/competitiveProgramming.js');
const rocketLeague = require('../functions/rocketLeague.js');
const mimicYatsumaru = require('../functions/mimicYatsumaru.js');
const mimicJonichi = require('../functions/mimicJonichi.js');
const getThumbnail = require('../functions/getThumbnail.js');
const recommendedCar = require('../functions/recommendedCar.js');
const stopMusic = require('../functions/stopMusic.js');
const playYoutube = require('../functions/playYoutube.js');

module.exports = [
  {
      regex: new RegExp(/^!help$|^!h$/),
      key: '!help, !h',
      description: 'ヘルプを表示します',
      func: (message) => help(message)
  },
  {
      regex: new RegExp(/^!hi$/),
      key: '!hi',
      description: '挨拶を返します',
      func: (message) => hi(message)
  },
  {
      regex: new RegExp(/^!競プロでる？$/),
      key: '!競プロでる？',
      description: '競技プログラミングに参加するかを返します',
      func: (message) => competitiveProgramming(message)
  },
  {
      regex: new RegExp(/^!サムネくれ$/),
      key: '!サムネくれ',
      description: '自分のサムネイルのURLをくれます',
      func: (message) => getThumbnail(message)
  },
  {
      regex: new RegExp(/^!やつまる$/),
      key: '!やつまる',
      description: 'やつまるの真似をします',
      func: (message) => mimicYatsumaru(message)
  },
  {
      regex: new RegExp(/^!じょんいち$/),
      key: '!じょんいち',
      description: 'じょんいちの真似をします',
      func: (message) => mimicJonichi(message)
  },
  {
      regex: new RegExp(/^!ロケリ部ある？$/),
      key: '!ロケリ部ある？',
      description: '今日のロケリ部が何時からか教えてくれます',
      func: (message) => rocketLeague(message)
  },
  {
      regex: new RegExp(/^!おすすめの車は？$/),
      key: '!おすすめの車は？',
      description: '今日のおすすめの車を教えてくれます',
      func: (message) => recommendedCar(message)
  },
  {
      regex: new RegExp(/^!play /),
      key: '!play {聞きたいyoutubeの動画のURL}',
      description: '音楽を流します',
      func: (message) => playYoutube(message)
  },
  {
    regex: new RegExp(/^!s$|^!stop$/),
    key: '!stop, !s',
    description: '音楽をやめます',
    func: (message) => stopMusic(message)
  }
]