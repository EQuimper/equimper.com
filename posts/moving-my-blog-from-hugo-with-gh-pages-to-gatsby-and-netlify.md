---
layout: blog
title: Moving my blog from Hugo with Gh-Pages to Gatsby and Netlify
description: '  How was my experience moving from Hugo to Gatsby, Gh-Page to Netlify. How   using Netlify-CMS make my workflow for this blog much more simple.'
date: '2018-07-26T18:58:40-04:00'
tags:
  - netlify
  - gatsby
  - netlify cms
  - static site
---
## Intro

Like everyone else who follow the web development news on Twitter I see lot of article about this thing call [GatsbyJS](https://www.gatsbyjs.org/). This is a static site generator who use modern techs like Webpack, React and GraphQL. Lot of the post I see was about how the performance is awesome, how easy you can build a site and deploy it. Finally a big tweet I see lately was the fact then the Gatsby team receive a good amount of money "3.8m" and become a startup.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">📣 BIG NEWS: Gatsby is officially a startup! We’re thrilled to announce a $3.8M seed round &amp; the formation of Gatsby Inc!<br><br>💪 We’ve got big plans to make the Gatsby open-source ecosystem even more powerful:<a href="https://t.co/zyvLuUOXDB">https://t.co/zyvLuUOXDB</a></p>&mdash; Gatsby (@gatsbyjs) <a href="https://twitter.com/gatsbyjs/status/999684072501792768?ref_src=twsrc%5Etfw">May 24, 2018</a></blockquote>

How not be excited about this 😀. Also another big thing I see on my feed was [Netlify](https://www.netlify.com/). This is kind of the de-facto way to deploy your Gatsby site. I like the fact then this is really simple to deploy with and also https came for free without any more effort.

## Why did I move?

So first thing my blog was on [Hugo](https://gohugo.io/), another static site generator but who use the [Golang](https://golang.org/) language. I was really happy with this tech. The thing was why use a language I don't really use everyday when Gatsby come with React and GraphQL. Two techs I use at my current job and also even teach it on [Youtube](https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw).

Before doing the move, I search a lot on the web for tutorial about how use Gatsby, how the deploy go, how you do a query, how you create page and also if you can use all the React ecosystem. All my questions was really simple to answer just by looking at all the great documentation the Gatsby [site](https://www.gatsbyjs.org/docs/) have. They don't let you go all in with this without teaching you how to use their product, this is a big plus for me.

Because it's open source, a lot of plugin are create by the community to leverage the ecosystem. Example you want to use markdown? [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark) is there for you. You want to have better performance for you image? [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image) is an awesome plugin for this. As you can see almost everything you can ask for you site you can get it with a plugin. "You can still use almost all the library you use in your regular react app 😀"


## Netlify CMS

In my other blog I was writing the markdown post right from my text editor. Was great, I mean for a developer this is like you do everyday. But I feel like I don't wrote as many post I want because the experience is not so great.

I was reading a lot about headless CMS, like [Contentful](https://contentful.com/) or [Prismic](https://prismic.io/). Really like the idea about it. I even create this blog with this tool first. But one night I was watching some video on youtube and see this one.

`youtube:YyRwMy59d4M`

This talk really sell me Netlify CMS. I mean first I already want to use Netlify for the deployment, second I want to be able to customize all my experience with it, and finally I don't want to pay for something I can handle for free in my text editor.

So I give it a chance, I navigated to their [website](https://www.netlifycms.org/) and follow the docs about how to setup it. Because I know Gatsby build lot of awesome plugin I try to search if one exist to make my life even easier to install it. And yes 😀I found this plugin call [gatsby-plugin-netlify-cms](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cms).
