'use strict';

const commandRegex = new RegExp(/^!youtube /);
const shortCommandRegex = new RegExp(/^!y /);

const getQuery = content => {
  if (commandRegex.test(content)) {
    return content.slice(9);
  } else if (shortCommandRegex.test(content)) {
    return content.slice(3);
  }
  return '';
}

module.exports = {
  getQuery
}