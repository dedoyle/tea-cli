const chalk = require('chalk')
const isGitUrl = require('is-git-url')

const {
  readTemplateJson,
  writeTemplateJson,
} = require('./util/readTemplateData')

const addTemplate = async (templateName, gitRepoAddress) => {
  const templateGitRepoJson = readTemplateJson()
  if (templateGitRepoJson[templateName]) {
    console.log('  ' + chalk.red(`template name ${templateName} has exists.`))
    return
  }
  if (!isGitUrl(gitRepoAddress)) {
    console.log(
      '  ' +
        chalk.red(
          `git repo address ${gitRepoAddress} is not a correct git repo.`
        )
    )
    return
  }
  const correctGitRepo = getRealGitRepo(gitRepoAddress)
  templateGitRepoJson[templateName] = {
    github: gitRepoAddress,
    download: correctGitRepo,
  }
  writeTemplateJson(templateGitRepoJson)
  stopSpinner()
  log()
  log(`🎉  Successfully add project template ${chalk.yellow(templateName)}.`)
  log()
}

module.exports = (...args) => {
  return addTemplate(...args).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
