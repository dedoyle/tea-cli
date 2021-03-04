#!/usr/bin/env node
const program = require('commander') // 命令行工具
const chalk = require('chalk') // 命令行输出美化
const didYouMean = require('didyoumean') // 简易的智能匹配引擎
const semver = require('semver') // npm的语义版本包
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages.js')
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
  .command('create <template-name> <app-name>')
  .description('create a new project from a template')
  .action((templateName, appName) => {
    validateArgsLen(process.argv.length, 5)
    require('../lib/create')(lowercase(templateName), appName)
  })

program
  .command('add <template-name> <git-repo-address>')
  .description('add a project template')
  .action((templateName, gitRepoAddress, cmd) => {
    validateArgsLen(process.argv.length, 5)
    require('../lib/addTemplate')(lowercase(templateName), gitRepoAddress)
  })

program
  .command('list')
  .description('list all available project template')
  .action(() => {
    validateArgsLen(process.argv.length, 3)
    require('../lib/listTemplate')()
  })

program
  .command('delete <template-name>')
  .description('delete a project template')
  .action((templateName) => {
    validateArgsLen(process.argv.length, 4)
    require('../lib/deleteTemplate')(templateName)
  })

// 处理非法命令
program.arguments('<command>').action((cmd) => {
  // 不退出输出帮助信息
  program.outputHelp()
  console.log()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  suggestCommands(cmd)
})

// 重写commander某些事件
enhanceErrorMessages('missingArgument', (argsName) => {
  return `Missing required argument ${chalk.yellow(`<${argsName}>`)}`
})

program.parse(process.argv) // 把命令行参数传给 commander 解析

// 输入easy显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

// easy支持的命令
function suggestCommands(cmd) {
  const avaliableCommands = program.commands.map((cmd) => {
    return cmd._name
  })
  // 简易智能匹配用户命令
  const suggestion = didYouMean(cmd, avaliableCommands)
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

function lowercase(str) {
  return str.toLocaleLowerCase()
}

function validateArgsLen(argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    )
  }
}
