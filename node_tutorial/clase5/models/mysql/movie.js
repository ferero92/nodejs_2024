import mysql from 'mysql2/promise'

const config = {
    host: '192.168.1.200',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll ({ genre }) {
        let statement = 'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(m.id) id FROM movie m'
        let result = []

        if (genre) {
            statement = statement.concat(' join movie_genres mg on m.id = mg.movie_id join genre g on mg.genre_id = g.id where lower(g.name) = ?')
            const [movies] = await connection.query(statement, [genre.toLowerCase()])
            result = movies
        } else {
            const [movies] = await connection.query(statement)
            result = movies
        }
        return result
    }

    static async getById ({ id }) {
        const statement = 'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(m.id) id FROM movie m WHERE id = UUID_TO_BIN(?)'

        const [movies] = await connection.query(statement, [id])

        return movies
    }

    static async create ({ input }) {
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input
        const [resultUUID] = await connection.query('SELECT UUID() uuid')
        const [{ uuid }] = resultUUID

        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                    VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?)`,
                [title, year, director, duration, poster, rate]
            )
        } catch (e) {
            throw new Error('Error creating movie')
        }
        const [newMovie] = await connection.query(
            `SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate
                FROM movie WHERE id = UUID_TO_BIN("${uuid}")`
        )
        return newMovie[0]
    }

    static async delete ({ id }) {
        const [deleteMovie] = await connection.query(
            'SELECT id FROM movie WHERE id = UUID_TO_BIN(?)', [id]
        )
        
        if (deleteMovie.length === 0) return false

        try {
            await connection.query(
                'DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]
            )
        } catch (e) {
            throw new Error('Error deleting movie')
        }
        return true
    }

    static async update ({ id, input }) {
        const [movie] = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
                FROM movie WHERE id = UUID_TO_BIN(?)`,[id]
        )
        const updatedMovie = {
            ...movie[0],
            ...input
        }
        try {
            const {
                id,
                title,
                year,
                director,
                duration,
                poster,
                rate
            } = updatedMovie

            await connection.query(
                `UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
                    WHERE id = UUID_TO_BIN(?)`,
                [title, year, director, duration, poster, rate, id]    
            )
        } catch (e) {
            throw new Error ('Error updating movie')
        }

        return updatedMovie
    }
}
