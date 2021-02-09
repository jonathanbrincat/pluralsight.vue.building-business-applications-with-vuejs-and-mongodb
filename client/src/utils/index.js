export const monthDictionary = [
  { name: 'Zero', abrev: 'ZZZ', index: 0 },
  { name: 'January', abrev: 'Jan', index: 1 },
  { name: 'February', abrev: 'Feb', index: 2 },
  { name: 'March', abrev: 'Mar', index: 3 },
  { name: 'April', abrev: 'Apr', index: 4 },
  { name: 'May', abrev: 'May', index: 5 },
  { name: 'June', abrev: 'Jun', index: 6 },
  { name: 'July', abrev: 'Jul', index: 7 },
  { name: 'August', abrev: 'Aug', index: 8 },
  { name: 'September', abrev: 'Sep', index: 9 },
  { name: 'October', abrev: 'October', index: 10 },
  { name: 'November', abrev: 'Nov', index: 11 },
  { name: 'December', abrev: 'Dec', index: 12 }
]

const LOCALE = {
  region: 'en-GB',
  currency: 'GBP'
}

function calcRunningBalance (tx, state) {
  // any new charges?
  if (tx && tx.charge > 0) {
    state.balanceCharges += tx.charge
  } else if (tx && tx.deposit > 0) {
    state.balanceDeposits += tx.deposit
  }

  return state.balanceCharges - state.balanceDeposits
}

export function mapTransaction (tx, state) {
  const transDate = new Date(tx.transactionDate)

  return {
    _id: tx._id,
    transactionDate: monthDictionary[transDate.getUTCMonth() + 1].abrev + '-' + transDate.getUTCDate(),
    transactionType: tx.transactionType,
    description: tx.description,
    charge: moneyFormatter(tx.charge),
    deposit: moneyFormatter(tx.deposit),
    balance: moneyFormatter(calcRunningBalance(tx, state))
  }
}

export function moneyFormatter (amount) {
  const formatter = new Intl.NumberFormat(LOCALE.region, {
    style: 'currency',
    currency: LOCALE.currency,
    minimumFractionDigits: 2 // DEVNOTE: the default value for minimumFractionDigits depends on the currency and is usually already 2
  })

  return formatter.format(amount)
}
