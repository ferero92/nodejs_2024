import { readFile } from 'node:fs/promises'

// Convierte en promesas modulos nativos de node que
// no implemente promesas
// import { promisify } from 'node:util'
// const readFilePromise = promisify(readFile);

console.log('Leyendo el primer archivo...')
readFile('./file.txt', 'utf-8').then(text => {
    console.log(text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
readFile('./file2.txt', 'utf-8').then(text => {
    console.log(text)
})