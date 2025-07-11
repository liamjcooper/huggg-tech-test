export default {
  port: process.env.PORT ?? 3000,
  db: {
    url: process.env.DATABASE_URL
  },
}
