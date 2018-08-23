// BUDGET CONTROLLER
var budgetController = (
    function () {

        var data = {
            allItems: {
                exp: [],
                inc: [],
            },
            totals: {
                exp: 0,
                inc: 0,
            }
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
                var item;
                if (description !== ''
                    && description !== undefined
                    && value !== ''
                    && value !== undefined) {
                    item = new Item(type, description, value);
                }
                if (item) {
                    data.allItems[type].push(item);
                    item.id = data.allItems[type].indexOf(item);
                    console.log(data);
                    return item;
                }
            },
            calculateTotals: (type) => {
                data.totals[type] = 0;
                data.allItems[type].forEach(value => {
                        data.totals[type] += +value.value
                    }
                );
                console.log(data.totals[type]);
                return data.totals[type];
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
            addItemToList: (item) => {
                var html, newHtml, element;

                // create HTML string with placeholder text
                if (item.type === 'inc') {
                    element = DOMStrings.incomeList;
                    html = '<div class="item clearfix" id="income-%id%">' +
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '<div class="item__value">%value%</div>' +
                        '<div class="item__delete">' +
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                } else if (item.type === 'exp') {
                    element = DOMStrings.expensesList;
                    html = '<div class="item clearfix" id="expense-%id%">' +
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '<div class="item__value">%value%</div>' +
                        '<div class="item__percentage">%percentage%</div>' +
                        '<div class="item__delete">' +
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }

                // replace placeholders with actual data
                newHtml = html.replace('%id%', item.id);
                newHtml = newHtml.replace('%description%', item.description);
                newHtml = newHtml.replace('%value%', item.value);

                // insert HTML to the DOM
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },
            displayTotals: (type, total) => {
                var totalString = type === 'inc' ? DOMStrings.budgetIncomeValue : DOMStrings.budgetExpensesValue;
                document.querySelector(totalString).textContent = typeSigns[type] + ' ' + total;
            }
        }
    }
)();

// GLOBAL APP CONTROLLER
var controller = (
    function (budgetCtrl, UICtrl) {

        // initialize event listeners
        var setupEventListeners = function () {
            var DOM = UICtrl.getDOMStrings();
            document.querySelector(DOM.addButton).addEventListener('click', addItem);
            document.addEventListener('keypress', event => {
                if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                    addItem();
                }
            });
        };

        function addItem() {
            // 1. Get the field input data.
            var input = UICtrl.getInput();
            // 2. Add the item to the budget controller.
            var item = budgetCtrl.createItem(input.type, input.description, input.value);
            // 3. Add the item to the UI.
            if (item) {
                UICtrl.clearInputs();
                UICtrl.addItemToList(item);
            }
            // 4. Calculate the budget.
            var total = budgetCtrl.calculateTotals(item.type)
            // 5. Display the budget on the UI.
            UICtrl.displayTotals(item.type, total);
        }

        return {
            init: () => {
                console.log('Application has started.');
                setupEventListeners();
            }
        }

    }
)(budgetController, UIController);

controller.init();