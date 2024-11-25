import { randomUUID } from 'node:crypto'
import movies from '../../movies.json' with { type: 'json' }

// Especificación experimental que se eliminará en un futuro para leer archivos json
// import movies from '../movies.json' assert { type: 'json' }

// Futura expecifiacación definitiva para importar archivos json
// import movies from './movies.json' with { type: 'json'}

// como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer un json en ESModule recomendado ahora e importar el require de CommonJS
// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById ({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create ({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie)

        return newMovie
    }

    static async delete ({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) {
            return false
        }
        movies.splice(movieIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if (movieIndex === -1) {
            return false
        }

        const updatedMovie = {
            ...movies[movieIndex],
            ...input
        }

        movies[movieIndex] = updatedMovie

        return updatedMovie
    }
}
