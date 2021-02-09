<template lang="pug">
  v-card(style="width: 100%;")
    v-card-title
      span.pr-3 Transactions for {{ monthDictionary[currentMonth].name }} - {{ currentYear }}

      v-btn.pr-2(text icon @click="gotoMonth(-1)")
        v-icon mdi-chevron-left

      v-btn.pr-2(text icon @click="gotoCurrentMonth")
        v-icon mdi-calendar

      v-btn(text icon @click="gotoMonth(1)")
        v-icon mdi-chevron-right

      v-spacer

      v-text-field(append-icon="mdi-magnify" label="Search" single-line hide-details v-model="search")

    v-data-table(:headers="headers" :items="items" :search="search" item-key="deposit" :expanded="expanded" :single-expand="true")
      template(v-slot:item="{ item, expanded, isExpanded, expand }")
        tr
          td
            v-edit-dialog(lazy) {{ item.transactionDate }}
              v-text-field(slot="input" label="Edit" v-model="item.transactionDate" single-line)
          td.text-xs-left {{ item.transactionType }}
          td.text-xs-left(@click="expand(!isExpanded)") {{ item.description }}
          td.text-xs-right {{ item.charge }}
          td.text-xs-right {{ item.deposit }}
          td.text-xs-right {{ item.balance }}

      template(v-slot:expanded-item="{ headers, item }")
        tr
          td(:colspan="headers.length" style="padding: 0;")
            v-card.pl-5(text)
              v-card-text.text-xs-left
                v-text-field(label="Note" v-model="item.notes")

      template(v-slot:footer.page-text="{ pageStart, pageStop}") From {{ pageStart }} to {{ pageStop }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { monthDictionary } from '@/utils'

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('transactions')

export default {
  name: 'Transactions',

  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      search: '',
      pagination: {},
      headers: [
        { text: 'Date', align: 'center', sortable: false, value: 'transactionDate' },
        { text: 'Type', align: 'center', sortable: false, value: 'transactionType' },
        { text: 'Description', align: 'center', sortable: false, value: 'description' },
        { text: 'Charge (-)', align: 'center', sortable: false, value: 'charge' },
        { text: 'Deposit (+)', align: 'center', sortable: false, value: 'deposit' },
        { text: 'Balance', align: 'center', sortable: false, value: 'balance' }
      ],
      expanded: []
    }
  },

  methods: {
    ...mapActions([
      'getTransactionsByMonth' // map `this.getTransactionsByMonth()` to `this.$store.dispatch('transactions/getTransactionsByMonth')`
    ]),

    getPreviousMonthsBalances () {
      this.$store.dispatch('transactions/getPreviousMonthsBalances')
    },

    async gotoMonth (increment) {
      await this.$store.dispatch('transactions/gotoMonth', increment)

      // Load selected month transaction data now...
      this.getPreviousMonthsBalances()
      this.getTransactionsByMonth()
    },

    async gotoCurrentMonth () {
      await this.$store.dispatch('transactions/gotoCurrentMonth')

      // Load selected month transaction data now...
      this.getPreviousMonthsBalances()
      this.getTransactionsByMonth()
    }
  },

  computed: {
    ...mapState(['currentMonth']),
    ...mapGetters({ items: 'transactionsByMonth', balanceCharges: 'balanceCharges' }),

    currentYear () { return this.$store.state.transactions.currentYear },
    // months () { return this.$store.state.transactions.months }, // DEVNOTE: redundant left for reference - static data, doesn't need to be reactive. shouldn't be in state
    balanceDeposits () { return this.$store.getters.transactions.balanceDeposits }
  },

  created () {
    this.monthDictionary = monthDictionary
  },

  mounted () {
    this.getPreviousMonthsBalances()
    this.getTransactionsByMonth()
  }
}
</script>

<style lang="scss" scoped>
  .transactions {
    width: 100%;
  }
</style>
