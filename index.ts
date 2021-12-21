require('dotenv').config({ path: __dirname+'/.env' });
import { LightListener, alwaysFailingAlarm, MovementListener, resetMutator, colorSetMutator,  } from "./lib";


function runLightsListener(){
    let listener = new LightListener()
    listener.filter(['templateExistsFilter'])
    listener.mutator(new resetMutator())
    listener.mutator(new colorSetMutator(['carrot_orange', 'hot_pink', 'ivory']))
    

    listener.alarm(alwaysFailingAlarm)
    listener.connect()
    
}



function runMovementListener(){
    let listener = new MovementListener()
    listener.connect()
}

runMovementListener()




