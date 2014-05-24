var test = require('grape'),
    apply = require('../apply');

test('apply Exists', function (t) {
    t.plan(2);

    t.ok(apply, 'apply Exists');
    t.equal(typeof apply, 'function',  'apply is a function');
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
        },
        diff = { a: [ 0 ], b: [ 1, 4 ], d: [ 2, 6 ] };

    apply(oldObject, diff);

    t.deepEqual(oldObject, currentObject, 'works');
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
        },
        diff = {"a":[0],"b.meh":[1,"moar stuff"],"d":[2,{"beep":"boop"}]};

    apply(oldObject, diff);

    t.deepEqual(oldObject, currentObject, 'works also');
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
        },
        diff = {"a":[0],"b.foo":[1,"xxx"],"c.majigger.1.2":[2,"im new!"],"d":[2,{"foo":"bar","meh":{"stuff":"moar things"},"majigger":[123,[2,{}],"abc"]}]};

    apply(oldObject, diff);

    t.deepEqual(oldObject, currentObject, 'works also');
});