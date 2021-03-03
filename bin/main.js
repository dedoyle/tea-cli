#!/usr/bin/env node
const program = require('commander') // 命令行工具
const minimist = require('minimist')
const chalk = require('chalk') // 命令行输出美化
const didYouMean = require('didyoumean') // 简易的智能匹配引擎
const semver = require('semver') // npm的语义版本包
const create = require('../lib/create')
const package = require('../package.json')

didYouMean.threshold = 0.6

function checkNodeVersion(wanted, cliName) {
  // 检测node版本是否符合要求范围
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          cliName +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.'
      )
    )
    // 退出进程
    process.exit(1)
  }
}

// 检测node版本
checkNodeVersion(package.engines.node, '@tea/cli')

program.version(package.version, '-v --version').usage('<command> [options]')

// 创建命令
program
  .command('create <app-name>')
  .description('create a new project')
  .option(
    '-p, --preset <preset-name>',
    'Skip prompts and use saved or remote preset'
  )
  .option('-d,  --default', 'Skip prompts and use default preset')
  .action((name, cmd) => {
    console.log(name)
    // const options = cleanArgs(cmd)
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          '\n ⚠️  检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦'
        )
      )
    }
    // require('../lib/create')(name, options)
  })

program.parse()
