---
title: 'Setup CORS in Firebase Functions'
linktitle: 'Setup CORS in Firebase Functions'
date: 2018-11-27
description: "How can I setup CORS in Google Cloud Functions. How can I remove the error 'Access-Control-Allow-Origin'. You get this issue about CORS and you don't know what to do ? I finnaly fix it on my side and I want to show you how I deal with it."
tags:
  [
    'article',
    'tutorial',
    'nodejs',
    'firebase',
    'firebase functions',
    'javascript',
    'express',
    'typescript',
  ]
---

In one of my last project, I was using [Firebase Functions](https://firebase.google.com/docs/functions/). I did love to use them, but it’s quite hard to find some solution on this new stuff. One think I found pretty hard to get it work was the CORS of my project. When I use [Express](https://expressjs.com/) I can use the packages [CORS](https://github.com/expressjs/cors), but here we don't have a server. Firebase Functions are just simple function. Yes, they can be use as HTTP endpoint etc, but they go sleep after being trigger and completed the job. The thing also is when I add this CORS package, I add it as middleware. Here if, I want to use a middleware I can but I will need to add express and wrap the full server with it.

Yes, that will have been so much easier I know. But I want to fix that without going to this path. So after searching on StackOverFlow a lot and try/error I finally figured out :).

First, we need to add this CORS package. Yes I know you can set it without it, but for this tutorial, I will show with
it. Also the example I will show make use of [Typescript](https://www.typescriptlang.org/). You can use javascript without any problem also :)

```
yarn add cors
```

After inside your `index.ts` file or whatever file where you import your function just import CORS and initialize it.

```js
import cors from 'cors'

const corsHandler = cors({
  origin: [
    'http://localhost:3000',
    // Staging URL
    // PROD URL
  ],
}****)
```

We will need to add this `corsHandler` function to your functions.

```js
export const hello = functions.https.onRequest(
  (req: functions.Request, res: functions.Response) => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    corsHandler(req, res, async () => {
      await // my logic

      res.status(200).json({ message: 'Yes cors work' })
    })
  }
)
```

As you can see I pass to my corsHandler the request and response object. This way I can setup the cors pretty easily. I know in some place we see

```js
export const hello = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    corsHandler(req, res, () => {})

    await // my logic

    res.status(200).json({ message: 'Cors will work, but we will received an error of headers' })
  }
)
```

Like you can see, not a lot of difference. But yes we have one if I do this in the firebase logs I received. **Error: Can't set headers after they are sent.**

## Alternative

For sure with this way, this will get painful to add CORS everywhere. That's why you can then use express to make your life easier.

```js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    // Staging URL
    // PROD URL
  ],
})

app.post('/hello', async (req: functions.Request, res: functions.Response) => {
  // logic here
}));

export const app = functions.https.onRequest(app);
```

Much simpler, YES sure. But now your endpoint will look like `<yourdomain>/app/...`. You can maybe go with like a `v1` as export so this will look like versioning but hey here it's your choice :)

## End word

Hope this helps you fix this issue. For me, that takes a bit more time then on a regular server. But now it work :).