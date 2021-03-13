const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, '../config/templateGitRepo.json')

exports.readTemplateJson = () => JSON.parse(fs.readFileSync(configPath))

exports.writeTemplateJson = (json) =>
  fs.writeFileSync(configPath, JSON.stringify(json), 'utf8')
