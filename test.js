const { deepStrictEqual, strictEqual } = require('assert');

const parseFileName = require('./parse-filename');

const { filename: fn1, extension: ext1 } = parseFileName({ data: "s3://bucket/file.txt" });
strictEqual(fn1, "file.txt");
strictEqual(ext1, 'txt');

// parsing Github URLs
const { filename: fn2, extension: ext2 } = parseFileName({
  data: "https://github.com/DanielJDufour/parse-filename/blob/main/README.md",
  debug: false
});
strictEqual(fn2, "README.md");
strictEqual(ext2, 'md');

const { filename: fn3, extension: ext3 } = parseFileName({
  data: "https://raw.githubusercontent.com/DanielJDufour/parse-filename/main/README.md?token=ABA5C5ZMNLGL6JIPOMRNSYLAMMUWA",
  debug: false
});
strictEqual(fn3, "README.md");
strictEqual(ext3, 'md');

// ssh urls
const { filename: fn4, extension: ext4 } = parseFileName({
  data: "ubuntu@example.org:/tmp/test.txt",
  debug: false
});
strictEqual(fn4, "test.txt");
strictEqual(ext4, 'txt');

// filepaths
const { filename: fn5, extension: ext5 } = parseFileName({
  data: "/tmp/test.txt",
  debug: false
});
strictEqual(fn5, "test.txt");
strictEqual(ext5, 'txt');

const { filename: fn6, extension: ext6 } = parseFileName({
  data: "\\tmp\\test.txt",
  debug: false
});
strictEqual(fn6, "test.txt");
strictEqual(ext6, 'txt');

const { filename: fn7, extension: ext7 } = parseFileName({
  data: "/tmp/f.txt",
  debug: false
});
strictEqual(fn7, null);
strictEqual(ext7, null);