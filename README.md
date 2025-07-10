# huggg-tech-test

Built with Bun + Hono 🔥

Loads the JSON data into memory on server boot, exposes a couple of endpoints, following a service pattern + some integration/unit testing. Default port is 3000 but if you'd like to you can inject an env at command time `PORT=3000 ...`.

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
bun test
```

Possible improvements:

- [ ] Pagination for the brands data to improve efficiency, could be done with local data
- [ ] Import data into an SQLite instance to allow for more data and keep speed up
- [ ] For API tests, seeding the data into a database for more controllable integration testing
- [ ] Extracting route logic into controller classes for dependency injection, making the logic easily testable by swapping implementations of external concerns
- [ ] Building on above improvements, could generate Open API schemas from the endpoints automatically, Hono has a tight integration to help with this
