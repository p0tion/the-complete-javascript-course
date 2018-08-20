function Person(name, age, height) {
    this.name= name;
    this.age = age;
    this.height = height;
    this.score = this.height + 5 * this.age;
}

function compare(a,b,c) {
    if (a.score == b.score && a.score == c.score) {
        return 'All scores are equal. The result is draw.';
    } else if (a.score > b.score && a.score > c.score) {
        return a.name + ' wins. His score is ' + a.score;
    } else if (b.score > a.score && b.score > c.score) {
        return b.name + ' wins. His score is ' + b.score;
    } else if (c.score > b.score && c.score > a.score) {
        return c.name + ' wins. His score is ' + c.score;
    } else {
        return 'No winner, may be two of three have equal score?';
    }
}

var john = new Person('John', 14, 183);
var william = new Person('William', 14, 183);
var kevin = new Person('Kevin', 13, 183);

console.log(john.name + '\'s score is ' + john.score);
console.log(william.name + '\'s score is ' + william.score);
console.log(kevin.name + '\'s score is ' + kevin.score);
console.log(compare(john, william, kevin));