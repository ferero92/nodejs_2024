import { basename, extname, join, sep } from 'node:path'

console.log('sep', sep)

const filePath = join('content', 'subfolder', 'file.txt')
console.log('join', filePath)

const base = basename(filePath)
console.log('base', base)

const fileName = basename(filePath, '.txt')
console.log('fileName', fileName)

const extension = extname(filePath)
console.log('extension', extension)