import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

// middleware que captura el body y lo transforma en JSON
app.use(express.json())
app.use(corsMiddleware())
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
    console.log(`server listening on port http://192.168.1.200:${PORT}`)
})
