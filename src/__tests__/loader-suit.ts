import {Loader} from '../types';
import {resolveInFixture} from './support';
import {expect} from '@tib/testlab';

export function itLoad(
  loader: Loader,
  filename: string,
  options: any,
  expected: any,
) {
  const filepath = resolveInFixture(filename);
  describe(`${loader.lang} - ${filename}`, function () {
    it('should load config async', async function () {
      const obj = await loader.load(filepath, options);
      expect(obj).deepEqual(expected);
    });

    it('should load config sync', function () {
      const obj = loader.loadSync(filepath, options);
      expect(obj).deepEqual(expected);
    });
  });
}

export function itLoadThrows(loader: Loader, filename: string) {
  const filepath = resolveInFixture(filename);
  describe(`${loader.lang} - ${filename}`, function () {
    it('should load config async', async function () {
      await expect(loader.load(filepath, {throws: true})).rejectedWith(
        new RegExp(`${filepath}:`),
      );
    });

    it('should load config sync', function () {
      expect(() => loader.loadSync(filepath, {throws: true})).throw(
        new RegExp(`${filepath}:`),
      );
    });
  });
}
