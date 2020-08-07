import {expect} from '@tib/testlab';
import {stripBom} from '../utils';

describe('utils', function () {
  describe('stripBom', function () {
    it('should work', function () {
      expect(stripBom('\uFEFFunicorn')).equal('unicorn');
      expect(stripBom(Buffer.from('\uFEFFunicorn'))).equal('unicorn');
    });
  });
});
