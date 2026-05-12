require('dotenv').config()
const express = require('express')
const app = express()
const Phone = require('./models/Phone')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Phone.find({})
    .then((phones) => {
      response.json(phones)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Phone.find({})
    .then((phones) => {
      response.send(`<p>Phonebook has info for ${phones.length} people</p>
    <p>${date}</p>`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((phone) => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })

  phone
    .save()
    .then((savedPhone) => {
      response.json(savedPhone)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Phone.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPhone) => {
      response.json(updatedPhone)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})