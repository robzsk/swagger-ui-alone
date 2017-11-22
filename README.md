# Alone

> Serve Swagger interactive UI on the fly and all alone!

## Usage

```javascript
const alone = require('swagger-ui-alone');

// example spec, insert your own here
const spec = {
  swagger: '2.0',
  info: { version: '0.0.1', title: 'Spec Title' },
  paths: { '/foo': { get: { responses: { '200': { description: 'OK' } } } } },
};

// turn your spec into a swagger-ui page
const docs = alone(spec);

// now I can write the docs to a file
require('fs').writeFileSync('index.html', docs);

// or I http serve the docs up
require('http').createServer((request, response) => { response.end(docs); }).listen(8080);
```
