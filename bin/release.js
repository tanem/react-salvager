import 'shelljs/global';
config.fatal = true;

import path from 'path';
import fs from 'fs';
import semver from 'semver';
import packageJSON from '../package.json';

const [ , , newVersion] = process.argv;
const newSemver = getNewSemver(packageJSON.version, newVersion);

exec('npm run test -- local');
exec('npm run build');

writePackageJSONVersion(newSemver);

exec('git add -A');
exec(`git commit -am "Release v${newSemver}"`);
exec(`git tag v${newSemver}`);
exec('git push');
exec('git push --tags');
exec('npm publish');

function getNewSemver(currentVersion, newVersion) {
  let newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(currentVersion, newVersion);
  if (!newSemver) {
    echo('Invalid new version');
    exit(1);
  }
  return newSemver;
}

function writePackageJSONVersion(newSemver) {
  packageJSON.version = newSemver;
  fs.writeFileSync(
    path.join(process.cwd(), 'package.json'),
    JSON.stringify(packageJSON, null, 2)
  );
}
