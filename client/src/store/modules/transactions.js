import Vue from 'vue'
import { mapTransaction } from '@/utils'

export default {
  namespaced: true,

  state: {
    currentMonth: 2,
    currentYear: 2021,
    transactions: [],
    balanceCharges: 0,
    balanceDeposits: 0
  },

  getters: {
    transactionsByMonth: state => state.transactions,
    balanceCharges: state => state.balanceCharges,
    balanceDeposits: state => state.balanceCharges
  },

  actions: {
    async getTransactionsByMonth ({ commit, state, rootState }) {
      const options = {
        headers: {
          userId: rootState.user.userId
        }
      }

      // Make API call... Pass in selected Month and Year + UserId in hearder...
      // Once transaction data is retrieved... commit the mutation to update state...
      try {
        const { data } = await Vue.axios.get('/transaction/' + state.currentYear + '/' + state.currentMonth, options)
        if (data && data.length > 0) commit('transactionsByMonth', data)
      } catch (error) {
        console.log('Darn! There was an error getting transactions by month: ' + error)
      }
    },

    async getPreviousMonthsBalances ({ commit, state, rootState }) {
      commit('transactionsByMonth', [])

      const options = {
        headers: {
          userId: rootState.user.userId
        }
      }

      // Make API call... Pass in selected Month and Year + UserId in hearder...
      try {
        const { data } = await Vue.axios.get('/transaction/balance/' + state.currentYear + '/' + state.currentMonth, options)
        console.log('GET transaction/balance', data)

        if (data && data.length > 0) {
          commit('balanceCharges', data[0].charges)
          commit('balanceDeposits', data[0].deposits)
        } else {
          commit('balanceCharges', 0)
          commit('balanceDeposits', 0)
        }
      } catch (error) {
        console.log('Darn! There was an error getting balances: ' + error)
      }
    },

    async gotoMonth ({ commit }, increment) {
      commit('gotoMonth', increment)
    },

    async gotoCurrentMonth ({ commit }) {
      commit('gotoCurrentMonth')
    },

    async saveTransaction ({ dispatch, rootState }, transaction) {
      // Add the logged in userId to the transaction payload...
      transaction.userId = rootState.user.userId

      try {
        await Vue.axios.post('/transaction', transaction)

        await dispatch('getTransactionsByMonth')
        dispatch('getPreviousMonthsBalances')
      } catch (error) {
        console.log('Error saving transaction: ', error)
      }
    }
  },

  mutations: {
    transactionsByMonth (state, data) {
      // Start by clearing the array...
      state.transactions = []

      if (data && data.length > 0) {
        data.forEach(tx => {
          state.transactions.push(mapTransaction(tx, state))
        })
      }
      console.log('Transactions by month mutated: ', state.transactions)
    },

    balanceCharges (state, data) {
      state.balanceCharges = data
    },

    balanceDeposits (state, data) {
      state.balanceDeposits = data
    },

    gotoMonth (state, increment) {
      let newMonth = state.currentMonth += increment

      // Sanity checks now...
      if (newMonth > 12) {
        newMonth = 1
        state.currentYear += 1
      } else if (newMonth < 1) {
        newMonth = 12
        state.currentYear -= 1
      }

      state.currentMonth = newMonth
    },

    gotoCurrentMonth (state) {
      const dt = new Date(Date.now())

      state.currentMonth = dt.getUTCMonth() + 1
      state.currentYear = dt.getUTCFullYear()
    }
  }
}
