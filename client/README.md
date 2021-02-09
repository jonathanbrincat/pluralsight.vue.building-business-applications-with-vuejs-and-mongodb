# Pluralsight Building Business Applications with Vue.js and MongoDB

# Client

## by Mark Scott

## Released 17 Jul 2018

This distribution has been reengineered to work with latest Vue(v2.6.11)/Vue CLI and Vuetify(v2.4.3) - resolving and fixing breaking changes since the original release of the exercise files shipped with the course.
In addition the code has been revised and refined for improved and consistent adoption of the modern javascript(es6) language. Errors have also been corrected - missing argument on dispatch, wrong reference to state.
Some of the Vue/Vuex feature sets have been expanded most prominently the usage of namespaced modules to avoid collisions and to signpost such functionality. Constant values removed from reactive props as a matter of best practice. Some files have been partitioned to separate concerns and better suit my taste on programming styles. Lastly the templates are written in Pug. Hate me for it if you must but it is my choice - and imo makes a huge difference in the readibility Vuetify's heavy markup. You can always run this through an online compiler to release the HTML, copy and paste back in situ.

Notes: \* There is mixed usage of \$store accessors in the code - state, getters etc. This is deliberate to demonstrate the full gamut of applications. I have also choosen to demonstrate `mapActions` which was absent from the course.
\*expand() is a undocumented method attached to the Vuetify `data-table` component is what is called by the mechanics of the component when `show-expand` is declared as a prop to automagically unlock this functionality. An alternative would be to add and remove items to the `expanded` prop. This is an exposed Array that represents the items currently expanded. This is documented but not covered in any real detail.
`expand: (v: boolean) => this.expand(item, v)`
https://github.com/vuetifyjs/vuetify/blob/eeefd9cb112aea7a7edf60629c470fdbd0b08721/packages/vuetify/src/components/VDataIterator/VDataIterator.ts#L210
\*\*when you opt out of the automagic creation of the expanded feature you will be missing the complimentary css classes. Similarly using slots for customisation will have the same effects as these override what the source generates. It seems out the box, animation is no longer supported by this feature.
\*\*\*correction to the `mapTransaction` util method that was missing the expression to capture the `_id` of an entry and translate it to the data prop. The `_id` key is declared on the data-table component but was not actually present on the data prop object; this was failing silently with no visible effects in the prior treatment - however manually unlocking the expand feature will expose this error as iterable rows have no unique identifier present(and all rows/items get toggled as a consequence). Key is `id` by default.

The last version of Vuetify to ship with pre-made layouts before they were deprecated was v2.3.10
https://github.com/vuetifyjs/vuetify/blob/v2.3.10/packages/docs/src/layouts/layouts/demos/google-contacts.vue

```
npm install vuetify@2.3.10
```

This release uses v4.5.95 of the Material Design Icon library
https://github.com/Templarian/MaterialDesign-Webfont/blob/v4.5.95/scss/_variables.scss

UPDATE: it appears all modifications are forward compatible with the latest release of Vuetify without breaking changes - v2.4.3 as of publication

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
