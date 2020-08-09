import {findLoader, yaml} from '../../loaders';
import {expect} from '@tib/testlab';

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
});
