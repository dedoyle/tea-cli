const chalk = require('chalk')
const { log } = require('./util/logger')
const { readTemplateJson } = require('./util/readTemplateData')
const { stopSpinner } = require('./util/spinner')

const listAllTemplate = async () => {
  const templateGitRepoJson = readTemplateJson()
  for (let key in templateGitRepoJson) {
    if (templateGitRepoJson.hasOwnProperty(key)) {
      stopSpinner()
      log()
      log(
        `➡️  Template name ${chalk.yellow(key)},  Github address ${chalk.yellow(
          templateGitRepoJson[key]['github']
        )}`
      )
      log()
    }
  }
}

module.exports = () => {
  return listAllTemplate().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
