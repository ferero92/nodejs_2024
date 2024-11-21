import { createServer } from 'node:http'
import ditto from './pokemon/ditto.json' assert { type: 'json' }

const server = createServer((req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end(JSON.stringify(ditto))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('404 Page not found')    
            }
        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = ''

                    req.on('data', chunk => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)
                        // TODO: llamada a base de datos
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8'})
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break;
                }
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('404 Page not found')
            }
    }
})

server.listen(1234, () => {
    console.log('server listening on port http://192.168.1.200:1234')
})