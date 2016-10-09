# Pusher channel name encoding

A Pusher channel name identifies something in your domain model. Some examples:

* The channel `private-user-jim` might represent "private messages to the user Jim".
* The channel `private-convo-jim-fred` might represent "the private conversation between Jim and Fred".

These identities are *composite*, which means we need to encode several *components* in the channel name. Respectively:

* `private-user-jim` encodes `private`, `user`, and `jim`.
* `private-convo-jim-fred` encodes `private`, `convo`, `jim` and `fred`.

A naive approach to encoding these is to join the components with hyphens, like this:

```javascript
pusher.subscribe("private-convo-" + myAccount.id + "-" + otherAccount.id);
```

This ad-hoc approach has two problems:

1. What if the components contain hyphens? Then your encoding is not injective!
1. What if the components contain characters outside the range for Pusher channel names? Then your encoding is not a Pusher channel name!

This package provides `encodeChannelName`, a principled replacement for ad-hoc string munging. This function takes an array of strings and produces a safe, idiomatic Pusher channel name:

```
> encodeChannelName(["private", "user", "jim"])
'private-user-jim'
> encodeChannelName(["private", "user", "\u{1F4A9}"])
'private-user-=1F4A9;'
> encodeChannelName(["private", "convo", "jim", "kennedy-smith"])
'private-convo-jim-kennedy=2D;smith'
> encodeChannelName(["private", "convo", "jim-kennedy", "smith"])
'private-convo-jim=2D;kennedy-smith'
```

This function could in future be integrated into Pusher libraries, so we can write:

```javascript
pusher.subscribe(["private", "convo", myAccount.id, otherAccount.id]);
```
