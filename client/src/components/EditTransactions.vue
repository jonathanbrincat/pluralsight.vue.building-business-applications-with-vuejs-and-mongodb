<template lang="pug">
  div
    v-btn(bottom color="orange" dark fab fixed right @click.stop="showEditTransactionDialog")
      v-icon mdi-plus

    v-dialog(v-model="dialog" width="800px")
      v-card
        v-card-title.grey.lighten-4.py-4.title New Transaction

        v-container
          v-row.mx-2
            v-col(cols="12")
              v-menu(ref="datePicker" :close-on-content-click="false" v-model="transactionDatePicker" transition="scale-transition" offset-y :nudge-right="40" max-width="290px" min-width="290px")
                template(v-slot:activator="{ on, attrs }")
                  v-text-field(v-slot="activator" label="Select Transaction Date" v-model="transaction.transactionDate" v-bind="attrs" v-on="on" prepend-icon="mdi-calendar" readonly)

                v-date-picker(v-model="transaction.transactionDate" @input="$refs.datePicker.save(transaction.transactionDate)")

            v-col(cols="12")
              v-select(prepend-icon="mdi-credit-card" :items="transactionTypes" v-model="transaction.transactionType" label="Transaction Type" single-line bottom)

            v-col(cols="12")
              v-text-field(prepend-icon="mdi-file-document" placeholder="Description" v-model="transaction.description")

            v-col(cols="6")
              v-text-field(prepend-icon="mdi-minus-circle" placeholder="Charge (-)" v-model="transaction.charge")

            v-col(cols="6")
              v-text-field(prepend-icon="mdi-plus-circle" placeholder="Deposit (+)" v-model="transaction.deposit")

            v-col(cols="12")
              v-text-field(prepend-icon="mdi-message" placeholder="Notes" v-model="transaction.notes")

        v-card-actions
          v-spacer
          v-btn.mr-2(text @click="dialog = false") Cancel
          v-btn.mr-2(color="orange" dark @click="addTransactionHandler") Save
</template>

<script>
export default {
  name: 'EditTransactions',

  data: () => ({
    dialog: false,
    transaction: {
      id: null,
      transactionDate: null,
      transactionType: null,
      description: '',
      notes: '',
      charge: 0.0,
      deposit: 0.0
    },
    transactionTypes: [
      { text: 'Credit Card', value: 'Credit Card' },
      { text: 'Debit Card', value: 'Debit Card' },
      { text: 'Check', value: 'Check' },
      { text: 'Deposit', value: 'Deposit' }
    ],
    transactionDatePicker: false
  }),

  methods: {
    addTransactionHandler () {
      console.log('...saving a new transaction record')
      this.$store.dispatch('transactions/saveTransaction', this.transaction)

      this.dialog = false
    },

    showEditTransactionDialog () {
      this.transaction.transactionDate = this.getCurrentDate()

      this.dialog = true
    },

    getCurrentDate () {
      const dt = new Date(Date.now())
      let month = '' + (dt.getMonth() + 1)
      let day = '' + dt.getDate()
      const year = dt.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }
  }
}
</script>
