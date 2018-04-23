# Questionnaires example app

This is an example questionnaires app built using Rails and React

## Setup

In order to run the application, you first need to install the dependencies. This can be done by running

```
bin/setup
```

in the root folder of the application. Note that if you want to use an isolated Ruby environment via RVM etc you should set this up first.

The application was build and tested with Ruby 2.3.3, node 8.9.4 and npm 5.7.1.

This script will also create the SQLite database for the application.

Once installed you can start the application by running

```
bin/rails s
```

## Running the tests

There are three types of tests used by the application.

### Rails system tests

These are full-stack tests that run in a browser. They check that the application meets the high-level requirements. Since they run in a browser they exercise both the JS front-end and Rails back-end functionality together. This means that they ensure the integration between the two main parts of the application is working correctly.

They can be run using

```
rake test:system
```

### Rails application tests

These test the Rails application.

They can be run using

```
rake test
```

### Front-end javascript tests

These test the React front-end admin area application.

They can be run using

```
npm run test
```

During development they can also be run in watch mode using

```
npm run test:watch
```

## Using the application

Once the application is running, you can visit http://localhost:3000. This will show a page with links to all the configured questionnaires and a link to the admin area for adding new questionnaires.

## Application design

The following section talks about some of the design decisions made when creating the application, possible alternatives and why these solutions were chosen.

### React admin app

The admin app uses React. It communicates with the Rails application via REST endpoints. The Rails application handles the persistence. The admin app was written in React as one of the key features was to be able to dynamically add new questions. This kind of dynamic form manipulation is better suited to a front-end application. When working with multi-language applications it is useful to have a clear boundary between the two therefore the entire admin application is written in React

In contrast, there is less benefit to the end user in having a front-end application to complete the questionnaire. Therefore it is simpler to handle this entirely through Rails.

### The questionnaire schema is persisted as a JSON object

The questionnaire schema is persisted as a single blob of JSON. This is simple as it means we can simply take the state from the React app and persist it. If we wanted to be able to edit the questionnaire again we just need to repopulate the QuestionnaireForm component with the same state.

### The questionnaire response is persisted as a JSON object

The response data is also persisted as a single JSON object. It contains both the answer and the original question. This means that if the questionnaire is later modified, it is still possible to see the question that was asked at the time of the questionnaire being submitted.

Should particular answers be required for analysis later these can easily be extracted to separate tables / columns as required given that both SQLite and Postgres (the production database of choice) support operations on columns with JSON datatype.