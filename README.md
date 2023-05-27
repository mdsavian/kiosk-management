# Introduction

The project is a monorepo created with [TurboRepo](https://turbo.build/repo).

The backend was made in Node.js with Express and MongoDB. It consists of a CRUD for managing kiosks and a cron job that closes or opens a kiosk based on time fields.

The frontend was made in React with Vite, it lists all kiosks in a table and provides functionalities to create, edit and delete kiosks.

## Quick start 🏃🏽‍♀️

First, make sure you have installed a recent [npm](https://nodejs.org/en/download/) version (Node 16 or later).

After setting everything up, clone this repo:

```
$ git clone git@github.com:mdsavian/kiosk-management.git
```

Install all dependencies:

```
$ npm install
```

### For the project to work you need to have a MongoDB base.

You can use MongoDB locally on your machine or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) which is free.

### After creating your database, you need to follow these steps to run the backend project:

- `cd apps\backend`
- Rename the `.env.example` to `.env`
- Update the `DB_URI` with your database URI
- Run `npm run dev`

Your terminal should be displaying something like: `Backend api is running on http://localhost:3002`

### With the backend running now we are ready to run the frontend.

For this, follow these steps:

- Open a new terminal
- Go to the `apps/frontend` folder
- Rename the `.env.example` to `.env`
- Update the `VITE_API_URL` with the URL that was displayed in the terminal where we ran the backend
- Run `npm run dev`

Now you can enjoy it! ;)

## Future improvements

- Create unit tests (backend and frontend)
- Implement a WebSocket to listen for changes on the backend
- Use a logging library like winston
- Validate the required fields
- Improve the page with a header and footer
