import 'shelljs/global'
config.fatal = true

import { Server } from 'karma'
import makeKarmaConfig from './make-karma-config'

const [ , , testType = 'ci' ] = process.argv

exec('npm run lint')
exec('npm run clean -- cov')

new Server(makeKarmaConfig(testType), exit).start()
