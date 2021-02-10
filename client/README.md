# Pluralsight - Building Business Applications with Vue.js and MongoDB

**by Mark Scott | Released 17 Jul 2018**

## Client

This distribution has been reengineered to work with latest Vue(v2.6.11), spawned from Vue CLI(v3) and using Vuetify(v2.4.3) - bringing it bang up to date with 2021 and resolving + fixing breaking changes since the original release of the exercise files shipped with the course back in 2018.

In addition the code has been revised and refined for improved and consistent usage of the contemporary JavaScript(es6) language. Errors have also been corrected - missing argument on dispatch, wrong reference to state, missing assignments etc.
Some of the Vue/Vuex feature sets have been expanded, most prominently the usage of namespaced modules to avoid collisions and to signpost such functionality. Static data has been removed from reactive props as a matter of best practice and principle from my point of view. Some files have been partitioned to better separate out concerns and suit my tastes in programming style. However most of these effects should be minimal and I hope welcome. Lastly the templates are written in Pug. Hate me for it if you must but it is my choice; and imo makes a huge difference in the readibility Vuetify's heavy heavy markup. Afterall, you can always run this through an online compiler, convert to HTML and copy and paste back in.

Notes:

- Vuetify v2.x.x is not compatible with Vue v3.x.x in anyway shape or form. Adoption is scheduled for Q3 2021 with the release of Vuetify 3. For now you **must** use Vue 2 with Vuetify.
- There is mixed usage of \$store accessors present in the code - state, getters etc. This is deliberate to demonstrate the full gamut of application available. I have also choosen to demonstrate `mapActions` which was absent from the course.
- `expand()` is a undocumented method attached to the Vuetify `data-table` component. It is what is called by the underlying mechanics of the component when `show-expand` is consumed as a prop to automagically unlock this functionality. An alternative method would be to add and remove items to the `expanded` Array exposed as a prop. This reactively represents the currently expanded item set. This prop is documented but not covered in any real detail.

  [expand: (v: boolean) => this.expand(item, v); in the Vuetify source](https://github.com/vuetifyjs/vuetify/blob/eeefd9cb112aea7a7edf60629c470fdbd0b08721/packages/vuetify/src/components/VDataIterator/VDataIterator.ts#L210)

- When you opt out of `show-expand` and chose to do it yourself you will be missing any complimentary CSS classes. Similarly using slots for customisation will have the same effects as these override what the source generates. It seems out of the box, animation is no longer supported by this feature. There are however an assortment of custom events fired - including cues for `expand()` - however I choose not to explore and delve that deep.
- There is a correction to the `mapTransaction` util method that was missing an expression to make assignment of the `_id` of an entry and to a Vue data prop. The `_id` key is declared on the `data-table` component however was not actually present as a property; this was failing silently with no visible effects in the prior treatment - however manually unlocking the expand feature will expose this mistake as iterable rows have no unique identifier applied(and all rows/items get toggled as a consequence). Key for this component is `id` by default in Vuetify.

The last version of Vuetify to ship with pre-made layouts before they were deprecated was v2.3.10. The [layout templates](https://github.com/vuetifyjs/vuetify/blob/v2.3.10/packages/docs/src/layouts/layouts/demos/google-contacts.vue) were taken from this release.

```
npm install vuetify@2.3.10
```

This release uses v4.5.95 of the Material Design Icon library which had to be [referenced](https://github.com/Templarian/MaterialDesign-Webfont/blob/v4.5.95/scss/_variables.scss) to update broken iconology.

**_It appears all modifications are forward compatible with the latest release of Vuetify without breaking changes - v2.4.3 as of publication._**

---

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
