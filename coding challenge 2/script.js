function printFullAge(years) {
    var ages = [];
    var booleans = [];

    for (var i = 0; i < years.length; i++) {
        ages.push(2018 - years[i]);
    }

    for (var i = 0; i < ages.length; i++) {
        if (ages[i] >= 18) {
            console.log('Person ' + i + ' is a full age(' + ages[i] + ').');
            booleans.push(true);
        } else {
            booleans.push(false);
        }
    }

    return booleans;
}

var full1 = printFullAge([1965, 2008, 1992, 2000]);
var full2 = printFullAge([2005, 1968, 1984, 2002]);

console.log(full1);
console.log(full2);
