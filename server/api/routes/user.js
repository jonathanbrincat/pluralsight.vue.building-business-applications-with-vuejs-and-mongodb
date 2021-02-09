const User = require('../../models/user')

module.exports = (router) => {
  // READ user by id
  router.get('/user/:id', (request, response) => {
    User.findById(request.params.id)
      .exec()
      .then(
        (docs) => response.status(200).json(docs)
      )
      .catch(
        (error) => response.status(500).json({
          message: 'Error finding user',
          error
        })
      )
  })

  // READ user by email
  router.get('/user/email/:email', (request, response) => {
    User.find({ email: request.params.email })
      .exec()
      .then(
        (docs) => response.status(200).json(docs)
      )
      .catch(
        (error) => response.status(500).json({
          message: 'Error finding user',
          error
        })
      )
  })

  // CREATE new user
  router.post('/user', (request, response) => {
    const user = new User(request.body)

    user.save((error, user) => {
      if (error) return console.log(error)
      response.status(200).json(user)
    })
  })

  // UPDATE user by id
  router.put('/user/:id', (request, response) => {
    const query = { _id: request.params.id }
    const doc = {
      first: request.body.firstName,
      last: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      isActive: request.body.isActive
    }

    // User.update(query, doc, (error, responseRaw) => { // DEVNOTE: .update is deprecated
    User.updateOne(query, doc, (error, responseRaw) => {
      if (error) return console.log(error)
      response.status(200).json(responseRaw)
    })
  })
}
