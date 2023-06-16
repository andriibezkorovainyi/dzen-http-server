# DZEN-HTTP-SERVER

Dzen-http-server is a second component of back-end part of SPA comments app,
which is responsible for maintaining HTTP connection with the client,
maintaining user, file service and verifies captcha.

[Use this link to connect to the https server](https://dzen-http-server-2683d3a74bb1.herokuapp.com)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

- <b>Server</b>: Establishing HTTP connection with the client and events handing.
- <b>Database</b>: Storing users information, including IP and UserAgent in a database within several tables using relations.
- <b>Files</b>: Gets files from cloud storage.
- <b>Captcha</b>: Verifies captcha token.
- <b>User validation</b> - Validating user before storing them in database.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Axios](https://www.npmjs.com/package/axios)
- [Heroku](https://www.heroku.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://www.npmjs.com/package/husky)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged)
-

## Installation

To install the project, follow these steps:

1. Clone the repository with git clone
2. Run `npm install` in the root directory
3. The project requires these environment variables to be set:
- `DATABASE_URL` - the url of the database(e.g. `postgresql://user:password@localhost:5432/database`)
- `PORT` - the port websocket server will be running on(Heroku use it).

- `AWS_ACCESS_KEY_ID`,
- `AWS_SECRET_ACCESS_KEY`,
- `AWS_REGION` - credentials for AWS S3 service.

4. Run `npm run dev` in the root directory to start the development server
6. Run `npm run start` in the root directory to start the production server
7. Run `npm run container` in the root directory to start the production server in a container

## Contributing

Contributions are welcome! If you want to contribute to [dzen-api], follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

