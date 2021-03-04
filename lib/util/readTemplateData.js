const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, '../config/templateGitRepoJson.json')

exports.readTemplateJson = () => JSON.parse(fs.readFileSync(configPath))

exports.writeTemplateJson = (json) =>
  fs.writeFileSync(configPath, JSON.stringify(json), 'utf8')
