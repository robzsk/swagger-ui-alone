const path = require('path');
const fs = require('fs');
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();
const dot = require('dot');

const load = f => fs.readFileSync(f).toString();
const swaggerbase = f => path.join(swaggerUiAssetPath, f);
const source = load(path.join(__dirname, './template.dot'));

dot.templateSettings = {
  evaluate:    /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode:      /\{\{!([\s\S]+?)\}\}/g,
  use:         /\{\{#([\s\S]+?)\}\}/g,
  define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: false,
  append: true,
  selfcontained: false
};

const maybeStringify = spec => typeof spec === 'object' ? JSON.stringify(spec) : spec;
const throwError = () => { throw new Error('spec was not defined!'); }
const maybeError = spec => spec || throwError();

module.exports = spec => {
  const data = {
    swaggerUIBundle: load(swaggerbase('./swagger-ui-bundle.js')),
    swaggerUIStandalonePreset: load(swaggerbase('./swagger-ui-standalone-preset.js')),
    swaggerUIStyle: load(swaggerbase('./swagger-ui.css')),
  };
  return dot.template(source)(Object.assign({}, data, { spec: maybeStringify(maybeError(spec)) }));
};
