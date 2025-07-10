# huggg-tech-test

Built with Bun + Hono 🔥

Default port is 3000 but if you'd like to you can inject the env at command time with `PORT=3000 ...`.

Some stand out features:

- TypeScript
- Dependency injection
- Open API schema generation
- Integration + unit tests
- Controller & service pattern w/ middleware
- Schema consolidation w/ TypeBox
- One-time read of static brand data before server has booted w/ timing log
- Basic observability, native console logging/info/erroring
- Error handling of file I/O, missing resources (404) and uncaught exceptions (500)
- Pagination
- API validation
- Containerisation

Endpoints:

```
// Get products for a brand
GET /brands/:id/products

// Get stores for a product
GET /products/:id/stores
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

To run tests, run the start command or make sure the server is already running, then in another process:

```bash
bun run test
```

You can also generate the open API specs with:

```bash
bun run generate:oas
```

Possible improvements:

- [ ] Import data into an SQLite instance to allow for scalability
- [ ] Seed fixture data into the database for more controllable and separated integration testing
