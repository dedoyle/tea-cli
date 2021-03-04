const ora = require('ora') // 美化终端交互
const chalk = require('chalk')
const spinner = ora()

let lastMsg = null

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
}

exports.stopSpinner = (persist) => {
  if (lastMsg && persist !== false) {
    this.stopSpinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    })
  }
}
