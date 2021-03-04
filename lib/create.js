const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

const { readTemplateJson } = require('./util/readTemplateData');

const create = async (templateName, appName, options) => {
  console.log(templateName, appName)
}

module.exports = create
