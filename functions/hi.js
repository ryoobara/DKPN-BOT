'use strict';

/* 挨拶を返す */

const greetingPattern = require('../setting/greetingPattern.js');

module.exports = message => {
  const word = greetingPattern[Math.floor(Math.random() * greetingPattern.length)];
  message.reply(word);
};