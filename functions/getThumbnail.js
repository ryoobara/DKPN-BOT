'use strict';

/* サムネイルを返す */

module.exports = message => {
	message.channel.send(`ホラよ
${message.author.avatarURL}`);
};