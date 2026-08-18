function normalizeDimensions(result) {
  if (!result) {
    throw new TypeError("Unsupported or invalid image");
  }

  const dimensions = {
    width: result.width,
    height: result.height,
    type: result.type,
  };

  if (result.orientation !== undefined) {
    dimensions.orientation = result.orientation;
  }

  if (result.variants?.length) {
    dimensions.images = result.variants.map(({ width, height }) => ({
      width,
      height,
    }));
  }

  return dimensions;
}

module.exports = { normalizeDimensions };
