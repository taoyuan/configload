import {OpenMode} from 'fs';

export interface FileReadOptions {
  encoding?: BufferEncoding;
  flag?: OpenMode;
}

export interface Loader {
  lang: string;
  extensions: string[];
  load(filepath: string, options?: Record<string, any>): Promise<any>;
  loadSync(filepath: string, options?: Record<string, any>): any;
}
