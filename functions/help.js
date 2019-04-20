'use strict';

/* commands.jsに定義したコマンドの説明を返す */

module.exports = message => {
  const commands = require('../setting/commands.js');

  message.channel.send(`〜コマンド一覧〜

${'```'}
${commands.map(c => {
  return `${c.key}: ${c.description}`;
}).join(`

`)}
${'```'}
`);
};