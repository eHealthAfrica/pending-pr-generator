# pending-pr-generator

This is the source code of the pending pull request tracker.

## System Requirements

- [Node 8.x LTS](https://nodejs.org/en/blog/release/v8.10.0/)
- [Yarn 1.x](https://yarnpkg.com/)

## Development Setup

- Clone this repository: `git@github.com:eHealthAfrica/pending-pr-generator.git`
- Install all dependencies: `yarn`
- Create a file in the project root with the name config.json
- Copy the content of config.sample.json to config.json
- Add the list of repositories as strings inside the array under **repos** inside config.json
- Get github token from github and under **githubToken** inside config.json
- Save the sheet id under **sheetId** inside config.json  ( _you can get the sheet id from the google sheet url_ )
- Get a Service account keys from [console.developers.google.com](https://console.developers.google.com)
- Fill out the content of the service accout keys in the config.json under sheetAuth
- Start development server: `yarn dev`
