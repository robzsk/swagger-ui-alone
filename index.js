const path = require('path');
const fs = require('fs');
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();
const dot = require('dot');

const load = f => fs.readFileSync(f).toString();

const source = load(path.join(__dirname, './template.dot'));

const swaggerload = f => load(path.join(swaggerUiAssetPath, f));
const throwError = () => { throw new Error('spec was not defined!'); }
const maybeStringify = spec => typeof spec === 'object' ? JSON.stringify(spec) : spec;
const maybeError = spec => spec || throwError();

dot.templateSettings = require('./settings');

module.exports = spec => {
  const data = {
    swaggerUIBundle: swaggerload('./swagger-ui-bundle.js'),
    swaggerUIStandalonePreset: swaggerload('./swagger-ui-standalone-preset.js'),
    swaggerUIStyle: swaggerload('./swagger-ui.css'),
  };
  return dot.template(source)(Object.assign({}, data, { spec: maybeStringify(maybeError(spec)) }));
};
