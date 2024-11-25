import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import { MovieModel } from './models/mysql/movie.js'

export const createApp = ({ movieModel }) => {
    // const PORT = process.env.PORT ?? 1234

    // const app = express()
    // app.disable('x-powered-by')

    // // middleware que captura el body y lo transforma en JSON
    // app.use(express.json())
    // app.use(corsMiddleware())
    // app.use('/movies', createMovieRouter({ movieModel }))

    // app.listen(PORT, () => {
    //     console.log(`server listening on port http://192.168.1.200:${PORT}`)
    // })
}
const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

// middleware que captura el body y lo transforma en JSON
app.use(express.json())
app.use(corsMiddleware())
app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

app.listen(PORT, () => {
    console.log(`server listening on port http://192.168.1.200:${PORT}`)
})
