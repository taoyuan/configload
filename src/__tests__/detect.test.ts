import {expect} from '@tib/testlab';
import {resolveInFixture} from './support';
import {yaml} from '../loaders';
import {detect} from '../detect';

describe('detect', function () {
  it('should detected if file exists', function () {
    const file = resolveInFixture('foo.yaml');
    const detected = detect(file);
    expect(detected).deepEqual({file, lang: yaml.lang, loader: yaml});
  });

  it('should detected with lang', function () {
    const file = resolveInFixture('foo');
    const detected = detect(file, 'yaml');
    expect(detected).deepEqual({
      file: `${file}.yml`,
      lang: yaml.lang,
      loader: yaml,
    });
  });

  it('should detected automatically', function () {
    const file = resolveInFixture('foo');
    const detected = detect(file);
    expect(detected).deepEqual({
      file: `${file}.yml`,
      lang: yaml.lang,
      loader: yaml,
    });
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
