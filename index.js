require('dotenv').config()
const express = require('express')
const app = express()
const Phone = require('./models/Phone')

app.use(express.json())

const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const cors = require('cors')
app.use(cors())

/*let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/




app.get('/api/persons', (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  /*const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    */

  Phone.findById(request.params.id).then((phone) => {
    response.json(phone)
  }).catch((err) => {
    console.log(err)
    response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request, response) => {
  /*const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  */
  
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})



/*const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}*/

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  /*if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
  */

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })
  phone.save().then(savedPhone => {
    response.json(savedPhone)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})