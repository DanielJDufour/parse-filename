# parse-filename
> Parse a File Name from a Given URL or Data Path

# features
- zero dependencies
- cross-platform
- ignores URL parameters

# supported input
- http and https urls, like `https://example.org/folder/file.txt`
- ssh urls, like `ubuntu@example.org:/tmp/test.txt`
- git urls, like `git@github.com:DanielJDufour/parse-filename/README.md`
- unix filepaths, like `/tmp/file.txt`
- windows filepaths, like `C:\WINDOWS\explorer.exe`
- s3 urls, like `s3://bucket/file.txt`

# install
```bash
npm install parse-filename
```

# usage
## importing/loading
```javascript
import parseFileName from 'parse-filename'
```
or
```javascript
const parseFileName = require('parse-filename');
```
or
```html
<script src="https://unpkg.com/parse-filename">
```

## parsing
```javascript
const result = parseFileName({
  data: "https://github.com/DanielJDufour/parse-filename/blob/main/README.md",
  debug: false // set to true for increased logging
});
// result is { extension: "md", filename: "README.md" }
```

## advanced usage
You can specify three additional arguments
```javascript
const result = parseFileName({
  data: "https://example.org/testpath/f.zip",
  max_extension_length = 10,
  min_extension_length = 1,
  min_filename_length = 3
});
// returns { extension: null, filename: null } because filename is too short
```
