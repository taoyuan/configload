import {FileReadOptions, Loader} from '../types';

export interface JsLoadOptions extends FileReadOptions {
  throws?: boolean;
}

export class JsLoader implements Loader {
  lang = 'js';
  extensions: string[] = ['.js'];

  async load(filepath: string, options: JsLoadOptions = {}): Promise<any> {
    const shouldThrow = 'throws' in options ? options.throws : true;

    let result: any;
    try {
      result = require(filepath);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }

  loadSync(filepath: string, options: JsLoadOptions = {}): any {
    const shouldThrow = 'throws' in options ? options.throws : true;

    let result: any;
    try {
      result = require(filepath);
    } catch (e) {
      if (shouldThrow) {
        e.message = `${filepath}: ${e.message}`;
        throw e;
      }
    }
    return result;
  }
}

export const js = new JsLoader();
