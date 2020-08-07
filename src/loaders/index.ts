import * as fs from 'fs';
import * as path from 'path';
import {Loader} from '../types';
import {json} from './json';
import {yaml} from './yaml';
import {toml} from './toml';
import {js} from './js';

export * from './json';
export * from './yaml';
export * from './toml';
export * from './js';

export const loaders = [yaml, json, toml, js];

export interface FindLoaderOptions {
  lang?: string;
  extension?: string;
}

export function findLoader(options: FindLoaderOptions) {
  const {lang, extension} = options;
  if (lang) {
    return loaders.find(l => l.lang === lang.toLowerCase());
  }
  if (extension) {
    return loaders.find(l => l.extensions.includes(extension.toLowerCase()));
  }
}

export interface Detected {
  file: string;
  loader: Loader;
}

export function detect(file: string, lang?: string): Detected | undefined {
  const loader = findLoader({
    lang,
    extension: path.extname(file),
  });

  if (!loader && lang) {
    return;
  }

  if (loader) {
    if (fs.existsSync(file)) {
      return {file, loader};
    }
    for (const ext of loader.extensions) {
      const f = file + ext;
      if (fs.existsSync(f)) {
        return {file: f, loader};
      }
    }
  } else {
    for (const l of loaders) {
      for (const ext of l.extensions) {
        const f = file + ext;
        if (fs.existsSync(f)) {
          return {file: f, loader: l};
        }
      }
    }
  }
}
