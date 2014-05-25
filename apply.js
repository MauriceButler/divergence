var actions = require('./actions'),
    deepEqual = require('deep-equal');

function getTarget(base, keys){
    var result = base;

    if(keys.length){
        for (var i = 0; i < keys.length; i++) {
            if(typeof result[keys[i]] !== 'object'){
                result[keys[i]] = {};
            }

            result = result[keys[i]];
        }
    }

    return result;
}

function applyChange(base, diffKey, diffItem){
    var keys = diffKey.split('.'),
        lastKey = keys.pop(),
        thingToChange = getTarget(base, keys);

    if(diffItem[0] === actions.deleted){
        delete thingToChange[lastKey];
        return;
    }

    // shortcut for modified and added
    if(diffItem[0] > actions.deleted){
        thingToChange[lastKey] = diffItem[1];
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