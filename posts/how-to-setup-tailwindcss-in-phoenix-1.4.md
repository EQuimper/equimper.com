---
title: 'How to setup TailwindCSS in Phoenix 1.4'
linktitle: 'How to setup TailwindCSS in Phoenix 1.4'
date: 2018-11-14T10:00:40-04:00
description: 'How to use TailwindCSS with Phoenix 1.4'
tags:
  ['elixir', 'css', 'article', 'phoenix', 'tailwindcss', 'tutorial', 'postcss']
---

I've been using Tailwind lately and really loved it. But one thing about this one is how to install it in a new project. My last personal project was with the brand new Phoenix 1.4 framework and I did want to use Tailwind for this one. So here just a "How to" guide about installing this one.

I did this article, cause I did search for this kind of one in the net and didn't found anything. So I hope that can help someone who tries it :)

## Step 1 - Setup the Project

First, make sure you have the new version of Phoenix install on your machine. Just follow all the step on the docs [here](https://phoenixframework.org). After we need to start a brand new project. We can do this by running the command

```
mix phx.new myproject
```

Don't forget to say yes when they ask about installing the dependencies.

## Step 2 - Install Tailwind

```
cd assets
```

So now we are in the front-end side, we can then install tailwind as a npm dev packages

```
yarn add -D tailwindcss
```

Now Tailwind is installed and ready. But we need to initialize it to get the basic theme etc.

From the terminal run the command

```
./node_modules/.bin/tailwind init
```

This command will create a `tailwind.js` file who contains all the CSS of your project. Here I don't go in details about Tailwind you should read about it [here](https://tailwindcss.com/docs/what-is-tailwind)

## Step 3 - Setup Webpack etc...

Now we need to setup webpack to make it work with Tailwind + Postcss

```
yarn add -D postcss-loader
```

This will add Postcss as dev dependencies and will be available for webpack.

Create a file in the assets folder call `postcss.config.js` and add this code

```js
// assets/postcss.config.js

module.exports = {
  plugins: [require('tailwindcss')('./tailwind.js'), require('autoprefixer')],
}
```

This will setup Tailwind with the file we have created when we run `./node_modules/.bin/tailwind init`. Also here I just add the autoprefixer but not required.

After this open you `webpack.config.js` file and add postcss-loader after the css-loader in the module object.

```diff
// assets/webpack.config.js

const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => ({
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  entry: {
    './js/app.js': ['./js/app.js'].concat(glob.sync('./vendor/**/*.js')),
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../priv/static/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
-         use: [MiniCssExtractPlugin.loader, 'css-loader']
+         use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/app.css' }),
    new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
  ],
});

```

Open your `assets/css/app.css` and override the code for this

```css
/** assets/css/app.css */

/**
 * This injects Tailwind's base styles, which is a combination of
 * Normalize.css and some additional base styles.
 *
 * You can see the styles here:
 * https://github.com/tailwindcss/tailwindcss/blob/master/css/preflight.css
 *
 * If using `postcss-import`, use this import instead:
 *
 * @import "tailwindcss/preflight";
 */
 @tailwind preflight;

 /**
  * This injects any component classes registered by plugins.
  *
  * If using `postcss-import`, use this import instead:
  *
  * @import "tailwindcss/components";
  */
 @tailwind components;

 /**
  * Here you would add any of your custom component classes; stuff that you'd
  * want loaded *before* the utilities so that the utilities could still
  * override them.
  *
  * Example:
  *
  * .btn { ... }
  * .form-input { ... }
  *
  * Or if using a preprocessor or `postcss-import`:
  *
  * @import "components/buttons";
  * @import "components/forms";
  */

 /**
  * This injects all of Tailwind's utility classes, generated based on your
  * config file.
  *
  * If using `postcss-import`, use this import instead:
  *
  * @import "tailwindcss/utilities";
  */
 @tailwind utilities;

 /**
  * Here you would add any custom utilities you need that don't come out of the
  * box with Tailwind.
  *
  * Example :
  *
  * .bg-pattern-graph-paper { ... }
  * .skew-45 { ... }
  *
  * Or if using a preprocessor or `postcss-import`:
  *
  * @import "utilities/background-patterns";
  * @import "utilities/skew-transforms";
  */
```

## Step 4 - Time to code

Now after you run `mix phx.server` from the _ROOT_ directory of your project, you can then see the result inside your `priv/static/css/app.css`. All the TailwindCSS will be there.

## End word

I hope this article make your life a bit easier and now you are able to go and build your awesome project with Tailwind and Phoenix :)
