let data = {
    labels: ['12.01.17', '13.01.17', '14.01.17', '15.01.17', '16.01.17'],

    datasets: [
        {
            title: 'Some Data',
            color: 'light-blue',
            values: [50, 40, 30, 20, 10]
        },
        {
            title: 'Another Set',
            color: 'violet',
            values: [50, 47, 20]
        }
    ]
};

new Chart({
    parent: '#chart',
    title: 'My Awesome Chart',
    data: data,
    type: 'line',
    height: 250
});
// chart.show_averages();
