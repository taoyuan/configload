# @tib/configload

[![Build](https://gitr.net/tibjs/configload/badges/master/pipeline.svg)](https://gitr.net/tibjs/configload)
[![Coverage](https://gitr.net/tibjs/configload/badges/master/coverage.svg)](https://gitr.net/tibjs/configload)

> Load configuration file in various formats: yaml, json5, json, toml and js.

## Supported Formats

- yaml
- json
- json5
- toml (install [@iarna/toml](https://github.com/iarna/iarna-toml) manually in
  your package)

## Installation

```bash
npm i @tib/configload
```

## Usage

```ts
import {load, loadSync, autoLoad, autoLoadSync} from '@tib/configload';

// load sync
console.log(loadSync('foo.yml'));
console.log(loadSync('foo.yaml'));
console.log(loadSync('foo.json'));
console.log(loadSync('foo.json5'));
console.log(loadSync('foo.toml'));

// load async
(async () => {
  console.log(await load('foo.yml'));
})();

// auto load sync
console.log(autoLoadSync('foo'));

// auto load async
(async () => {
  console.log(await autoLoad('foo'));
})();
```

## API

### detect(file: string, lang?: string): {file: string, lang: string, loader: Loader} | undefined

detect config file with lang or default loaders

**Params**

- `file: string` - path of the file or prefix to read.
- `lang?: string` - force using specified lang loader.
- `return: {file: string, lang: string, loader: Loader} | undefined` - detected result

**Example**

```ts
import {detect} from '@tib/configload';

// Suppose we have the following files
//
// ├─┬ config
//   ├── foo.yml
//   ├── foo.json
//   └── foo.toml

console.log(detect('foo'));               // => {file: '<..>/foo.yml', lang: 'yaml', loader: <YamlLoader>}
console.log(detect('foo.json'));          // => {file: '<..>/foo.json', lang: 'json', loader: <JsonLoader>}
console.log(detect('foo', 'toml'));       // => {file: '<..>/foo.toml', lang: 'toml', loader: <TomlLoader>}
console.log(detect('foo', 'js'));         // => undefied  
console.log(detect('foo.json', 'toml'));  // => undefied
```

### load(filepath: string, options: LoadOptions = {}): Promise<any>

load config file async

**Params**

- `filepath: string` - path of the file to read.
- `options: LoadOptions` - [options](#loadoptions) to pass to loader
- `returns: Promise<Object>` - promised JSON

**Example**

```ts
import {load} from '@tib/configload';

(async () => {
  console.log(await load('foo.yml'));
  console.log(await load('foo.json'));
})();
```

### loadSync(filepath: string, options: LoadOptions = {}): any

load config file sync

**Params**

- `filepath: string` - path of the file to read.
- `options: LoadOptions` - [options](#loadoptions) to pass to loader
- `returns: Object` - JSON

**Example**

```ts
import {loadSync} from '@tib/configload';

console.log(loadSync('foo.yml'));
console.log(loadSync('foo.json'));
```

### autoLoad(filepath: string, options: LoadOptions = {}): Promise<any>

Async auto detect config file with the `filepath` and load the config file

**Params**

- `filepath: string` - path of the file to read.
- `options: LoadOptions` - [options](#loadoptions) to pass to loader
- `returns: Promise<Object>` - promised JSON

**Example**

```ts
import {autoLoad} from '@tib/configload';

(async () => {
  console.log(await autoLoad('foo.yml'));
  console.log(await autoLoad('foo.json'));
})();
```

### autoLoadSync(filepath: string, options: LoadOptions = {}): any

Sync auto detect config file with the `filepath` and load the config file

**Params**

- `filepath: string` - path of the file to read.
- `options: LoadOptions` - [options](#loadoptions) to pass to loader
- `returns: Object` - JSON

**Example**

```ts
import {autoLoadSync} from '@tib/configload';

console.log(autoLoadSync('foo.yml'));
console.log(autoLoadSync('foo.json'));
```

## LoadOptions

**YamlLoadOptions**

- `lang?: string` - The language to force using
- `encoding?: BufferEncoding` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `flag?: OpenMode` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `throws?: boolean` - Throw a wrapped error if parse throws
- `filename?: string` - Pass to
  [js-yaml](https://github.com/nodeca/js-yaml#safeload-string---options-)

**JsonLoadOptions**

- `lang?: string` - The language to force using
- `encoding?: BufferEncoding` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `flag?: OpenMode` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `throws?: boolean` - Throw a wrapped error if parse throws
- `reviver?: Function` - A function that transforms the results. Pass to
  [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

**TomlLoadOptions**

- `lang?: string` - The language to force using
- `encoding?: BufferEncoding` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `flag?: OpenMode` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `throws?: boolean` - Throw a wrapped error if parse throws

**JsLoadOptions**

- `lang?: string` - The language to force using
- `encoding?: BufferEncoding` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `flag?: OpenMode` - Pass to
  [fs.readFile](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)
- `throws?: boolean` - Throw a wrapped error if parse throws
