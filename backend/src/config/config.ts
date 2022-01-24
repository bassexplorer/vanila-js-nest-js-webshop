import * as path from 'path';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

export default () => {
  return yaml.load(
    readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        'src',
        'config',
        'development.config.yml',
      ),
      'utf8',
    ),
  ) as Record<string, any>;
};
