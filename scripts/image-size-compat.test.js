const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { Readable } = require("node:stream");

const { imageSize } = require("image-size");
const {
  imageSizeFromFile,
  imageSizeFromStream,
} = require("image-size/fromFile");

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

test("reads dimensions from a buffer", () => {
  assert.deepEqual(imageSize(onePixelPng), {
    width: 1,
    height: 1,
    type: "png",
  });
});

test("provides the asynchronous fromFile API used by Docusaurus", async (t) => {
  const temporaryDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "don-image-size-"),
  );
  t.after(() => fs.rm(temporaryDirectory, { recursive: true, force: true }));

  const imagePath = path.join(temporaryDirectory, "pixel.png");
  await fs.writeFile(imagePath, onePixelPng);

  assert.deepEqual(await imageSizeFromFile(imagePath), {
    width: 1,
    height: 1,
    type: "png",
  });
});

test("rejects malformed image data instead of looping", () => {
  const malformedIcns = Buffer.from([
    0x69, 0x63, 0x6e, 0x73, 0x00, 0x00, 0x00, 0x10,
    0x69, 0x63, 0x30, 0x37, 0x00, 0x00, 0x00, 0x00,
  ]);

  assert.throws(() => imageSize(malformedIcns), /Unsupported or invalid image/);
});

test("stops streaming a large image after its dimensions are known", async () => {
  const trailingChunk = Buffer.alloc(1024 * 1024);
  let bytesProduced = 0;
  let chunksRemaining = 10;

  const imageStream = new Readable({
    read() {
      setImmediate(() => {
        if (this.destroyed) return;

        const chunk = chunksRemaining-- === 10 ? onePixelPng : trailingChunk;
        bytesProduced += chunk.length;
        this.push(chunk);
        if (chunksRemaining < 0) this.push(null);
      });
    },
  });

  assert.deepEqual(await imageSizeFromStream(imageStream), {
    width: 1,
    height: 1,
    type: "png",
  });
  assert.ok(bytesProduced < trailingChunk.length);
});
