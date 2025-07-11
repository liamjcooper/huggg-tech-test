import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'
import config from './config/config'

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.db.url!,
  },
})
