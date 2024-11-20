import { createServer } from 'node:http'
import { findAvailablePort } from './free-port.mjs'

const desiredPort = process.env.PORT ?? 9443

const server = createServer((req, res) => {
    console.log('request received')
    res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(`server listening on port http://192.168.1.200:${server.address().port}`)
    })
})
