import {FileReadOptions, Loader} from '../types';
import {readFile, readFileSync} from '../utils';

export interface TomlLoadOptions extends FileReadOptions {
  throws?: boolean;
}

export class TomlLoader implements Loader {
  lang = 'toml';
  extensions: string[] = ['.toml'];

  async load(filepath: string, options: TomlLoadOptions = {}): Promise<any> {
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = await readFile(filepath, options);

    let result: any;
    try {
      result = require('@iarna/toml').parse(data);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }

  loadSync(filepath: string, options: TomlLoadOptions = {}): any {
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = readFileSync(filepath, options);

    let result: any;
    try {
      result = require('@iarna/toml').parse(data);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }
}

export const toml = new TomlLoader();
