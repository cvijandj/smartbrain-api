const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a4656ce1b07b495c807b1b6ffd8cf1c3'
  })
const handleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
     req.body.input)
     .then(data => {
        res.json(data);
     })
     .catch(err => res.status(400).json('unable to work with that link'))
  }

const handleImage = (req, res, db, bcrypt, knex) => {
    const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
    res.json(entries[0].entries);
   })
   .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}