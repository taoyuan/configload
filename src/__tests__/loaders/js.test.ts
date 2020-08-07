import {js} from '../../loaders';
import {itLoad, itLoadThrows} from '../loader-suit';

describe('loader/js', function () {
  itLoad(js, 'foo.js', {}, {js: {foo: 'bar'}});
  itLoadThrows(js, 'foo-error.js');
});
