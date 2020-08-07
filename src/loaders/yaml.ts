import {FileReadOptions, Loader} from '../types';
import {readFile, readFileSync} from '../utils';

export interface YamlLoadOptions extends FileReadOptions {
  throws?: boolean;
  filename?: string;
}

export class YamlLoader implements Loader {
  lang = 'yaml';
  extensions: string[] = ['.yml', '.yaml'];

  async load(filepath: string, options: YamlLoadOptions = {}): Promise<any> {
    options = Object.assign(
      {
        filename: filepath,
      },
      options,
    );
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = await readFile(filepath, options);

    let result: any;
    try {
      result = require('js-yaml').safeLoad(data, options);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }

  loadSync(filepath: string, options: YamlLoadOptions = {}): any {
    options = Object.assign(
      {
        filename: filepath,
      },
      options,
    );
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = readFileSync(filepath, options);

    let result: any;
    try {
      result = require('js-yaml').safeLoad(data, options);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }
}

export const yaml = new YamlLoader();
