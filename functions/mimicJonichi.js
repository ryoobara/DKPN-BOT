'use strict';

const jonichiBehavior = require('../setting/jonichiBehavior.js');

/* ランダムでじょんいちの真似をする */

module.exports = message => {
  const word = jonichiBehavior[Math.floor(Math.random() * jonichiBehavior.length)].word;
  message.channel.send(`${word}`);
};