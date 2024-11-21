import { createServer } from 'node:http'

const desiredPort = process.env.PORT ?? 1234

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    if (req.url === '/') {
        res.end('Bienvenido a mi página de inicio')
    } else if (req.url === '/contacto') {
        res.end('Contacto')
    } else {
        res.statusCode = 404
        res.end('404 not found')
    }
})

server.listen(desiredPort, () => {
    console.log(`server listening on port http://192.168.1.200:${desiredPort}`)
})
