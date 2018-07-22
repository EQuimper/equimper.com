---
title: "How do I manage state with React?"
linktitle: "How do I manage state with React?"
date: 2018-05-13T10:37:40-04:00
description: "How do I manage state in my react application? When to use Redux, MobX, Context API vs Component level state? What to do to handle forms state? How can I make my app state easier to maintain?"
tags: ["react", "redux", "formik", "mobx-state-tree", "mobx", "context api", "opinion", "article"]
---

## Intro

**SML** -> State management library (e.g. Redux & MobX)

**P.S.** This is just my opinion, this is not a best practice guide etc. It is just what I've found to be the best for the apps I built recently.

When building an app with React or React Native I had lots of options. One of the most important option was how to manage state, where to store it, how to use it, and lastly, how to make it easy to maintain.

I believe these are common questions before starting most projects. React gives us freedom and liberty that other libraries and frameworks don't give you, but it comes with it's own costs. You need to make more decisions, code with fewer conventions, etc.

One question I always ask myself before creating/managing state is which components are involved with this state. If you believe many components will be involved, then the answer is more obvious than when only a few components are involved. A SML can help you in these cases. When the answer is a single component and it's children, it is probably better to keep it at the component level state.

### Form state

So why not start with something I think the majority would agree. Don't put form state in Redux or any other lib, use component level state or tools like [formik](https://github.com/jaredpalmer/formik) or [react-final-form](https://github.com/final-form/react-final-form). I believe many developers have used libraries like redux-form or something similar, but make sure to try these libs. Formik and React-Final-Form are going to change the way you think about forms state. They're gonna help you with the management of you forms state easier than before.

Personally I prefer Formik, I like to use it with [Yup](https://github.com/jquense/yup) for creating validation schema.

I want to get the result of the login form inside my SML. You may wonder how may I do this? I have seen this question quite often and the answer is inside the question. **The Result**. Let Formik manage your form, handle the error(s) and submit. Then when you know all is good, store the result in your SML. Trust me, after building like 2-3 forms, you will not be able to live without Formik and Yup again.

### Animation state

The state should be managed at the component level state. By doing it this way, you can reuse this component with animation in another project. Remember if you build a project today with Redux and you handle this state with it and you want to reuse it, you will also need to use Redux in this new project and all the related boilerplate code. By creating it at the component level state, it's almost as simple as copying & pasting one file to transfer a usable component to your new project - Or you can publish it as an NPM package! :)

### App State

When you build a modern app you need to know a great deal about the current state of the app. Is the user online or offline? Is their location important? What is the part of the app that runs foreground or background in react-native, etc...

This is the kind of state I really like to manage with a SML. Why? Remember my question earlier about which components are involved? First, this is not even just component, some functions will need to know about this. For example, if offline you might store what the user tries to send and push it later to the server when he's back online. Then maybe you want to show a little toastr (or any other visual component) that says the app is in an offline mode.

In the the geolocation example, if you keep it as a _global_, you are making sure that each component(s) who need this value will have the same exact value. So, if you build an app with a map + something else, both are gonna have the same source of truth.

### Modal, toastr, theme manager

For this I once again go with a SML or now that it is released, the [Context API](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b). First, for a toastr and/or a modal, I think it is much simpler to keep just one instance of them. What do I mean by that? For instance, you declare one component who acts as the modal parent. This component handles if the modal is visible and if it is, which _type_ it represents (for example, if it's a welcome modal or a modal for a certain situation).

This one should connect with your SML. Why? Because the action to open the modal is surely gonna be used deeply in your app and you don't want to pass down this action 20 levels deep.

When dealing with a theme, I think you don't have many options. You can use the new Context API (which I think is awesome for this kind of stuff) or you can use your SML of choice.

### User state

This one is surely one of the most common one. Keeping the current viewer state. Is the user logged in or not, his avatar URL etc. I think this one should be handled in your SML. More often than not, the navbar is going to need the avatar URL and also if the user is logged in to conditionally show some links. Also, when the user sees his profile, he can probably update it but if he's looking at someone else's profile, it may be just a plain view.

### Conclusion

I hope this little article has helped you at some point. If your question is which SML I like the most, I think right now it is [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) which is like Redux meets MobX.

Hope you see why React state can be really useful and don't make the same mistake I made when starting by only using the SML state and never using component level state.

Let me know in the comments if you have any questions or if you find some typos :)