import fs from 'fs';
import {FileReadOptions} from './types';

export function stripBom(content: string | Buffer): string {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8');
  return content.replace(/^\uFEFF/, '');
}

export async function readFile(
  filepath: string,
  options: FileReadOptions = {},
): Promise<string> {
  options = Object.assign(
    {
      encoding: 'utf8',
    },
    options,
  );
  return stripBom(await fs.promises.readFile(filepath, <any>options));
}

export function readFileSync(
  filepath: string,
  options: FileReadOptions = {},
): string {
  options = Object.assign(
    {
      encoding: 'utf8',
    },
    options,
  );
  return stripBom(fs.readFileSync(filepath, <any>options));
}
