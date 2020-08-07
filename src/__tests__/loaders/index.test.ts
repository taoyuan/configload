import {detect, findLoader, yaml} from '../../loaders';
import {expect} from '@tib/testlab';
import {resolveInFixture} from '../support';

describe('loaders', function () {
  describe('findLoader', function () {
    it('should find loader by lang', function () {
      const loader = findLoader({lang: 'yaml'});
      expect(loader).equal(yaml);
    });

    it('should find loader by extension', function () {
      const loader = findLoader({extension: '.yaml'});
      expect(loader).equal(yaml);
    });

    it('should find loader by lang if both lang and extension provided', function () {
      const loader = findLoader({lang: 'yaml', extension: '.toml'});
      expect(loader).equal(yaml);
    });

    it('should return undefined if not found', function () {
      const loader = findLoader({lang: 'xxx', extension: '.yyy'});
      expect(loader).undefined();
    });

    it('should return undefined without conditions', function () {
      const loader = findLoader({});
      expect(loader).undefined();
    });
  });

  describe('detect', function () {
    it('should detected if file exists', function () {
      const file = resolveInFixture('foo.yaml');
      const detected = detect(file);
      expect(detected).deepEqual({file, loader: yaml});
    });

    it('should detected with lang', function () {
      const file = resolveInFixture('foo');
      const detected = detect(file, 'yaml');
      expect(detected).deepEqual({file: `${file}.yml`, loader: yaml});
    });

    it('should detected automatically', function () {
      const file = resolveInFixture('foo');
      const detected = detect(file);
      expect(detected).deepEqual({file: `${file}.yml`, loader: yaml});
    });

    it('should not detected with unsupported lang for the file that not exits', function () {
      const file = resolveInFixture('foo');
      const detected = detect(file, 'bar');
      expect(detected).undefined();
    });

    it('should not detected with unsupported lang for the file that exits', function () {
      const file = resolveInFixture('foo.toml');
      const detected = detect(file, 'bar');
      expect(detected).undefined();
    });

    it('should not detected without lang argument if file is not exist', function () {
      const file = resolveInFixture('bar');
      const detected = detect(file);
      expect(detected).undefined();
    });

    it('should not detected with supported lang if file is not exist', function () {
      const file = resolveInFixture('bar');
      const detected = detect(file, 'yaml');
      expect(detected).undefined();
    });
  });
});
