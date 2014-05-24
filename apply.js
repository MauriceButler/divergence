var actions = require('./actions'),
    deepEqual = require('deep-equal');

function getTarget(base, key){
    var parts = key.split('.'),
        result = base;

    if(parts.length > 1){
        for (var i = 0; i < parts.length; i++) {
            if(typeof result[parts[i]] !== 'object'){
                return result;
            }

            result = result[parts[i]];
        }
    }

    return result;
}

function applyChange(base, diffKey, diffItem){
    var thingToChange = getTarget(base, diffKey),
        lastIdentifier = diffKey.split('.').pop();

    if(diffItem[0] === actions.deleted){
        delete thingToChange[lastIdentifier];
        return;
    }

    // shortcut for modified and added
    if(diffItem[0] > actions.deleted){
        thingToChange[lastIdentifier] = diffItem[1];
        return;
    }
}

function applyChanges(base, diff){
    var items = Object.keys(diff);

    for (var i = 0; i < items.length; i++) {
        applyChange(base, items[i], diff[items[i]]);
    }

    return base;
}

module.exports = applyChanges;