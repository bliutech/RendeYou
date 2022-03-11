# Express Backend

## Setup
In this directory, run

    npm install

If scary errors occur, and especially if `package.json` or `package-lock.json`
somehow get modified, **do not push.** Reach out.

Create a `.env`, which we will use to store secret URLs. Therefore, it is
essential that you **not push** the `.env` to the remote. It shouls have the
following contents:
```
DB_URL=mongodb+srv://jason:ogrdmalus@cluster0.5dxdz.mongodb.net
DB_NAME=RendeYou_test_<YOUR NAME HERE>
SESSION_SECRET=abcd1234
ENV=dev
PORT=8000
CHECK_PERIOD_MIN=120
SESSION_LIFETIME_MIN=60
```

Important: write your name at the end of `DB_NAME` (e.g. I have
`RendeYou_test_jason`). This way, we can have separate testing databases.

The `SESSION_SECRET` value can be anything you want (for testing purposes). If
you want to generate a proper secret key, run:
```
openssl rand -hex 64
```

This line:
```
ENV=dev
```
controls backend settings such as allowed frontend origins.

## Running

    npm start

The backend will be available on http://localhost:3000. Currently, the root
endpoint returns a "Hello World!" message.

## Endpoints

### Notes
- Set the Content-Type header to application/json for POST requests
- Remember to include credentials for any requests marked with an asterisk

### POST* /check-session
Function: resets a user’s session timer if it is still active

Response
- true - if the user’s session is still active
- false - if the user’s session is invalid

### POST* /register
Request body: Login/Signup Form

Function
- Attempts to create a new user in the database
- Creates a new session if the registration was successful

Response
- User - if the registration was successful
- 409 Conflict - if the registration failed. Possible reasons:
  - Incomplete form
  - Conflicting username

### POST* /login
Request body: Login/Signup Form

Function: creates a new session if the authentication succeeded

Response
- User - if the authentication was successful
- 403 Forbidden - if the authentication failed

### POST* /logout
Function: terminates the user’s session

Response
- 200 OK - if the user is logged in
- 409 Conflict - if the user isn’t logged in

### GET /user
Query parameters
- ids: comma separated list of user id’s
- username: partial or complete username
- first: partial or complete first name
- last: partial or complete last name

Function
- Filters the database for users matching all of the given parameters
  - If ids is specified, then only users whose ids are in the list will be included
  - Only users whose username starts with username will be included
  - Only users whose first name starts with first will be included
  - Only users whose last name starts with last will be included
- If no query parameters are specified, all users will be included

Response: list[User]

### GET /user/[id]
Path parameters
- id - a user’s id string

Response
- User - normally
- 404 Not Found - if the id is invalid

### GET* /user/me
Response
- User - the currently logged in user
- 403 Forbidden - if the user isn’t authenticated

### PUT* /user/me
Request body: User

Function: updates the currently logged in user’s first name, last name, and/or email

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t authenticated
- 404 Not Found - if the id is invalid

### DELETE* /user/me
Function: deletes the currently logged in user

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t authenticated
- 404 Not Found - if the id is invalid

### GET /event/[id]
Path parameters
- id - an event’s id string

Response:
- Event - normally
- 404 Not Found - if the id is invalid

### POST* /event/new
Request body: Event Form

Function
- Creates a new event
- Adds the new event’s id to the hostedEvents list of its host user
- Ignore the host field of the request, and directly use the userId of the current session

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t authenticated. Possible reasons:
- The user isn’t logged in
- 400 Bad Request - Title is invalid
  - Empty title
  - Event already exists

### PUT* /event/[id]
Path parameters
- id - an event’s id string

Request body: Event

Function: updates an existing event

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t authenticated. Possible reasons:
  - The user isn’t logged in
  - The existing event’s host id doesn’t match the current user’s id
  - The new event’s host id doesn’t match the current user’s id
- 404 Not Found - if the id is invalid
- 400 Bad Request - the update to the event contains invalid formatting
  - Title is empty
  - Title has excess white space

### DELETE* /event/[id]
Path parameters
- id - an event’s id string

Function
- Deletes an existing event
- Removes the event’s id from the hostedEvents list of its host user

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t authenticated. Possible reasons:
  - The user wasn’t logged in
  - The event’s host id doesn’t match the current user’s id
- 404 Not Found - if the id is invalid

### POST* /event/[id]/subscribe
Path parameters
- id - an event’s id string

Function
- Adds the currently logged in user’s id to the event’s members list if it doesn’t already exist
- Adds the event’s id to the currently logged in user’s subscriptions list if it doesn’t already exist

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t logged in
- 404 Not Found - if the id is invalid
- 409 Conflict - if the user is already subscribed to the event

### POST* /event/[id]/unsubscribe
Path parameters
- id - an event’s id string

Function
- Removes the currently logged in user’s id to the event’s members list if it doesn’t already exist
- Removes the event’s id to the currently logged in user’s subscriptions list if it doesn’t already exist

Response
- 200 OK - normally
- 403 Forbidden - if the user isn’t logged in
- 404 Not Found - if the id is invalid
- 409 Conflict - if the user isn’t subscribed to the event
