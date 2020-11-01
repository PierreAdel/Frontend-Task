const express = require('express')
const { json } = require('express')
const _ = require('lodash')
var cors = require('cors')
 
 

const app = express()
app.use(cors())
app.use(json())

const employees = [
  {
    name: 'Michael Scott',
    age: 45,
    title: 'Regional Manager',
    id: 1
  },
  {
    name: 'Dwight Schrute',
    age: 31,
    title: 'Assistant To The Regional Manager / Salesman',
    id: 2
  },
  {
    name: 'Pam Beasley',
    age: 26,
    title: 'Receptionist',
    id: 3
  },
  {
    name: 'Jim Halpert',
    age: 28,
    title: 'Salesman',
    id: 4
  },
  {
    name: 'Toby Flenderson',
    age: 38,
    title: 'Head of Human Resources',
    id: 5
  },
  {
    name: 'Stanley Hudson',
    age: 56,
    title: 'Salesman',
    id: 6
  },
  {
    name: 'Phyllis Lapin',
    age: 45,
    title: 'Salesperson',
    id: 7
  },
  {
    name: 'Angela Martin',
    age: 30,
    title: 'Accountant',
    id: 8
  },
  {
    name: 'Oscar Gutierrez',
    age: 32,
    title: 'Accountant',
    id: 9
  },
  {
    name: 'Kevin Malone',
    age: 29,
    title: 'Accountant',
    id: 10
  },
  {
    name: 'Creed Bratton',
    age: 72,
    title: 'Quality Control',
    id: 11
  },
  {
    name: 'Meredith Palmer',
    age: 48,
    title: 'Supplier Relations'
    ,
    id: 12
  },
  {
    name: 'Kelly Kapoor',
    age: 26,
    title: 'Customer Relations',
    id: 13
  },
  {
    name: 'Ryan Howard',
    age: 23,
    title: 'Temp',
    id: 14
  }
]

app.get('/employees', (req, res) => {
  const page = req.query.page || 1
  res.send(employees.slice(10 * (page - 1), 10 * page))
})

app.get('/employee/:id', (req, res) => {
  if (req.params.id > employees.length) return res.status(400).send('Employee not found!')
  res.send(employees[req.params.id - 1])
})

app.post('/employees', (req, res) => {
  const {name, age, title} = req.body
  if (!name || !age || !title) return res.status(400).send('Name, age and title are required!')
  employees.push({
    name,
    age,
    title,
    id: employees.length + 1
  })
  res.send(employees[employees.length - 1])
})

app.patch('/employee/:id', (req, res) => {
  const id = req.params.id
  if (id > employees.length) return res.status(400).send('Employee not found!')
  _.assign(employees[id - 1], _.pick(req.body, ['name', 'title', 'age']))
  res.send(employees[id - 1])
})

app.listen(5000, () => {
  console.log('App listening on localhost:5000')
})
