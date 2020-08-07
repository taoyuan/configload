import {yaml} from '../../loaders';
import {itLoad, itLoadThrows} from '../loader-suit';

describe('loader/yaml', function () {
  itLoad(yaml, 'foo.yaml', {}, {yaml: {foo: 'bar'}});
  itLoad(yaml, 'foo.yml', {}, {yml: {foo: 'bar'}});
  itLoadThrows(yaml, 'foo-error.yaml');
});
