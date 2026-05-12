import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import EmbeddedPostgres from 'embedded-postgres'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const databaseDir = path.join(projectRoot, 'data', 'db')
const DB_NAME = 'payload_cms_marketing_prototype'

const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  persistent: true,
})

let nextProc
let stopping = false

async function stopAll(code = 0) {
  if (stopping) return
  stopping = true
  if (nextProc && nextProc.exitCode === null) {
    nextProc.kill('SIGTERM')
  }
  try {
    await pg.stop()
  } catch (err) {
    console.error('[dev] error stopping postgres:', err)
  }
  process.exit(code)
}

process.on('SIGINT', () => stopAll(0))
process.on('SIGTERM', () => stopAll(0))

if (!existsSync(path.join(databaseDir, 'PG_VERSION'))) {
  console.log('[dev] initialising embedded postgres cluster at', databaseDir)
  await pg.initialise()
}

console.log('[dev] starting embedded postgres on port 5432')
await pg.start()

try {
  await pg.createDatabase(DB_NAME)
  console.log(`[dev] created database "${DB_NAME}"`)
} catch (err) {
  if (!/already exists/i.test(String(err?.message ?? err))) throw err
}

console.log('[dev] starting next dev')
nextProc = spawn('next', ['dev'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: process.env,
})

nextProc.on('exit', (code) => stopAll(code ?? 0))
