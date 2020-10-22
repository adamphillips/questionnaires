# A questionnaire application

Your goal is to create a questionnaire app with three workflows: Define questionnaire (admin user),
allow a user to fill out the questionnaire (end user), and, finally, view a user's answers (admin user).
For purposes of this code sample, don't worry about actually creating different user types, you don't
need to implement any kind of roll or security scheme to complete the test.

## Defining the questionnaire

As an administrative user, I would like to define what goes into the questionnaire. I can create a new
one, give it a name, and define a series of questions. For simplicity sake, each question has the
following attributes:
* Unique name. This is a unique name to the questionnaire. (It is up to you if you want it universally
unique, or just unique within the scope of the form.)
* Label. Descriptive text for the question itself.
* Answer. To keep it simple, a text field is fine. No need to have radio, check, or select boxes.

## Filling out the questionnaire

As an end-user I can view a questionnaire, and fill it out, and submit it. The system will record the
answers in a persistence store of your choosing. (mySQL, SQLite3, mongoDB, localstorage in the
browser, etc.).

## Viewing user answers

As an administrative user, I can view the submitted questionnaires. Create a simple admin page that
lists the name (or some descriptor) of each user who filled out each questionnaire, when they did it,
and what their answers to the questions were.
