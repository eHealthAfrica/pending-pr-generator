const getPrs = require('./githubService')
const token = require('./config').token
const repos = require('./config.json').repos
getPrs(repos,token)