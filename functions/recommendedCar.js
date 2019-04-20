'use strict';

const cars = require('../setting/cars.js');
const { RichEmbed } = require('discord.js');

/* ランダムでおすすめの車を返す */

module.exports = message => {
  const car = cars[Math.floor(Math.random() * cars.length)];
  // embedオブジェクトの詳細：
  // https://discord.js.org/#/docs/main/stable/class/RichEmbed
  const embed = new RichEmbed();
  embed.setTitle(`${car.name}がいいと思うぜ。`);
  embed.setImage(car.img);
  message.reply(embed);
};