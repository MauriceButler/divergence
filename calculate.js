var constants = require('./constants'),
    deepEqual = require('deep-equal');

function scanForChanges(old, current, processedKey){
    var keys = Object.keys(old),
        moarKeys = Object.keys(current),
        visited = {},
        result = {};

    if(processedKey === undefined){
        processedKey = '';
    } else {
        processedKey += '.';
    }

    keys.push.apply(keys, moarKeys);

    for (var i = 0; i < keys.length; i++) {
        var keyBeingProcessed = keys[i];

        if(keyBeingProcessed in visited){
            continue;
        }

        visited[keyBeingProcessed] = null;

        if(!(keyBeingProcessed in current)){
            result[processedKey + keyBeingProcessed] = [constants.actions.deleted];
            continue;
        }

        if(!(keyBeingProcessed in old)){
            result[processedKey + keyBeingProcessed] = [constants.actions.added, current[keyBeingProcessed]];
            continue;
        }

        if(!deepEqual(old[keyBeingProcessed], current[keyBeingProcessed])){
            if(typeof current[keyBeingProcessed] === 'object'){
                var deepChanges = scanForChanges(old[keyBeingProcessed], current[keyBeingProcessed], keyBeingProcessed);

                for(var deepKey in deepChanges){
                    result[processedKey + deepKey] = deepChanges[deepKey];
                }
            } else {
                result[processedKey + keyBeingProcessed] = [constants.actions.modified, current[keyBeingProcessed]];
            }
            continue;
        }
    }

    return result;
}




module.exports = scanForChanges;