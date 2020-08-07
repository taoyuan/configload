import path from 'path';

export function resolveInFixture(filename: string) {
  return path.resolve(__dirname, 'fixtures', filename);
}
