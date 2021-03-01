# Project description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with TypeScript.

# Run application
To run the application, please run `npm install` as first to install all project dependencies. After installation
`npm start` command could run the project.

# Project structure

Project folder structure was designed basing on Duck Pattern. Dedicated components are located inside their parents. Rest of
project dependencies are split into folders:
- common - reusable helpers 
- components - reusable components which could be used by any of other components
- models - application logic to handle operations on data
- screens - Container/components assigned per dedicated root (in this example there is only one root and according to that, here is only one screen view - Home)
- services - API call requests
- types - TS types used in the application

Important -> ** All changes available by CRUD are available only locally.** Each action has its own API call, with the proper response, however
used API doesn't store changes on the server.

## Available features
* Users list
* Add user action
* Delete chosen user
* Edit chosen
* Pagination
* Loading overlay
* Form edit/add validation
* Deleting confirmation dialog
* Error popup for failed API requests

## Technical details
Application is based on the simple examples of Material UI.
Current implementation includes simple examples of uTest written for validators. The app structure allows writing integration 
tests for models, snapshot tests for components.
Eslint was configured to keep basic rules for coding styles including TypeScript, also prettier is added to keep code prettier :)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm lint` 

This script is checking all eslint rules used in project

### `npm format` 

This command will run prettier script, and will format code with missing comas, spaces and etc.

## TODO features and technical improvements
* Integration with Nock.js library to write integration tests for models
* Write snapshot tests for components
* Prepare better HTML structures with BEM class naming 
* Prevent/disable submit not fully filled user form.
* ReWrite dialog components as HOC
