import Vue from 'vue'
import bcrypt from 'bcryptjs'

export default {
  namespaced: true,

  state: {
    email: '',
    first: '',
    last: '',
    userId: null, // DEVONLY '5a777f0a75f64a1698221d98'
    isLoggedIn: false,
    loginError: ''
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    loginError: state => state.loginError
  },

  actions: {
    async logInUser ({ commit }, payload) {
      try {
        const { data } = await Vue.axios.get('/user/email/' + payload.email)

        if (data && data.length > 0) {
          const pwdHash = data[0].password
          if (bcrypt.compareSync(payload.password, pwdHash)) {
          // if (data[0].password === payload.password) { // DEVONLY: retained to make life easier when playing with new passwords
            const user = data[0]
            payload.userId = user._id
            payload.first = user.first
            payload.last = user.last
            payload.email = user.email
            return commit('logInUser', payload)
          }
        }
        throw new Error()
      } catch (error) {
        commit('loginError')
      }
    },

    updateUserProfile (context, payload) {
      bcrypt.hash(payload.password, 8, async (error, hash) => {
        if (!error) {
          payload.password = hash
          console.log('password hash: ', payload.password)

          try {
            const resp = await Vue.axios.put('/user/' + this.state.user.userId, payload)
            console.info(resp)
          } catch (error) {
            console.error('There was a problem updating your profile :: ', error)
          }
        } else {
          console.error('There was an encryption error :: ', error)
        }
      })
    }
  },

  mutations: {
    logInUser (state, payload) {
      state.isLoggedIn = true
      state.email = payload.email
      state.first = payload.first
      state.last = payload.last
      state.userId = payload.userId
    },

    loginError (state) {
      state.isLoggedIn = false
      state.loginError = 'Email and/or Password are invalid. Login failed.'
    }
  }
}
