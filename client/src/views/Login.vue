<template lang="pug">
  v-container
    v-snackbar(:timeout="6000" :top="true" v-model="showAlert")
      | {{ loginError }}
      v-btn(text color="orange" v-on:click="showAlert = false") Close

    v-row
      v-col(cols="12")
        h2 Login to Globomantics

      v-spacer

      v-col(cols="12" sm="6" offset-sm="3")
        v-form
          v-text-field(type="text" label="E-mail" v-model="email" :rules="validation.email" required)
          v-text-field(type="password" label="Password" v-model="password" :rules="validation.password" required)

          v-btn.mr-4(text @click="cancelHandler") Cancel
          v-btn.mr-4(color="orange" dark @click="loginHandler") Login
</template>

<script>
import { mapGetters } from 'vuex'

const validation = {
  email: [
    v => !!v || 'E-mail is required',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ],
  password: [
    v => !!v || 'Password is required'
  ]
}

export default {
  name: 'Login',

  data () {
    return {
      showAlert: false,
      message: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async loginHandler () {
      const payload = {
        email: this.email,
        password: this.password
      }

      await this.$store.dispatch('user/logInUser', payload)

      if (this.isLoggedIn) {
        this.$router.push({ path: '/' })
      } else {
        this.showAlert = true
      }
    },

    cancelHandler () {
      console.log('The user does not want to login!')
    }
  },

  computed: {
    ...mapGetters('user', { isLoggedIn: 'isLoggedIn' }),

    loginError () {
      return this.$store.getters['user/loginError']
    }
  },

  created () {
    this.validation = validation
  }
}
</script>
