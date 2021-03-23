function parseFileName({
  debug,
  max_extension_length = 10,
  min_extension_length = 1,
  min_filename_length = 3,
  data
}) {
  if (debug) console.log("[parse-filename] starting with ", { debug, max_extension_length, min_extension_length, min_filename_length, data });

  if (!data) {
    throw new Error("[parse-filename] data is null or undefined");
  }

  if (typeof data !== "string") {
    throw new Error("[parse-filename] currently only supports data in string format not " + typeof data);
  }

  let path;
  if (data.startsWith("http")) {
    path = new URL(data).pathname;
  } else if (data.match(/^[a-z0-9]+:\/\//)) {
    // path like s3://bucket/file.txt
    path = data.substr(data.indexOf('://') + 3);
  } else if (data.match(/^[A-Za-z]+@[A-Za-z\.]+:/)) {
    // ssh string like git@github.com:DanielJDufour/parse-filename.git
    path = data.split(":").pop();
  } else if (data.startsWith('./') || data.startsWith('.\\')) {
    path = data.substr(1);
  } else if (data.startsWith('/') || data.startsWith('\\')) {
    path = data;
  } else {
    throw new Error('[parse-filename] unsupported data path format');
  }
  if (debug) console.log("[parse-filename] path:", path);

  const sep = path.includes("\\") ? "\\" : "/";
  if (debug) console.log("[parse-filename] sep:", sep);

  const filename = path.split(sep).pop();
  if (debug) console.log("[parse-filename]:", filename);

  const i = filename.indexOf(".");
  if (debug) console.log("[parse-filename] i:", i);

  if (i < min_filename_length) {
    if (debug) console.log("[parse-filename] filename is too short");
    return { filename: null, extension: null };
  }
  if (filename.length - i < min_extension_length) {
    if (debug) console.log("[parse-filename] extension too short");
    return { filename: null, extension: null };
  }
  if (filename.length - i > max_extension_length) {
    return { filename: null, extension: null };
  }
  const extension = filename.substring(i + 1);
  if (debug) console.log("[parse-filename] extension:", extension);

  return {
    filename,
    extension,
  };
}

if (typeof module === "object") module.exports = parseFileName;
if (typeof window === "object") window.parseFileName = parseFileName;
if (typeof self === "object") self.parseFileName = parseFileName;