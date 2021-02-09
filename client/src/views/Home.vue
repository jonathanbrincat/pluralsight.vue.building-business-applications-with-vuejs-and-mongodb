<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app)
      v-list(dense)
        template(v-for="(item, ndx) in menuItems")
          v-row(v-if="item.heading" :key="ndx" align="center")
            v-col(cols="6")
              v-subheader(v-if="item.heading") {{ item.heading }}
            v-col.text-center(cols="6")
              a.body-2.black--text(href="#!") EDIT

          v-list-group(v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="")
            template(v-slot:activator)
              v-list-item-content
                v-list-item-title {{ item.text }}

            v-list-item(v-for="(child, i) in item.children" :key="i" link @click="menuAction")
              v-list-item-action(v-if="child.icon")
                v-icon {{ child.icon }}
              v-list-item-content
                v-list-item-title {{ child.text }}

          v-list-item(v-else :key="item.text" link @click="menuAction")
            v-list-item-action
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title {{ item.text }}

    v-app-bar(:clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title.ml-0.pl-4(style="width: 300px")
        span.hidden-sm-and-down Globomatics Rewards

      v-spacer

      v-btn(icon)
        v-icon mdi-apps
      v-btn(icon)
        v-icon mdi-bell
      v-btn(icon large)
        v-avatar(size="32px" item)
          v-img(src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify")

      HeaderActions

    v-main
      v-container.fill-height(fluid)
        v-row(align="center" justify="center")
          v-col(cols="12")
            Transactions

    EditTransactions
</template>

<script>
import Transactions from '@/components/Transactions.vue'
import EditTransactions from '@/components/EditTransactions.vue'
import HeaderActions from '@/components/HeaderActions.vue'

export default {
  name: 'Home',

  components: {
    Transactions,
    EditTransactions,
    HeaderActions
  },

  data: () => ({
    dialog: false,
    drawer: null,
    menuItems: [
      { icon: 'mdi-contacts', text: 'Add Transaction' },
      { icon: 'mdi-history', text: 'Current Month' },
      { icon: 'mdi-content-copy', text: 'Notes' },
      { icon: 'mdi-cog', text: 'Settings' },
      { icon: 'mdi-message', text: 'Send feedback' },
      { icon: 'mdi-help-circle', text: 'Help' }
    ]
  }),

  methods: {
    menuAction () {
      // TODO
    },

    showProfile () {
      console.log('show profile clicked!')
    }
  },

  computed: {
    isLoggedIn () {
      return this.$store.getters['user/isLoggedIn']
    }
  },

  mounted () {
    if (!this.isLoggedIn) this.$router.push({ path: '/login' })
  }
}
</script>
