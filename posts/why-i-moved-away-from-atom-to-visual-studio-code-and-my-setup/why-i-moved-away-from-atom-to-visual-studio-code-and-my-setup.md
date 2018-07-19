---
author: "Emanuel Quimper"
date: 2017-02-25T09:10:28-05:00
linktitle: Why I moved away from Atom to Visual Studio Code and my Setup
title: Why I moved away from Atom to Visual Studio Code and my Setup
description: Why did I quit Atom? What Visual Studio Code have more than Atom?.
weight: 10
tags: ["text editor", "javascript", "web"]
---

{{< youtube baJyGTJr9so >}}

VSC: Visual Studio Code

## Why I moved away from Atom

I was an Atom user for nearly a year. Everything about this text editor was perfect for me. For starters, the packages manager was much more beginner friendly than Sublime. Also, there were always new updates which seemed to make my text editor more and more powerful with each update. But 4 months ago I started to feel the pain of the slow speed of Atom. This nearly broke my heart as I had put so much time and effort customizing the perfect setup for my needs. I built custom packages, created color syntax for different languages and even made my own code snippets.

## So VS Code?

Yes, I choose [VS Code](http://code.visualstudio.com) and yes I wasn't sold the first time I saw it. I don't like Microsoft products, but this one had something I really liked.

### Fast

Open VSC took me less than 10 seconds.

### CPU

VSC took almost no CPU! I got some weird stuff with code helper in the activity monitor of my MAC but I quickly resolved the issue by tweakng the settings(I’ll show these magic settings at the end of this post).

### Intelisense

The Atom JavaScript autocomplete was really great but when I switched to VSC I never missed it. The fact than you can mouse over a function and see what it does or `cmd + click` on a file path and go right to the file is awesome! You can do the same thing in Atom. I know. But it’s just not as smooth as VSC.

### Packages

Like Atom, VSC has a lot of packages. The VSC community put a lot of effort into making your experience with this text editor better everyday. I miss some of Atom packages but at the same time, I have some new favorites for VSC.

## My Top Packages

*Here you can click on the packages name. This is a link :)*

### [Path Intelisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

This helps you get the relative path of your file and help you to autocomplete path names when you do something like…

```js
import MyComponent from './src/components/MyComponent';
```

Plus, this works with dependencies from your `packages.json`.

### [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)

This extension helps my life so much. When you have a lot of projects and don't want to waste time finding each one on your computer, you can just save them right inside the window. Just press `shift + cmd + p` and `Project Manager: Save Project`. Afterwards, you can just come back to your text editor and search right in the project manager by typing `shift + cmd + p` and `Project Manager: List Projects to Open`.

### [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

This one doesn't do much. But what it does do is a huge help! For example, you’re working on a React project and you want to change your component `MyApp` to be `YourApp`. This extension will rename rename every ‘MyApp’ to ‘YourApp’ at the same time.

### [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

Some es6 snippets you help you write code faster.

### [Output Colorizer](https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer)

Add color to the internal terminal. Did I mention there is a built in terminal in VSC?!?

### [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)

You need this if you work with React.

### [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

This will highlight your color variables inside CSS and JS. So, when you type something like `#fff` you’ll see a white colored highlight on it.

### [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

If you follow me on [Youtube](https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw) you have surely seen how much I like this little tool. It makes your code more consistent for multiple users. What do I mean by this? It allows you to not worry so much about your Text Editor settings and will add some handy settings like `indentation` or `trim whitespace`. This is useful for teams because it can be painful to see some 4 space indents on one page and 2 space indents on another. This works on almost every code editor too, so if your friends don't use want to use your new favorite text editor, it will work for them too.

### [EditorConfig Generator](https://marketplace.visualstudio.com/items?itemName=nepaul.editorconfiggenerator)

This will generate a `.editorConfig` file for you with some nice editor settings.

### [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Again, this is a tool I use on every project. This tool will help you to make your code better and let you know about errors before your code runs. For example, eslint will show you when you miss a semicolon or when you declare a variable but you never use it. But these errors depend on your eslint config.

PS I have created my own. You can install it from npm `npm i -D eslint-config-equimper`. This one is an extension of the Airbnb linter.

[Link to mine](https://www.npmjs.com/package/eslint-config-equimper)

### [Flow Ide](https://marketplace.visualstudio.com/items?itemName=gcazaciuc.vscode-flow-ide)

If you are like me and you like Flow you need this tool. Less laggy than the nuclide one in Atom plus it's the better solution for VSC I’ve found.

### [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides)

Add some indent guide lines to your code. Much easier on the eyes.

### [Indent-Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

Again, an extension to make your eyes happy when looking through lots of indented code.

### [Jumpy](https://marketplace.visualstudio.com/items?itemName=wmaurer.vscode-jumpy)

This is an awesome extension, but I don't really use it. But for the those who don’t like using their mouse, this is something you need. It will help you navigate your file really quickly without using your mouse.

### [Rainbow Bracket](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)

Another one that’s easy on the eyes.

### [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)

React-Native user? This tool it's for you.

### [Wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)

This plugin will track your time spent in your text editor each week. It's like a Fitbit for a programmer. It will tell you which project you spend the most time on, which language you use the most and can even keep track of goals you set during the week.

## My Editor

![](https://image.ibb.co/fu8uQk/RmEXgyy.png)

My color schema is [One Monokai](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai). For icons I use [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

## My settings

[You can add some of my settings to your.](https://gist.github.com/EQuimper/e619cdcd555798ea2f06aa009ec7fa8d)

---

## My Snippets Packages

[Link](https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux#review-details)

---

## Hidden Gem

One of my friends have started his own youtube channel where he talk about programming in general. Take a look at [his channel](https://www.youtube.com/channel/UCxdr1zRpfUfZw_5GqrpvXGg)

---

If you want to learn React-Native with NodeJS for your server side, I'm building a tutorial on youtube.

[Build a Meetups App With React-Native and Node.JS](https://www.youtube.com/playlist?list=PLzQWIQOqeUSNX_ZDqt9L3TMSwFa9GbIwp)
