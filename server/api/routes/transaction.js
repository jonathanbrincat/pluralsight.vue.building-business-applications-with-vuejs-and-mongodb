const Transaction = require('../../models/transaction')
const mongoose = require('mongoose')

module.exports = (router) => {
  // READ transactions for given year and month by userId
  router.get('/transaction/:year/:month', (request, response) => {
    const userId = request.get('userId')
    const month = request.params.month - 1
    const year = request.params.year
    const startDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))
    const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

    const query = {
      userId,
      transactionDate: {
        $gte: startDt,
        $lt: endDt
      }
    }

    Transaction.find(query)
      .sort({
        transactionDate: 1
      })
      .exec()
      .then(
        (docs) => response.status(200).json(docs)
      )
      .catch(
        (error) => response.status(500).json({
          message: 'Error finding transactions for user',
          error
        })
      )
  })

  // READ transactions running balance for a specific user
  router.get('/transaction/balance/:year/:month', (request, response) => {
    const userId = request.get('userId')
    const month = request.params.month - 1
    const year = request.params.year
    const endDt = new Date(Date.UTC(year, month, 1))

    const pipeline = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $match: {
          transactionDate: { $lt: endDt }
        }
      },
      {
        $group: {
          _id: null,
          charges: { $sum: '$charge' },
          deposits: { $sum: '$deposit' }
        }
      }
    ]

    Transaction.aggregate(pipeline)
      .exec()
      .then(
        (docs) => response.status(200).json(docs)
      )
      .catch(
        (error) => response.status(500).json({
          message: 'Error finding transactions for user',
          error
        })
      )
  })

  // CREATE new transaction document
  router.post('/transaction', (request, response) => {
    const transaction = new Transaction(request.body)

    transaction.save((error, transaction) => {
      if (error) return console.log(error);
      response.status(200).json(transaction)
    })
  })
}
