const fs = require("node:fs");
const probeStream = require("probe-image-size/stream");
const { normalizeDimensions } = require("./normalize");

let concurrency = 100;
let activeReads = 0;
const waitingReads = [];

function drainQueue() {
  while (activeReads < concurrency && waitingReads.length > 0) {
    activeReads += 1;
    waitingReads.shift()();
  }
}

function releaseRead() {
  activeReads -= 1;
  drainQueue();
}

function acquireRead() {
  if (activeReads < concurrency) {
    activeReads += 1;
    return Promise.resolve();
  }

  return new Promise((resolve) => waitingReads.push(resolve));
}

async function imageSizeFromFile(filePath) {
  await acquireRead();
  try {
    return await imageSizeFromStream(fs.createReadStream(filePath));
  } finally {
    releaseRead();
  }
}

async function imageSizeFromStream(stream) {
  return normalizeDimensions(await probeStream(stream));
}

function setConcurrency(value) {
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError("Concurrency must be a positive integer");
  }

  concurrency = value;
  drainQueue();
}

module.exports = { imageSizeFromFile, imageSizeFromStream, setConcurrency };
