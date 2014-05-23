var test = require('grape'),
    calculate = require('../calculate');

test('calculate Exists', function (t) {
    t.plan(2);

    t.ok(calculate, 'calculate Exists');
    t.equal(typeof calculate, 'function',  'calculate is a function');
});

test('shallow diff', function (t) {
    t.plan(1);
    var oldObject = {
            a: 1,
            b: 2,
            c: 3
        },
        currentObject = {
            b: 4,
            c: 3,
            d: 6
        };

    t.deepEqual(calculate(oldObject, currentObject), { a: [ 0 ], b: [ 1, 4 ], d: [ 2, 6 ] }, 'shallow diff');
});

test('deep diff', function (t) {
    t.plan(1);
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

    t.deepEqual(calculate(oldObject, currentObject), {"a":[0],"b.meh":[1,"moar stuff"],"d":[2,{"beep":"boop"}]}, 'deep diff');
});

test('all the things', function (t) {
    t.plan(1);
    var oldObject = {
            a: {
                foo: 'bar',
                meh: {
                    stuff: 'things'
                },
                majigger: [
                    123,
                    [
                        1,
                        {}
                    ],
                    'abc'
                ]
            },
            b: {
                foo: 'bar',
                meh: {
                    stuff: 'things'
                },
                majigger: [
                    123,
                    [
                        1,
                        {}
                    ],
                    'abc'
                ]
            },
            c: {
                foo: 'bar',
                meh: {
                    stuff: 'things'
                },
                majigger: [
                    123,
                    [
                        1,
                        {}
                    ],
                    'abc'
                ]
            }
        },
        currentObject = {
            b: {
                foo: 'xxx',
                meh: {
                    stuff: 'things'
                },
                majigger: [
                    123,
                    [
                        1,
                        {}
                    ],
                    'abc'
                ]
            },
            c: {
                foo: 'bar',
                meh: {
                    stuff: 'things'
                },
                majigger: [
                    123,
                    [
                        1,
                        {},
                        'im new!'
                    ],
                    'abc'
                ]
            },
            d: {
                foo: 'bar',
                meh: {
                    stuff: 'moar things'
                },
                majigger: [
                    123,
                    [
                        2,
                        {}
                    ],
                    'abc'
                ]
            }
        };

    t.deepEqual(calculate(oldObject, currentObject), {"a":[0],"b.foo":[1,"xxx"],"c.majigger.1.2":[2,"im new!"],"d":[2,{"foo":"bar","meh":{"stuff":"moar things"},"majigger":[123,[2,{}],"abc"]}]}, 'all the things');
});