import express from 'express';
import ditto from './pokemon/ditto.json' assert {type: 'json'}

const PORT = process.env.PORT ?? 1234
const app = express()
// Deshabilita la cabecera {X-Powered-By: Express}
app.disable('x-powered-by')

app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()

    let body = ''

    req.on('data', chunk => (
        body += chunk.toString()
    ))

    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        req.body = data
        next()
    })
})


app.get('/pokemon/ditto', (req, res) => {
    // res.json({ message: "Hola mundo"})
    res.json(ditto)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404 Page not found</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://192.168.1.200:${PORT}`)
})
