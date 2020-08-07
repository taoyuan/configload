import {toml} from '../../loaders';
import {itLoad, itLoadThrows} from '../loader-suit';

describe('loader/toml', function () {
  itLoad(toml, 'foo.toml', {}, {toml: {foo: 'bar'}});
  itLoadThrows(toml, 'foo-error.toml');
});
