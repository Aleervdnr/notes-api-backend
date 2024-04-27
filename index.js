// Importamos el modulo de Express
const express = require('express')

const cors = require('cors')

// Creamos la aplicacion
const app = express()

// body-parser hace que podamos pasar objetos a las request y convertirlo en json
app.use(express.json())
app.use(cors())

let tasks = [
  {
    id: 1,
    tarea: 'Estudiar Ingles',
    finalizada: false
  },
  {
    id: 2,
    tarea: 'Estudiar React',
    finalizada: true
  },
  {
    id: 3,
    tarea: 'Limpiar cocina',
    finalizada: false
  }]

// Cuando se haga una peticion del tipo GET en el path indicado se devuelva el callback, a diferencia a node.js puro, no tenemos que decir que vuelva un codigo 200, ni el content-type, ni convertir en un json el objeto que mandamos porque ya lo hace automaticamente por nosotros
app.get('/', (request, response) => {
  response.send('<h1>Hola mundo, Estoy usando Express</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(tasks)
})

// De manera dinamica manejamos el path, para que mediante el id filtre la nota que deseamos mostrar
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = tasks.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).json({}).end()
  }
})

// Aca con delete estamos borrando un elemento mediante el id, obtenemos el id a borrar mediante los params de la request, luego mediante un filter guardamos los elementos con un id distinto al obtenido mediante la request, despues devolvemos un status 204 que seria "no content"
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  tasks = tasks.filter(note => note.id !== id)
  response.status(204).end()
})

// Con POST agregamos un nuevo elemento a nuestra API
app.post('/api/notes', (req, res) => {
  const note = req.body

  const ids = tasks.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    userId: 1,
    id: maxId + 1,
    title: note.title,
    body: note.body
  }

  tasks = [...tasks, newNote]

  res.status(201).json(tasks)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} `)
})
