import { createServer } from 'node:net'

function findAvailablePort(aPort) {
    return new Promise((resolve, reject) => {
        const server = createServer()
        server.listen(aPort, () => {
            server.close(() => {
                resolve(aPort)
            })
        })
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))
            } else {
                reject(err)
            }
        })
    })
}

export { findAvailablePort }