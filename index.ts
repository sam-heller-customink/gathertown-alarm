require('dotenv').config({ path: __dirname+'/.env' });
import { Listener, alwaysFailingAlarm } from "./lib";
let listener = new Listener()

listener.filter(['templateExistsFilter'])
listener.mutator('resetMutator')
listener.alarm(alwaysFailingAlarm)
listener.connect()






