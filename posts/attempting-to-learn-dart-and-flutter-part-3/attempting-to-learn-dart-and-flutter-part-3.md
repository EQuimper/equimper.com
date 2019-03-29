---
title: 'Attempting to learn Dart and Flutter: Part 3'
date: 2019-03-29T10:00:40-04:00
description: "In the past week I've been working on a personnal project using Flutter and Firestore. In this post will show how I did match the BLoC pattern with Firestore"
tags: ['tutorial', 'flutter', 'dart', 'firestore', 'firebase']
---

## Intro

So [Firestore](https://firebase.google.com/docs/firestore/) a NoSQL database, is kind of like the second generation of [Firebase](https://firebase.google.com/). Nice product, I liked it, even if you need to rethink about a lot of stuff. Lately, I've been playing with a personal project *"I will have more info about this one in the next month :)"* with Flutter and Firestore. Here some stuff I found with this experiment.

First Firestore/Firebase give you quite a lot, analytics, authentication, email verification, real-time data, etc. So for an MVP of the product, I want to build it's the way to go I think. Autoscale, dashboard, etc, all came with that. Pretty nice for a one-man army. Also, the [integration with Flutter](https://pub.dartlang.org/packages/cloud_firestore) is really great. For sure it's a help when both products are own by the same company.

## BLoC (Business Logic Component)

So after reading a lot online, and see a lot of conference on [Youtube](https://youtu.be/RS36gBEp8OI) I see Google encouraged the developer to use the **BLoC Pattern**. Yes at the beginning that was quite hard to understand the flow and everything. But remind me a lot of what I was doing when I was using redux observable with react-native. So finally the BLoC pattern is kind of like React Context + RxJS. First, you create a BLoC who is a simple class. And after that, you create a provider who is an `InheritedWidget`. This lets you have access to the BLoC himself from anywhere in the app if you wrap the full app with the provider.

`youtube:RS36gBEp8OI`

Like React Context this let you jump some Widget. So no need to do props drill. But what is a BLoC? For me, because of my Redux or Mobx experience, I think of it like a Reducer or a Store. The UI trigger some action in this BLoC and this one past down the new state. I know maybe not the best way of thinking about this, but hey I'm not a master on Flutter, I learn on my free time :)

## How to use BLoC with Firestore

So Firestore gives you already a stream when you retrieved data from the DB. Really nice you can pass this directly to the StreamBuilder if you want.

```dart
return StreamBuilder(
  stream: Firestore.instance.collection('my collections').snapshots()
);
```

But what should I do if I want to move out of Firestore later? My UI depends too much of this if I wrap all the listener like that. So for me, I like to remove the business logic from the UI to keep it clean, and easier to refactor later.

The thing is it's easy to say perfect go and use BLoC + Firestore, but you don't gonna find too much documentation online. And the tutorials I found is not quite like I really want.

**What do I want?**

- Using BLoC
- But getting the typing working for me so I want model class.

What do I mean by *But getting the typing working for me so I want model class.*? If you use Firestore you receive from the stream a QuerySnapshot or DocumentSnaphot. This thing will return you a Map who can be used in Dart. The thing is a Map is too much dynamic for me. I'm not coming to a typing language to start doing dynamic stuff.

In Dart you can have multiple Constructor, it's a really good place if you want to create a model class who can parse himself from json or map.

```dart
class TodoModel {
  final String title;
  final bool completed;

  TodoModel({
    this.title,
    this.completed = false,
  });

  TodoModel.fromMap(Map<dynamic, dynamic> map)
      : title = map['title'],
        completed = map['completed'];
}
```

As you can see here my constructor fromMap will take the map and parsed it to my object. You see the `map['title']` stuff? I want that to just stay here, I don't want to start using this everywhere in my app. So that's why I say I want it type to an object. So how can we make Firestore working this way? I mean I want to be able to do inside my UI something like that.

```dart
return Text(todo.title);
```

Here what I did.

## My solution

*P.S this is just based on some experimentation, and for my use case, I'm still learning flutter so please, I know this is surely not optimum :)*

*P.S I use rxdart*

*The Repository is just a wrapper around my FirestoreProvider*

```dart
class TodosBloc {
  final _repository = Repository();
  final _todos = BehaviorSubject<QuerySnapshot>();

  Observable<List<TodoModel>> get todos => _todos.stream.transform(_todosTransformer());

  void dispose() async {
    await _todos.drain();
    _todos.close();
  }

  void getTodos() {
    _repository.getTodos().pipe(_todos);
  }

  StreamTransformer<QuerySnapshot, List<TodoModel>> _todosTransformer() {
    return StreamTransformer.fromHandlers(handleData: (
        QuerySnapshot data,
        EventSink<List<TodoModel>> sink,
        ) {

        final todos = data.documents.map((snap) => TodoModel.fromMap(snap.data)).toList();

        sink.add(todos);
    }, handleError: (error, stackTrace, sink) {
      sink.addError(error);
    });
  }
}
```

Here is nothing crazy, **I will make another post about a tutorial about it maybe later, here it's just to show you how I did** the main point here is I pipe my stream from Firestore who is the stream who return a list of map to a new stream who transform his values to a list of TodoModel. Now when I want to use it I can do that.

```dart
return StreamBuilder(
  stream: todosBloc.todos,
  builder: (BuildContext context, AsyncSnapshot<List<TodoModel>> snapshot) {
    switch (snapshot.connectionState) {
      case ConnectionState.waiting:
        return Center(
          child: CircularProgressIndicator(),
        );
      default:
        return ListView.builder(
          itemBuilder: (BuildContext context, int index) {
            final todo = snapshot.data[index];
            return Container(
              child: Text(todo.title),
            );
          },
          itemCount: snapshot.data.length,
       );
    }
  },
);
```

So now I can use my data like I want, as my class model. The autocomplete is there, and the linting also. So I cannot misspell something everywhere, the only place where I need to make sure I don't make type is the class model himself.

## End word

I hope you enjoy this little post, and maybe even learn something. Let me know in the comments if you have any question :)

Happy Coding :)