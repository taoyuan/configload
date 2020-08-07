import {json} from '../../loaders';
import {itLoad, itLoadThrows} from '../loader-suit';

describe('loader/json', function () {
  itLoad(json, 'foo.json', {}, {json: {foo: 'bar'}});
  itLoad(json, 'foo.json5', {}, {json5: {foo: 'bar'}});
  itLoadThrows(json, 'foo-error.json');
  itLoadThrows(json, 'foo-error.json5');
});
