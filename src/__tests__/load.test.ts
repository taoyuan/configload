import {expect} from '@tib/testlab';
import {autoLoad, autoLoadSync, load, loadSync} from '../load';
import {resolveInFixture} from './support';
import {samples} from './samples';

describe('load', function () {
  for (const {file, content} of samples) {
    describe(`load ${file}`, function () {
      it('[async] should load', async function () {
        const result = await load(resolveInFixture(file));
        expect(result).deepEqual(content);
      });

      it('[sync] should load', function () {
        const result = loadSync(resolveInFixture(file));
        expect(result).deepEqual(content);
      });
    });
  }

  describe('load file that not exist', function () {
    it('[async] should throw file not found error', async function () {
      await expect(load('foo.configload')).rejectedWith(/File not found/i);
    });

    it('[sync] should throw file not found error', function () {
      expect(() => loadSync('foo.configload')).throw(/File not found/i);
    });
  });

  describe('load unsupported file', function () {
    it('[async] should throw unsupported file error', async function () {
      await expect(load(resolveInFixture('foo.unsupported'))).rejectedWith(
        /Unsupported/i,
      );
    });

    it('[sync] should throw unsupported file error', function () {
      expect(() => loadSync(resolveInFixture('foo.unsupported'))).throw(
        /Unsupported/i,
      );
    });
  });
});

describe('auto load', function () {
  describe('load normal', function () {
    it('[async] should auto load yml', async function () {
      const result = await autoLoad(resolveInFixture('foo'));
      expect(result).deepEqual({yml: {foo: 'bar'}});
    });

    it('[sync] should auto load yml', function () {
      const result = autoLoadSync(resolveInFixture('foo'));
      expect(result).deepEqual({yml: {foo: 'bar'}});
    });
  });

  describe('load unsupported file', function () {
    it('[async] should throw unsupported error', async function () {
      await expect(autoLoad(resolveInFixture('foo.unsupported'))).rejectedWith(
        /Unsupported/i,
      );
    });

    it('[sync] should throw unsupported file error', function () {
      expect(() => autoLoadSync(resolveInFixture('foo.unsupported'))).throw(
        /Unsupported/i,
      );
    });
  });
});
