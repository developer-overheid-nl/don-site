const probe = require("probe-image-size/sync");
const { normalizeDimensions } = require("./normalize");

const disabledTypes = new Set();

function imageSize(input) {
  const result = probe(input);
  if (result && disabledTypes.has(result.type)) {
    throw new TypeError("Unsupported or invalid image");
  }
  return normalizeDimensions(result);
}

function disableTypes(types) {
  for (const type of types) {
    disabledTypes.add(type);
  }
}

module.exports = { disableTypes, imageSize };
