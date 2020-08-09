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
