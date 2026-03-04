const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kaplanerkerim_db_user:${password}@cluster0.m21pg0k.mongodb.net/?appName=Cluster0`

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        const phone = new Phone({
            name: process.argv[3],
            number: process.argv[4],
        })

        return phone.save()
    })
    .then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

Phone
    .find({})
    .then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })