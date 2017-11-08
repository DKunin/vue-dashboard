'use strict';

const labels = [
    '30.10.2017',
    '31.10.2017',
    '1.11.2017',
    '2.11.2017',
    '3.11.2017',
    '6.11.2017',
    '7.11.2017',
    '8.11.2017',
    '9.11.2017',
    '10.11.2017'
];

const perfectValues = [ 77, 69, 61, 53, 45, 37, 29, 21, 13, 5 ];
const burnDownValues = [ 77, 74, 65, 51, 44 ];

const newAvStep =
    (burnDownValues[0] - burnDownValues[burnDownValues.length - 1]) /
    burnDownValues.length;

const newPerspective = new Array(labels.length - 1).fill(1).reduce(function(
    newArray
) {
    const newValue = Math.floor(newArray[newArray.length - 1] - newAvStep);
    return newArray.concat([
        newValue < 0 ? 0 : newValue
    ]);
},
[burnDownValues[0]]);

let data = {
    labels,
    datasets: [
        {
            title: 'Some Data',
            color: 'light-blue',
            values: perfectValues
        },
        {
            title: 'Another Set',
            color: 'violet',
            values: burnDownValues
        },
        {
            title: 'Perspective Set',
            color: 'grey',
            values: newPerspective
        }
    ]
};

new Chart({
    parent: '#chart',
    title: '',
    data: data,
    type: 'line',
    height: 300
});
