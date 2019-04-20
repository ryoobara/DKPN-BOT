'use strict';

const yatsumaruBehavior = require('../setting/yatsumaruBehavior.js');

/* ランダムでやつまるの真似をする */

module.exports = message => {
  const word = yatsumaruBehavior[Math.floor(Math.random() * yatsumaruBehavior.length)].word;
  message.channel.send(`${word}`);
};