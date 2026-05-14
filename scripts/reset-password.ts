import crypto from 'node:crypto'
import { Pool } from 'pg'

const EMAIL = process.argv[2] ?? 'nkessler@rbi.com'
const PASSWORD = process.argv[3] ?? 'rbi-tech'
const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/payload_cms_marketing_prototype'

const salt = crypto.randomBytes(32).toString('hex')
const hash = crypto.pbkdf2Sync(PASSWORD, salt, 25000, 512, 'sha256').toString('hex')

const pool = new Pool({ connectionString: DATABASE_URL })

const { rowCount } = await pool.query(
  `UPDATE users
     SET salt = $1, hash = $2,
         reset_password_token = NULL, reset_password_expiration = NULL,
         login_attempts = 0, lock_until = NULL,
         updated_at = NOW()
   WHERE email = $3`,
  [salt, hash, EMAIL],
)

if (!rowCount) {
  await pool.query(
    `INSERT INTO users (name, email, salt, hash, login_attempts, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 0, NOW(), NOW())`,
    [process.argv[4] ?? EMAIL.split('@')[0], EMAIL, salt, hash],
  )
  await pool.end()
  console.log(`Created user ${EMAIL}.`)
} else {
  await pool.end()
  console.log(`Password for ${EMAIL} reset.`)
}
