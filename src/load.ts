import path from 'path';
import * as fs from 'fs';
import {
  findLoader,
  JsLoadOptions,
  JsonLoadOptions,
  TomlLoadOptions,
  YamlLoadOptions,
} from './loaders';
import {detect} from './detect';

export type LoadOptions = {lang?: string} & (
  | JsonLoadOptions
  | YamlLoadOptions
  | TomlLoadOptions
  | JsLoadOptions
);

/**
 * load config file async
 *
 * @param filepath - The file path
 * @param options - The options for loader to load the file
 */
export async function load(
  filepath: string,
  options: LoadOptions = {},
): Promise<any> {
  if (!fs.existsSync(filepath)) {
    throw new Error('File not found');
  }
  const loader = findLoader({
    lang: options.lang,
    extension: path.extname(filepath),
  });
  if (!loader) {
    throw new Error(`${filepath}: Unsupported format`);
  }
  return loader.load(filepath, <any>options);
}

/**
 * load config file sync
 *
 * @param filepath - The file path
 * @param options - The options for loader to load the file
 */
export function loadSync(filepath: string, options: LoadOptions = {}): any {
  if (!fs.existsSync(filepath)) {
    throw new Error('File not found');
  }
  const loader = findLoader({
    lang: options.lang,
    extension: path.extname(filepath),
  });
  if (!loader) {
    throw new Error(`${filepath}: Unsupported format`);
  }
  return loader.loadSync(filepath, <any>options);
}

/**
 * auto load config file async
 *
 * Async auto detect config file with the `filepath` and load the config file
 *
 * @param filepath - The file path without extension
 * @param options - The options for loader to load the file
 */
export async function autoLoad(
  filepath: string,
  options: LoadOptions = {},
): Promise<any> {
  const detected = detect(filepath, options.lang);
  if (!detected) {
    throw new Error('Unsupported config file: ' + filepath);
  }
  const {file, loader} = detected;
  return loader.load(file, options);
}

/**
 * auto load config file sync
 *
 * Sync auto detect config file with the `filepath` and load the config file
 *
 * @param filepath - The file path without extension
 * @param options - The options for loader to load the file
 */
export function autoLoadSync(filepath: string, options: LoadOptions = {}): any {
  const detected = detect(filepath, options.lang);
  if (!detected) {
    throw new Error('Unsupported config file: ' + filepath);
  }
  const {file, loader} = detected;
  return loader.loadSync(file, options);
}
