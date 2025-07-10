import fs from 'node:fs'
import { generateSpecs } from 'hono-openapi'
import { app } from '../src/index'
import config from '../config/config'

const docsDir = 'docs'
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true })
}

generateSpecs(app, {
  documentation: {
    info: {
      title: 'Huggg API',
      version: '1.0.0',
      description: 'Huggg API',
    },
    servers: [
      { url: `http://localhost:${config.port}`, description: 'Local Server' },
    ],
  },
})
  .then(spec => {
    const pathToSpec = 'docs/openapi.json'
    fs.writeFileSync(pathToSpec, JSON.stringify(spec, null, 2))
    console.log(`OpenAPI spec generated successfully at ${pathToSpec}`)
  })
  .catch(error => {
    console.error('Error generating OpenAPI spec:', error)
    process.exit(1)
  })
