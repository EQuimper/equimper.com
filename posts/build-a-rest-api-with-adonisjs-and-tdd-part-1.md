---
title: 'Build a REST API with AdonisJs and TDD Part 1'
date: 2019-01-02
description: 'Want to learn how to use AdonisJs by building a rest api using TDD approach? This is the tutorial you want'
tags: ['tutorial', 'adonisjs', 'tdd', 'javascript', 'testing']
---

I've been playing lately with [AdonisJs](https://adonisjs.com) a NodeJS MVC framework who look a lot like [Laravel](https://laravel.com/) a really popular PHP framework. I really started to love the Adonis approach, more convention than configuration. I also love the fact they say in the headline.

```
Writing micro-services or you are a fan of TDD, it all boils down to confidence. AdonisJs simplicity will make you feel confident about your code.
```

In the past few month, I wrote all my backend project with the TDD pattern, and I really feel this help me getting more productive, and more confident with my code. I know TDD is not perfect, can slow you down, when you start, but I really think this can improved your code in the long term.

### About this tutorial

So in this tutorial we gonna build kind of a bucket list for movies to watch. A user can create a challenge, and put movies to this one. I know, this is not the most awesome project ever, but this will help you see how Lucid, the Adonis ORM work with relationship. We gonna also see how easy this framework will make our live.

At the end of this tutorial, we gonna create a service where a user can finally enter just the name of the movie and the year. Us we will use [TheMovieDB Api](https://www.themoviedb.org) and find info about this movie.

### Getting Started

First we need to install the Adonis cli

```
npm i -g @adonisjs/cli
```

To make sure everything work run the command in your terminal

```
adonis --help
```

If you see a list of command that mean this is working :)

For creating the project we will run this command in the terminal

```
adonis new movies_challenges --api-only
```

Here this will create a new project call `movies_challenges` and this will be an api only boilerplate, so no ui with this.

Follow the instructions

```
cd movies_challenges
```

For running the project the command will be

```
adonis serve --dev
```

But for us we don't really need cause all the interaction will be done from the testing.

Open the project in your text-editor of choice. For myself I use [VSCode](https://code.visualstudio.com/) it's free and awesome.

## Setup the db

Adonis have setup lot of stuff for us. But they let us choosing some stuff like which db to use etc. If you open the file `config/database.js` you will see `sqlite`, `mysql` and `postgresql` config. For this project I will be using Posgresql

To make it work we need to follow the instruction they provide at the bottom of this file.

```
npm i --save pg
```

After this go inside your `.env` file and setup the connection for your db. For me this will look like

```
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=movies_challenges_dev
```

After I make sure I create the db from my terminal

```
createdb movies_challenges_dev
```

## Setup the testing environnment

Adonis don't came with a testing framework out-of-the-box, but it's really easy to make it work.

Run the command

```
adonis install @adonisjs/vow
```

What is that ? Adonis have a way to install dependency by using npm internally. But the beauty of this it's they can add other stuff also. Like if you look what happen after this is done, they will open a a url in your browser with other instructions.

They have create 3 new files.

```
.env.testing
vowfile.js
example.spec.js
```

First we will setup the `.env.testing` file to make sure we it a test db and not the dev one.

Append that to the end of the file

```
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=movies_challenges_test
```

After I make sure I create the db from my terminal

```
createdb movies_challenges_test
```

## Writing your first test

So the way the app will work is a User can have many Challenges. Those challenge can have many movie to it. But movie can be to many challenge.

So in relationship this will look like

![](https://i.ibb.co/G5xjb5Z/Screenshot-2019-01-02-11-32-43.png)

If you have check a bit the folder structure you will see Adonis give use User model and Auth of the box.

We will use this in the future.

So for making your first test file we will need to think about what we need to do.

The first thing I want to test is the fact a user can create a challenge. A challenge need to have a title, and a description is optionnal. I want to make sure only a authenticate user can create a challenge. When a challenge is create I need to put the current_user id to the data. So we will know who is the owner.

Adonis give us lot of tool to make our live easier. One of them is generator command thank to ace. We will use a command to make our first test. But to be able to do this we need to register the vow test framework to the provider of the project. Open `start/app.js` and add this to your aceProvider

```diff
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
+ '@adonisjs/vow/providers/VowProvider'
]
```

Now we can run the command

```
adonis make:test CreateChallenge
```

When you get ask unit or functionnal test use functionnal and click enter.

This will create a file

```
test/functional/create-challenge.spec.js
```

Nice first test file create :)

We will change the title of this test to be more useful.

```js
test('can create a challenge if valid data', async ({ assert }) => {})
```

Now the way I wrote test is by creating the assertion first. After I then go backward and create the step I need to make it work.

```js
test('can create a challenge if valid data', async ({ assert }) => {

  const response = // do api call

  response.assertStatus(201)
  response.assertJSONSubset({
    title: 'Top 5 2018 Movies to watch',
    description: 'A list of 5 movies from 2018 to absolutely watched',
    user_id: // to do
  })
})
```

Here I test than I want to receive back from my api call a `201 created` with a certain object who will have the title a provide, the description I provide, and my current user id.

Next we need to write the code for the response

```js
const { test, trait } = use('Test/Suite')('Create Challenge')

trait('Test/ApiClient')

test('can create a challenge if valid data', async ({ assert, client }) => {

  const data = {
    title: 'Top 5 2018 Movies to watch',
    description: 'A list of 5 movies from 2018 to absolutely watched'
  }

  const response = await client.post('/api/challenges').send(data).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: data.title,
    description: data.description,
    user_id: // to do
  })
})
```

To make a api call we need to import first `trait` from the test suite. We need to told the test we want the api client. This will give us now access to `client` in the callback. I then put my data I want to an object and send it to a route with the verb `POST`.

Now I want to test with a current user jwt in the headers. How can we do this ? This is so easy with Adonis

```js
'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a challenge if valid data', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const data = {
    title: 'Top 5 2018 Movies to watch',
    description: 'A list of 5 movies from 2018 to absolutely watched',
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: data.title,
    description: data.description,
    user_id: user.id,
  })
})
```

OMG !!! Too much. DONT WORRY. We just need to break it down a bit. So first what is Factory. Factory is a way to make dummy data easier. This come with a really nice api. Here the Factory will create a user to the db. But how can the factory know the data we want ? Easy just open the `database/factory.js` file and add this at the bottom

```js
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: 'password123',
  }
})
```

Here we create a Factory for the Models user we have in the db. This use faker also who is a library who make dummy data so much easier. Here I put a fake username and email. But why I don't do this to password ? It's because when I will need to test login I want to be able to log, and because the password will become hash I need to know what is the original version.

So this line

```js
const user = await Factory.model('App/Models/User').create()
```

We create a user to the db, now we can use this same user here in the request

```js
const response = await client
  .post('/api/challenges')
  .loginVia(user, 'jwt')
  .send(data)
  .end()
```

As you can see we can now use loginVia and pass the user at first argument, the second argument is the type of auth here I say jwt. I can use `.loginVia` cause of this trait at the top

```js
trait('Auth/Client')
```

Now in my json response I can now check the user id is really the one of the current user

```js
response.assertJSONSubset({
  title: data.title,
  description: data.description,
  user_id: user.id,
})
```

One think we need to do before going further and run the test is we need to see the error from the response to do a real tdd.

So we will add this line before the assertion

```js
console.log('error', response.error)
```

Now we can run the test with the command `adonis test`

You will see the error

```
error: relation "users" does not exist
```

What that mean ? It's because Vow by default don't run migration. But us a developer we don't want to run it manually on every test that will be painful. What can we do ? Adonis make again our live easy. Go in the file `vowfile.js` and uncomment the code already wrote for this

```
On line 14: const ace = require('@adonisjs/ace')
On line 37: await ace.call('migration:run', {}, { silent: true })
On line 60: await ace.call('migration:reset', {}, { silent: true })
```

Now if you rerun the test you will see

```
error { Error: cannot POST /api/challenges (404)
```

Nice one step further :) This error mean we don't have a route. We need to create it. Open `start/routes.js` and add this code

```js
Route.post('/api/challenges', 'ChallengeController.store')
```

Here I say, when we get a post request to the route `/api/challenges` pass the data to the controller ChallengeController and the methods store. Remember Adonis is MVC so yes we need controller :)

Save the code and rerun the test

Now in the text of the error you will see

```
Error: Cannot find module \'/Users/equimper/coding/tutorial/movies_challenges/app/Controllers/Http/ChallengeController\'
```

This mean the controller don't exist :) So we need to create one. Again adonis have a generator for this

```
adonis make:controller ChallengeController
```

When ask choose http not websocket

Rerun the test

```
'RuntimeException: E_UNDEFINED_METHOD: Method store missing on App/Controllers/Http/ChallengeController\n> More details: https://err.sh/adonisjs/errors/E_UNDEFINED_METHOD'
```

Method store is missing. Fine this is normal the controller is empty. Add this to your file

```js
// app/Controllers/Http/ChallengeController.js
class ChallengeController {
  store() {}
}
```

Rerun the test

```
expected 204 to equal 201
204 => 201
```

So now this is where the fun start, we expected 201 but received 204. We can fix this error by adding

```js
class ChallengeController {
  store({ response }) {
    return response.created({})
  }
}
```

Adonis give us the response object who can be destructuring from the arguments of the method. Here I want to return 201 who mean created so I can use the created function. I pass an empty object so I can see my test failing further

```
 expected {} to contain subset { Object (title, description, ...) }
  {
  + title: "Top 5 2018 Movies to watch"
  + description: "A list of 5 movies from 2018 to absolutely watched"
  + user_id: 1
  }
```

Here the error mean we send nothing but expected stuff. Now time to do the logic.

```js
const Challenge = use('App/Models/Challenge')

class ChallengeController {
  async store({ response, request }) {
    const challenge = await Challenge.create(
      request.only(['title', 'description'])
    )

    return response.created(challenge)
  }
}
```

I add an import at the top, this is my challenge model I plan to created in future test. Now I can make use of async and also the request object to create a challenge. The only method info can be see [here](https://adonisjs.com/docs/4.1/request#_only).

Now if I rerun the test I see

```
'Error: Cannot find module \'/Users/equimper/coding/tutorial/movies_challenges/app/Models/Challenge\''
```

Fine make sense the model don't exist

```
adonis make:model Challenge -m
```

The -m give you the migration file also

This command will created

```
✔ create  app/Models/Challenge.js
✔ create  database/migrations/1546449691298_challenge_schema.js
```

Now if we return the test

```
'error: insert into "challenges" ("created_at", "description", "title", "updated_at") values ($1, $2, $3, $4) returning "id" - column "description" of relation "challenges" does not exist'
```

Make sense the table don't have a column description. So we should add one

So open your migration file for the challenge_schema

```js
class ChallengeSchema extends Schema {
  up() {
    this.create('challenges', table => {
      table.text('description')
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges')
  }
}
```

Here I add a colum `text` call description

Rerun the test

```
'error: insert into "challenges" ("created_at", "description", "title", "updated_at") values ($1, $2, $3, $4) returning "id" - column "title" of relation "challenges" does not exist'
```

Now is the same error but for title

```js
class ChallengeSchema extends Schema {
  up() {
    this.create('challenges', table => {
      table.string('title')
      table.text('description')
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges')
  }
}
```

Here title will be a string. Now rerun the test

```
  expected { Object (title, description, ...) } to contain subset { Object (title, description, ...) }
  {
  - created_at: "2019-01-02 12:28:37"
  - id: 1
  - updated_at: "2019-01-02 12:28:37"
  + user_id: 1
  }
```

The error mean the title and description are save, but the user_id don't exist, so we need to add the relation in the migration and the model

Again in the migration file add

```js
class ChallengeSchema extends Schema {
  up() {
    this.create('challenges', table => {
      table.string('title')
      table.text('description')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges')
  }
}
```

Here the user_id is a integer, reference the id of a user in the users table

Now open the Challenge model in `app/Models/Challenge.js` and add this code

```js
class Challenge extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
}
```

And we need to do the other way of relation so open `app/Models/User.js` and add at the bottom after tokens

```js
challenges() {
  return this.hasMany('App/Models/Challenge')
}
```

Wow I love this syntax and how easy we can see the relations. Thank to Adonis team and Lucid ORM :)

Run the test

```
 expected { Object (title, description, ...) } to contain subset { Object (title, description, ...) }
  {
  - created_at: "2019-01-02 12:35:20"
  - id: 1
  - updated_at: "2019-01-02 12:35:20"
  + user_id: 1
  }
```

Same error ? Yes when we create we didn't put the user_id. So we need to

```js
class ChallengeController {
  async store({ response, request, auth }) {
    const user = await auth.getUser()

    const challenge = await Challenge.create({
      ...request.only(['title', 'description']),
      user_id: user.id,
    })

    return response.created(challenge)
  }
}
```

Here I make use of auth, who is a object we method touching the authentication. Here I can use the current user with the function auth.getUser. This will return the user from the jwt. Now I can then merge this to the object when create.

Now if you run your test all should work. BUTTTTT this is not done. We need a test to make sure the user is really authenticate, cause now this endpoint is accessible by everyone.

Add to our test file

```js
test('cannot create a challenge if not authenticated', async ({
  assert,
  client,
}) => {})
```

Again we gonna work with the same idea, building the assertion first and going backward

```js
test('cannot create a challenge if not authenticated', async ({
  assert,
  client,
}) => {
  response.assertStatus(401)
})
```

Here we want the status to be 401 unauthorized

```js
test('cannot create a challenge if not authenticated', async ({
  assert,
  client,
}) => {
  const data = {
    title: 'Top 5 2018 Movies to watch',
    description: 'A list of 5 movies from 2018 to absolutely watched',
  }

  const response = await client
    .post('/api/challenges')
    .send(data)
    .end()

  console.log('error', response.error)

  response.assertStatus(401)
})
```

First make sure to delete the console.log from the other test. Now your test should look like that here.

Open your routes file

```js
Route.post('/api/challenges', 'ChallengeController.store').middleware(['auth'])
```

If you run the test all will be green :)

But now I will like to test the fact then title is required and both description and title need to be a string how can I do this ?

Adonis give us access to another really nice tool can validator.

We need to install the validator library

```
adonis install @adonisjs/validator
```

Go to `start/app.js` and add the provider

```diff
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
+  '@adonisjs/validator/providers/ValidatorProvider'
]
```

Now go back to our test file for challenge and add a new one

```js
test('cannot create a challenge if no title', async ({ assert }) => {})
```

Before going further, I don't like the fact I need to manually wrote the title and description. I would like to be able to make the factory create it for us. This is possible, first go to `database/factory.js`

We need to create a Factory for the Challenge

```js
Factory.blueprint('App/Models/Challenge', faker => {
  return {
    title: faker.sentence(),
    description: faker.sentence()
  }
}
```

Now we can use this with the help of make

```js
const { title, description } = await Factory.model(
  'App/Models/Challenge'
).make()
```

This will give us a fake title and description but without being save to the db.

Going back to the test will would like to receive error if the title is not in the body

```js
test('cannot create a challenge if no title', async ({ assert, client }) => {
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is required',
      field: 'title',
      validation: 'required',
    },
  ])
})
```

Now we need to write the code to get to this. I will skip some process, but hey continue it, this is how we get better. I will just not wrote it cause that take lot and lot of line :)

```js
test('cannot create a challenge if no title', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const { description } = await Factory.model('App/Models/Challenge').make()

  const data = {
    description,
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is required',
      field: 'title',
      validation: 'required',
    },
  ])
})
```

First we create a user to be able to log, cause we need to be authenticated remember :)

Second I get a fake description from my factory. I just send this one.

I assert I receive a 400 for bad request and a json array of error message.

If I run the test now I receive

```
expected 201 to equal 400
  201 => 400
```

That mean the Challenge get create but shouldn't

So we need to add a validator for this

```
adonis make:validator CreateChallenge
```

Go inside your routes file and we want to use this

```js
Route.post('/api/challenges', 'ChallengeController.store')
  .validator('CreateChallenge')
  .middleware(['auth'])
```

Now if you run the test you will see

```
expected 201 to equal 400
  201 => 400
```

Make sense the validator break stuff. Time to wrote some code. Open `app/Validators/CreateChallenge.js`

```js
class CreateChallenge {
  get rules() {
    return {
      title: 'required|string',
      description: 'string',
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      string: '{{ field }} is not a valid string',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}
```

Here I add some rules, messages, and I also show the fails with a status 400 for bad request. I also put the validateAll to make sure I validate all stuff, not just one by one.

If you run the test now all should work :)

We can also add the notNullable field to the title column in the migrations

```js
table.string('title').notNullable()
```

A last test can be create to test both description and title need to be a string.

```js
test('cannot create a challenge if title and description are not a string', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const data = {
    title: 123,
    description: 123
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is not a valid string',
      field: 'title',
      validation: 'string'
    },
    {
      message: 'description is not a valid string',
      field: 'description',
      validation: 'string'
    }
  ])
})
```

And if we run again the test BOOM all green.

![](https://i.ibb.co/sygHVRs/Screenshot-2019-01-02-13-11-20.png)

---

### End word

I hope you enjoy the part 1 of this tutorial. Don't forget to subscribe to get notifications when I will post the part 2.

If you find any typo, or your want to let me know something about this project, don't hesitate to let a comment below :)

The code can be find here on [github](https://github.com/EQuimper/adonis-tdd-tutorial-demo)
