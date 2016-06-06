# Vue: from view to view

- date: 2016-06-06 21:20
- tags: javascript

A lightning talk for #vuejs Japan. An idea on maintainable vue project.

---

This is a brief of my #vuejs Japan lightning talk. A concept on how to
manage your vue files.

<script async class="speakerdeck-embed" data-id="8e462e5ccbc541ddb5cb2b6613af8c42" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

A basic structure for your vue files:

```
App.vue
views/
  Home.vue
  ...
components/
  Avatar.vue
  ...
widgets/
  ChatPopup.vue
  ...
```

## App.vue

The entry point for your project.

If you are using vue-router, it is the file for `<router-view>`.

## views

Views are the pages. If you are using vue-router, it is the component that
`<router-view>` represents right now.

Every vue file in `views` directory is a web page.

## components

Components are just components. A component is a UI related module, it only
cares about UI. It can never send HTTP requests.

## widgets

A widget is a component that can handle data communication. It can talk to the
server, and it must talk to the server.

---

For more information, check the slide. A talk at 2016-05-31.
