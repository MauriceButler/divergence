# divergence

Calculates and applies the divergence between 2 objects

# Install

    npm install divergence

# Usage

## Calculate

    var oldObject = {
            a: {
                foo: 'bar'
            },
            b: {
                meh: 'stuff'
            },
            c: {
                things: 'majigger'
            }
        },
        currentObject = {
            b: {
                meh: 'moar stuff'
            },
            c: {
                things: 'majigger'
            },
            d: {
                beep: 'boop'
            }
        };

    calculate(oldObject, currentObject);

    // {
    //     "a":[0],
    //     "b.meh":[1,"moar stuff"],
    //     "d":[2,{"beep":"boop"}]
    // }

## Apply

    var oldObject = {
            a: {
                foo: 'bar'
            },
            b: {
                meh: 'stuff'
            },
            c: {
                things: 'majigger'
            }
        },
        currentObject = {
            b: {
                meh: 'moar stuff'
            },
            c: {
                things: 'majigger'
            },
            d: {
                beep: 'boop'
            }
        },
        diff = calculate(oldObject, currentObject); //{"a":[0],"b.meh":[1,"moar stuff"],"d":[2,{"beep":"boop"}]}

    apply(oldObject, diff);

    deepEqual(oldObject, currentObject); // Objects are equal

## Diff output format

The output format of a diff is designed to be minimal and not necessarily human readable.

However if you want it can be inflated.

The keys of the diff object are dot separated keys of the original object that have been changed.

The value of the key is an array, where the first item is the action that occurred and the second is the new value.

Actions are defined as:

    deleted: 0
    modified: 1
    added: 2

For example:

a diff object of

    {
        "a":[0],
        "b.meh":[1,"moar stuff"],
        "d":[2,{"beep":"boop"}]
    }

Means that the key `a` was deleted, `b.meh` was modified to be `"moar stuff"` and `d` was added with the value of `{"beep":"boop"}`

#Arrays

This module will totaly work with arrays, however it currently does not handle deletions very efficiently.

For example:

    var oldObject = [0,1,2,3,4,5],
        currentObject = [1,2,3,4,5],
        diff = calculate(oldObject, currentObject);

Should result in:

    {
        '0': [ 0 ]
    }


But will result in:

    {
        '0': [ 1, 1 ],
        '1': [ 1, 2 ],
        '2': [ 1, 3 ],
        '3': [ 1, 4 ],
        '4': [ 1, 5 ],
        '5': [ 0 ]
    }

The final applied result will be the same, however will take longer / has more to process

This will get fixed at some stage and is currently tracked in issue #1