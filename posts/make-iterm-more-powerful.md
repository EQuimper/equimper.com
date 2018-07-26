---
author: "Emanuel Quimper"
date: 2017-06-22T18:18:59-05:00
linktitle: Make iterm more powerful
title: Make iterm more powerful
description: Iterm his already awesome but with this quick tips can be more. How can you make iterm listen to native mac command ?
weight: 10
tags: ["random", "tips", "command line"]
---

I love [Iterm](https://iterm2.com/) and I would like to share with you some of the tips I found with this awesome tools.

## Make him look pretty

Everyone loved to work with the awesome, fast and powerful tool. But we also want them to look pretty and by customizable. Iterm can be all of them. First thing at the first installation the theme is already pretty good. But if you want to change this theme just take a look at this [website](http://iterm2colorschemes.com/). He has a lot of scheme and some of them are really beautiful. Also in your profile settings `⌘ + ,` you can change the fonts of him. If you don't like the standard font you can just change it here. ![](https://image.ibb.co/nFyA05/uhjhcr38qq5efbw_preserve_transparency_False_size_1024x1024_size_mode_2.png)

Just click on change font. For me has you can see I use [Hasklig](https://github.com/i-tu/Hasklig).

## Make it feel more native

Has a Mac user, we love the shortcut of Mac when it comes to delete a single word, delete a full line, go to the beginning of a line etc. But if you have played with iterm you know them they don't work. **BUT** They can ;)

Go in your profile `⌘ + ,` and click on keys

![](https://image.ibb.co/m95OL5/v0meg9nqfruwhj5_preserve_transparency_False_size_1024x1024_size_mode_2.png)

After that in the right where we see Key mappings, we can add these command.

---

### For delete a single word with `⌥ + ⌫`

- Action: Send Hex Code 0x17

### For delete a full line with `⌘ + ⌫`

- Action: Send Hex Code 0x15

### For go to the beginning of a line with `⌘ + ←`

- Action: Send Hex Code 0x01

### For go to the end of a line with `⌘ + →`

- Action: Send Hex Code 0x05

---

## Some tips

For opening a new tab like always in Mac you can just `⌘ + t`. After that, if you want to travel between them you can `⌘ + number of the panel`. Example `⌘ + 2` send me to the second panel.

Also if you want to split screen just hit `⌘ + d` that gonna split to the right. If you want to change between split you can here

![](https://image.ibb.co/m95OL5/v0meg9nqfruwhj5_preserve_transparency_False_size_1024x1024_size_mode_2.png)

Add the same command as me. So now I just need to `⌥ + number of the split`.

## Open him with a good size

For me, I like Iterm to be with a standard size when I open it. For the change, it just goes in profile again but on the window now. If you want the same size as me.

- Column: 120
- Rows: 41

![](https://image.ibb.co/kOCjA5/wchcxskommveugq_preserve_transparency_False_size_1024x1024_size_mode_2.png)

## If you want to open with the split or new tab same directory

When I code I always finish by open lot of tabs with him. I hate when I need to cd in my directory again. So for that Iterm make it easy for us. You can check on Iterm to make him open in the same directory really easy.

In profile again with the tab general open just check in the working directory section like that

![](https://image.ibb.co/nRanV5/3676wras0icr8mq_preserve_transparency_False_size_1024x1024_size_mode_2.png)

## Finish

Hope you have like this little post and find it helpful :)