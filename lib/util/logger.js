const chalk = require('chalk')
const EventEmitter = require('events')
const padStart = String.prototype.padStart

const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `)

exports.events = new EventEmitter()

function _log(type, tag, message) {
  if (message) {
    exports.events.emit('log', {
      message,
      type,
      tag,
    })
  }
}

const format = (label, msg) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : padStart(line, chalk.reset(label).length) // 对齐
  })
}

exports.log = (msg = '', tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
  _log('log', tag, msg)
}
