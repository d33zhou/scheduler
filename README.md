# Interview Scheduler

![](https://img.shields.io/badge/version-v1.0-blue?style=flat&logo=github)
![](https://img.shields.io/badge/react-v16.9-blue?style=flat&logo=react)

Interview Scheduler is a single page application built using React, which allows students to book interviews with mentors on any given day, or edit existing interviews. Data is persisted through an API server using a PostgreSQL database and communication between the client and server is handled using Axios. Express is the basis for the Scheduler API server application.

Both servers run concurrently, and requests are proxied from the Webpack development server to the API server.

The application further integrates testing using Storybook, Jest, and Cypress.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots

### Default view

!["Default view"](https://github.com/d33zhou/scheduler/blob/master/docs/main.png?raw=true)

### Hovering over a card

!["Card hover view"](https://github.com/d33zhou/scheduler/blob/master/docs/hover-card.png?raw=true)

### Adding a new appointment

!["Adding new appointment"](https://github.com/d33zhou/scheduler/blob/master/docs/add-new.png?raw=true)

### Rendering the updated view

!["Updated view"](https://github.com/d33zhou/scheduler/blob/master/docs/updated-view.png?raw=true)

### Deleting an appointment

!["Deleting an appointment"](https://github.com/d33zhou/scheduler/blob/master/docs/deleting.png?raw=true)
