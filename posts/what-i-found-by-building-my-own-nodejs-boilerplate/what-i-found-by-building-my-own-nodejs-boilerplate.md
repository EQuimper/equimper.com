---
author: "Emanuel Quimper"
date: 2017-05-03T11:15:58-05:00
linktitle: What I found by building my own NodeJS boilerplate.
title: What I found by building my own NodeJS boilerplate.
description: By building your own boilerplate or at least play with code for fun you can found some new stuff and use it for your next project.
weight: 10
tags: [
  "nodejs",
  "javascript",
  "mongodb",
  "express",
  "tips",
  "npm packages"
]
---

# What I found by building my own NodeJS boilerplate.

# Mongoose Tips

I’ve played with Mongoose a lot in the past week. I’ve built a [NodeJS API boilerplate](https://github.com/EQuimper/nodejs-api-boilerplate) for help me kickstart some REST API project. I setup the regular auth using PassportJS with the local and JWT strategies. By doing this I found some useful tricks with Mongoose. Some tips I never really see somewhere ‘maybe I didn’t search lot 😃’ and I want to share you what I found.

## toJSON()

Example, you want to make authentication with your app and you don’t want to send the password to the front-end. It’s normal cause this is a big security issue if you did. So want you can do it’s create a function who take your user and return a new object.

```js
function getUser(user) {
  return {
    _id: user._id,
    username: user.username,
  };
}
```

This strategy work but I think the one I’m gonna show gonna be better.

```js
UserSchema.methods = {
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  /**
   * Hash the user password
   *
   * @private
   * @param {String} password - user password choose
   * @returns {String} password - hash password
   */
  _hashPassword(password) {
    return hashSync(password);
  },

  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },

  /**
   * Parse the user object in data we wanted to send when is auth
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`,
    };
  },

  /**
   * Parse the user object in data we wanted to send
   *
   * @public
   * @returns {Object} User - ready for populate
   */
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
    };
  },
};
```

So here we have a lot of stuff to check 😃. Methods in mongoose are finally what they said. They are methods available on your user object. An example here we have `authenticateUser(password)` who is use for authenticate the user find with email if the password is the right one. Same go for the `_hashPassword(password)` who just simply hash the password before saving the user in the DB. `createToken()` like the name say create the JWT token and can be user right inside the response `res.status(200).json({ user, token: user.createToken() })`.

But the one I want you to see it's the `toJSON()`. This on is use when finally you on your user. So if you check back `res.status(200).json({ user, token: user.createToken() })` you can see I send the user. Because we have the `toJSON()` on make it working just like this. We don't send timestamps, email, password etc. We just send `_id` and `username` nothing more. But ok why do the `toAuthJSON()`? Because now I can reformat the response to be `res.status(200).send(user.toAuthJSON())` so I just send an Object with `_id` and `token`. Hope this part make sense 😃.

The reason why have to methods for JSON below 😃.

## Statics

After that in Mongoose, you have access to something call Statics in your schema. This is the same thing like in class. Statics are method who can be used without initiate this one. So you can use it right with the model himself.

Example

```js
PostSchema.statics = {
  /**
   * Create a post
   *
   * @public
   * @param {Object} args - Object contains title and text
   * @param {String} authorId - the author id
   * @returns {Post} Post Object - new post create
   */
  createPost(args, authorId) {
    return this.create({
      ...args,
      author: authorId,
    });
  },

  list({ skip = 0, limit = 10 }) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author');
  },
};
```

Here I have 2 statics methods to my post. This method finally is just for abstract some of your code. For me, that make my life a bit easier and make the controller cleaner. The `createPost(args, authorId)` it's for just clean up a bit the code. I can use it by doing `Post.createPost({ title: 'Hello' }, '123')`. I just remove some code and make it a bit easier when it came to maybe change DB. I can keep the same controller but just change my `Post` services.

After this one we have `list({ skip = 0, limit = 10 })`. This one it's just for make kind of pagination easier. You can see I use the ES6 feature [Default Parameters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Default_parameters) who let me add default parameters if these values are `undefined`. Again I can use it like that `Post.list({ skip: 5, limit: 20 });`. This is again for me just sugars and makes my code easier to follow.

## Again toJSON() 😃

In the last example in the list we have `.populate('author');`. Because of the `toJSON()` by default the user gonna have only `_id` and `username` no need to add select value etc :). That's why I have `toAuthJSON()` who is called on login and `toJSON()` for this kind of thing.

## Packages

Some packages I didn't know in the NodeJS ecosystem and need to be used 😄.

### [Joi](https://github.com/hapijs/joi)

I really like this one for help me make validation in my controller. So easy to use too.

```js
export const validation = {
  create: {
    body: {
      title: Joi.string().min(3).required(),
      text: Joi.string().required(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      text: Joi.string(),
    },
  },
};
```

After this, in your routes file, you do with the help of [express-validation](https://github.com/AndrewKeig/express-validation)

```js
routes.post(
  '/',
  authJwt,
  validate(PostController.validation.create),
  PostController.create,
);
routes.patch(
  '/:id',
  authJwt,
  validate(PostController.validation.update),
  PostController.updatePost,
);
```

### [Helmet](https://github.com/helmetjs/helmet)

Helmet's a library who help you secure your Express app. Easy to install just need to add it as a middleware `app.use(helmet())`. This is for getting the standard. You can check on their GitHub to see another way.

### [Cors](https://github.com/expressjs/cors)

Cors's a middleware who enable for you the Cross-Origin request. Can be added for getting everything working just by doing `app.use(cors())` but it's a good thing to whitelist your front-end only etc. Take again a look at the docs before use it.

### [Http-Status](https://github.com/adaltas/node-http-status)

Http-Status just make your life easier to add status to your endpoint.

```js
export async function getList(req, res, next) {
  try {
    return res
      .status(HTTPStatus.OK)
      .json(await Post.list({ skip: req.query.skip, limit: req.query.limit }));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
```

## Other useful packages

### [Prettier](https://github.com/prettier/prettier)

Prettier help you to reformat your code and make it look better in no time. I start to use it about 1 month ago and now use it on every project I do. Easy to install this packages gonna save you time and gonna make your code look much better. PS if you use it with eslint and have a lot of red error maybe add `eslint-config-prettier` to your project and add it to your extends in `.eslintrc`. This gonna remove eslint issue with syntax looking and prettier gonna manage it.

Example

```
{
  "extends": [
    "equimper",
    "prettier"
  ]
}
```

### [Lint-Staged](https://github.com/okonet/lint-staged)

Lint-Staged gonna run your linter on your commit. Why have it ? Because maybe you use eslint and prettier and forgot all time to run the scripts. So your code looks bad etc. By adding this tools your commit gonna be linting before that let your commit. Can be really useful for a project with a lot of people.

For adding it I just add this in my `packages.json`

```json
{
  "pre-commit": "lint-staged",
  "lint-staged": {
    "*.js": [
      "eslint",
      "yarn prettier",
      "git add"
    ]
  },
  "scripts": {
    "lint": "eslint src --color",
    "prettier": "node ./scripts/prettier.js write",
    "lint-staged": "lint-staged",
  }
}
```

## End word

Hope this little article was a little gold mine of packages and tips for you. That was a really good experience working on this simple boilerplate. Plz take a look at it and let me know what you think of it.

[NodeJS-API-Boilerplate](https://github.com/EQuimper/nodejs-api-boilerplate)
