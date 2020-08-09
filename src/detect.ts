import {Loader} from './types';
import path from 'path';
import fs from 'fs';
import {findLoader, loaders} from './loaders';

export interface Detected {
  file: string;
  lang: string;
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
      return {file, lang: loader.lang, loader};
    }
    for (const ext of loader.extensions) {
      const f = file + ext;
      if (fs.existsSync(f)) {
        return {file: f, lang: loader.lang, loader};
      }
    }
  } else {
    for (const l of loaders) {
      for (const ext of l.extensions) {
        const f = file + ext;
        if (fs.existsSync(f)) {
          return {file: f, lang: l.lang, loader: l};
        }
      }
    }
  }
}
