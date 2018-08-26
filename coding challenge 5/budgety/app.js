// BUDGET CONTROLLER
var budgetController = (
    function () {

        var id = 0;

        var data = {
            allItems: {
                exp: [],
                inc: [],
            },
            totals: {
                exp: 0,
                inc: 0,
                per: 0,
            },
        };

        var Item = function (type, description, value) {
            this.type = type;
            this.description = description;
            this.value = value;
            this.toString = function () {
                return 'description: ' + this.description + '; value: ' + this.value;
            }
        };

        return {
            createItem: (type, description, value) => {
                var item = new Item(type, description, value);
                data.allItems[type].push(item);
                item.id = id++;
                console.log(data);
                return item;
            },
            calculateTotals: (type) => {
                data.totals[type] = 0;
                data.allItems[type].forEach(value => {
                        data.totals[type] += +value.value
                    }
                );
                console.log(data.totals[type]);
                return data.totals[type];
            },
            calculateAvailableBudget: () => {
                return data.totals.inc - data.totals.exp;
            },
            calculateTotalsPercentage: () => {
                return Math.round(data.totals.exp / (data.totals.inc + data.totals.exp) * 100);
            },
            recalculateExpensesWithPercentage: () => {
                data.allItems.exp.forEach(expense => {
                    expense.percentage = Math.round(expense.value / data.totals.exp * 100);
                });
                return data.allItems.exp;
            },
            deleteItem: (id) => {
                var item = findItem();
                if (item) {
                    removeItem();
                    return item;
                }

                function findItem() {
                    var item;
                    if (data.allItems.inc.length > 0) {
                        for (var i = 0; i < data.allItems.inc.length; i++) {
                            if (data.allItems.inc[i].id === +id) {
                                item = data.allItems.inc[i];
                                console.log(item);
                                console.log(data.allItems.inc);
                            }
                        }
                    }
                    if (item) {
                        return item;
                    }
                    if (data.allItems.exp.length > 0) {
                        for (var i = 0; i < data.allItems.exp.length; i++) {
                            if (data.allItems.exp[i].id === +id) {
                                item = data.allItems.exp[i];
                                console.log(item);
                                console.log(data.allItems.exp);
                            }
                        }
                    }
                    return item;
                }

                function removeItem() {
                    if (item.type === 'inc') {
                        data.allItems.inc.splice(data.allItems.inc.indexOf(item), 1);
                    } else if (item.type === 'exp') {
                        data.allItems.exp.splice(data.allItems.exp.indexOf(item), 1);
                    }
                }
            }
        }
    }
)();

// UI CONTROLLER
var UIController = (
    function () {

        var DOMStrings = {
            addButton: '.add__btn',
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value',
            incomeList: '.income__list',
            expensesList: '.expenses__list',
            budgetIncomeValue: '.budget__income--value',
            budgetExpensesValue: '.budget__expenses--value',
            budgetExpensesPercentage: '.budget__expenses--percentage',
            container: '.container',
            budgetTitle: '.budget__title',
            availableBudget: '.budget__value',
        };

        var typeSigns = {
            inc: '+',
            exp: '-',
        };

        return {
            getDOMStrings: () => {
                return DOMStrings;
            },
            getInput: () => {
                return {
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDescription).value,
                    value: document.querySelector(DOMStrings.inputValue).value,
                }
            },
            clearInputs: () => {
                // document.querySelector(DOMStrings.inputType).value = 'inc';
                document.querySelector(DOMStrings.inputDescription).value = '';
                document.querySelector(DOMStrings.inputDescription).focus();
                document.querySelector(DOMStrings.inputValue).value = '';
            },
            addIncomeToList: (income) => {
                var html, newHtml;

                // create HTML string with placeholder text
                html = '<div class="item clearfix" id="income-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline" id="%id%"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                // replace placeholders with actual data
                newHtml = html.replace(/%id%/g, income.id);
                newHtml = newHtml.replace('%description%', income.description);
                newHtml = newHtml.replace('%value%', income.value);

                // insert HTML to the DOM
                document.querySelector(DOMStrings.incomeList).insertAdjacentHTML('beforeend', newHtml);
            },
            displayTotals: (type, total, percentage) => {
                var totalString = type === 'inc' ? DOMStrings.budgetIncomeValue : DOMStrings.budgetExpensesValue;
                document.querySelector(totalString).textContent = typeSigns[type] + total;
                if (total === 0) {
                    document.querySelector(DOMStrings.budgetExpensesPercentage).textContent = '0%';
                } else {
                    document.querySelector(DOMStrings.budgetExpensesPercentage).textContent = percentage + '%';
                }
            },
            updateExpenseList: (allExps) => {

                // wipe out all expenses
                document.querySelector(DOMStrings.expensesList).innerHTML = '';

                allExps.forEach(expense => {

                    // create HTML string with placeholder text
                    var html = '<div class="item clearfix" id="expense-%id%">' +
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '<div class="item__value">%value%</div>' +
                        '<div class="item__percentage">%percentage%</div>' +
                        '<div class="item__delete">' +
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline" id="%id%"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    // replace placeholders with actual data
                    var newHtml = html.replace(/%id%/g, expense.id);
                    newHtml = newHtml.replace('%description%', expense.description);
                    newHtml = newHtml.replace('%value%', expense.value);
                    newHtml = newHtml.replace('%percentage%', expense.percentage + '%');

                    // insert HTML to the DOM
                    document.querySelector(DOMStrings.expensesList).insertAdjacentHTML('beforeend', newHtml);
                })
            },
            removeFromIncomeList: (item) => {
                document.querySelector('#income-' + item.id).remove();
            },
            displayAvailableBudget: (availableBudget) => {
                document.querySelector(DOMStrings.availableBudget).textContent = availableBudget;
            }
        }
    }
)();

// GLOBAL APP CONTROLLER
var controller = (
    function (budgetCtrl, UICtrl) {

        var DOM = UICtrl.getDOMStrings();

        // initialize event listeners
        var setupEventListeners = function () {
            document.querySelector(DOM.addButton).addEventListener('click', addItem);
            document.addEventListener('keypress', event => {
                if (event.key === 'Enter' || event.key === 'NumpadEnter') {
                    addItem();
                }
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'ArrowDown') {
                    document.querySelector(DOM.inputType).value = 'exp';
                }
                if (event.key === 'ArrowUp') {
                    document.querySelector(DOM.inputType).value = 'inc';
                }
            });
            document.querySelector(DOM.container).addEventListener('click', deleteItem)
        };

        function deleteItem(event) {
            var id = event.target.id;
            console.log(id);
            var item = budgetCtrl.deleteItem(id);
            var total = budgetCtrl.calculateTotals(item.type);
            var percentage = budgetCtrl.calculateTotalsPercentage();
            var availableBudget = budgetCtrl.calculateAvailableBudget();
            if (item.type === 'exp') {
                var allExps = budgetCtrl.recalculateExpensesWithPercentage();
                UICtrl.updateExpenseList(allExps);
            } else {
                UICtrl.removeFromIncomeList(item);
            }
            UICtrl.displayTotals(item.type, total, percentage);
            UICtrl.displayAvailableBudget(availableBudget);
        }

        function addItem() {
            // 1. Get the field input data.
            var input = UICtrl.getInput();
            // 2. Add the item to the budget controller.
            var item;
            if (input.description !== ''
                && input.description !== undefined
                && input.value !== ''
                && input.value !== undefined) {
                item = budgetCtrl.createItem(input.type, input.description, input.value);
            }
            if (item) {
                // 3. Calculate the budget.
                var total = budgetCtrl.calculateTotals(item.type);
                var percentage = budgetCtrl.calculateTotalsPercentage();
                var availableBudget = budgetCtrl.calculateAvailableBudget();
                // 4. Add the item to the UI.
                UICtrl.clearInputs();
                if (item.type === 'exp') {
                    var allExps = budgetCtrl.recalculateExpensesWithPercentage();
                    UICtrl.updateExpenseList(allExps);
                } else {
                    UICtrl.addIncomeToList(item);
                }
                // 5. Display the budget on the UI.
                UICtrl.displayTotals(item.type, total, percentage);
                UICtrl.displayAvailableBudget(availableBudget);
            }
        }

        return {
            init: () => {
                console.log('Application has started.');
                setupEventListeners();
                pasteMonthToTheTitle();

                function pasteMonthToTheTitle() {
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    var monthName = monthNames[new Date().getMonth()];
                    document.querySelector(DOM.budgetTitle).textContent = 'Available Budget in ' + monthName;
                }
            }
        }

    }
)(budgetController, UIController);

controller.init();