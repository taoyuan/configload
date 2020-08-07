import {FileReadOptions, Loader} from '../types';
import {readFile, readFileSync} from '../utils';

export interface JsonLoadOptions extends FileReadOptions {
  throws?: boolean;
  reviver?: any;
}

export class JsonLoader implements Loader {
  lang = 'json';
  extensions: string[] = ['.json', '.json5'];

  async load(filepath: string, options: JsonLoadOptions = {}): Promise<any> {
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = await readFile(filepath, options);

    let result: any;
    try {
      result = require('json5').parse(data, options.reviver);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }

  loadSync(filepath: string, options: JsonLoadOptions = {}): any {
    const shouldThrow = 'throws' in options ? options.throws : true;
    const data = readFileSync(filepath, options);

    let result: any;
    try {
      result = require('json5').parse(data, options.reviver);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }
}

export const json = new JsonLoader();
