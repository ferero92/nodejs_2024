import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files
    try {
        files = await readdir(folder)
    } catch {
        console.error(`No se pudo leer el directio ${folder}`)
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = join(folder, file)
        const stats = await stat(filePath)

        const fileType = stats.isDirectory() ? 'd' : 'f'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
    })

    const filesInfo = await Promise.all(filesPromises)
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)