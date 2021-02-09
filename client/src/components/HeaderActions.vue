<template lang="pug">
  .d-flex.align-center(style="margin-left: auto")
    v-menu(offset-y open-on-hover bottom)
      template(v-slot:activator="{ on, attrs }")
        v-btn(icon v-bind="attrs" v-on="on")
          v-icon mdi-account

      v-list(dense)
        v-list-item(@click="showProfile")
          v-list-item-icon
            v-icon mdi-account-details
          v-list-item-content
            v-list-item-title Show Profile

        v-list-item(@click="logOut")
          v-list-item-icon
            v-icon mdi-exit-to-app
          v-list-item-content
            v-list-item-title Log Out

    v-btn(icon)
      v-icon mdi-notifications

    v-dialog(v-model="profileDialog" persistent max-width="600px")
      v-card
        v-card-title
          span.headline User Profile

        v-card-text
          v-container(grid-list-md)
            v-row(wrap)
              v-col(cols="12" sm="6")
                v-text-field(label="First name" v-model="user.first" required)
              v-col(cols="12" sm="6")
                v-text-field(label="Last name" v-model="user.last" required)
              v-col(cols="12")
                v-text-field(label="Email" v-model="user.email" hint="This is also your login username" persistent-hint required)
              v-col(cols="12")
                v-text-field(type="password" label="Password" v-model="user.password" required)
              v-col(cols="12")
                v-text-field(type="password" label="Verify Password" v-model="user.verifyPassword" hint="When changing your password, please enter twice" persistent-hint
                  :rules="[() => user.password == user.verifyPassword || 'Passwords entered do not match']" required)
          small *indicates required field

        v-card-actions
          v-spacer
          v-btn.mr-2(text @click="profileDialog = false") Close
          v-btn.mr-2(color="orange" dark @click="saveProfile") Save
</template>

<script>

export default {
  name: 'HeaderActions',

  data () {
    return {
      profileDialog: false,
      user: {
        first: '',
        last: '',
        email: '',
        password: '',
        verifyPassword: '',
        isActive: true
      }
    }
  },

  methods: {
    showProfile () {
      this.profileDialog = true
    },

    saveProfile () {
      this.$store.dispatch('user/updateUserProfile', this.user).then(() => {
        this.password = this.verifyPassword = ''
      })

      this.profileDialog = false
    },

    logOut () {
      // TODO
      console.log('User logout requested...')
    }
  },

  mounted () {
    const { first, last, email } = this.$store.state.user

    this.user.first = first
    this.user.last = last
    this.user.email = email
  }
}
</script>
