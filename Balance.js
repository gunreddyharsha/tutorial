let BalanceAmount = document.getElementById('Balance1');
let incomeAmount = document.getElementById("Income");
let expensesAmount = document.getElementById("Expenses1");
let itemName = document.getElementById("itemName");
let itemAmount = document.getElementById("itemAmount");
let buttonElement = document.getElementById("Button");
let unorderList = document.getElementById("addedItems");

function allElements() {
    let a = localStorage.getItem("storedElement9");
    let item = JSON.parse(a);
    if (item === null) {
        return []
    } else {
        return item
    }
}
let listofItems = allElements();

let listid = listofItems.length;

function deleteitemelement(maindivElementid) {
    let todo = document.getElementById(maindivElementid);
    unorderList.removeChild(todo);

    let deleteElementIndex = listofItems.findIndex(function(eachTodo) {
        if (eachTodo.id === maindivElementid) {
            return true;
        } else {
            return false;
        }
    });

    listofItems.splice(deleteElementIndex, 1);
    localStorage.setItem("storedElement9", JSON.stringify(listofItems));
    console.log(listofItems);
    findingEmount();
}

function createElementstoEnter(eachItem) {
    let maindivElementid = eachItem.id;
    let maindivElement = document.createElement("div");
    maindivElement.id = maindivElementid
    maindivElement.classList.add("addingFlex");
    unorderList.appendChild(maindivElement);

    let listElement = document.createElement("div");
    listElement.classList.add("ListAddedforIncome");
    if (eachItem.money > 0) {
        listElement.classList.add("IncomeList");
    } else {
        listElement.classList.add("expenseList");
    }
    maindivElement.appendChild(listElement);

    let divelement = document.createElement("div");
    divelement.classList.add("ListItems");
    listElement.appendChild(divelement);

    let paraEleemmt = document.createElement("p");
    paraEleemmt.textContent = eachItem.name;
    divelement.appendChild(paraEleemmt);

    let paraEleemmt1 = document.createElement("p");
    paraEleemmt1.textContent = eachItem.money;
    divelement.appendChild(paraEleemmt1);

    let buttondiv = document.createElement("div");
    maindivElement.appendChild(buttondiv)

    let DeleteButton = document.createElement("button");
    DeleteButton.textContent = "Detete";
    DeleteButton.classList.add("styleing-button")
    DeleteButton.onclick = function() {
        deleteitemelement(maindivElementid);
    }
    buttondiv.appendChild(DeleteButton);
    findingEmount();
}
console.log(listofItems)
for (let eachItem of listofItems) {
    createElementstoEnter(eachItem);
}

function findingEmount() {
    if (listofItems.length === 0) {
        BalanceAmount.textContent = `$${0}.00`;
        incomeAmount.textContent = `$${0}.00`;
        expensesAmount.textContent = `$${0}.00`;
    } else if (listofItems.length === 1) {
        if (listofItems[0].money < 0) {
            expensesAmount.textContent = `$${listofItems[0].money}.00`;

        } else {
            incomeAmount.textContent = `$${listofItems[0].money}.00`;
        }
        BalanceAmount.textContent = `$${listofItems[0].money}.00`;


    } else {
        let amount = listofItems.map((transations) => Number(transations.money));
        let balance = amount.reduce((acc, cur) => acc + cur).toFixed(2);
        let filterarrayincome = amount.filter((item) => item > 0);
        if (filterarrayincome.length === 0) {
            incomeAmount.textContent = `$${0}.00`;
        } else if (filterarrayincome.length === 1) {
            incomeAmount.textContent = `$${filterarrayincome[0]}`;
        } else {
            let income = amount.filter((item) => item > 0).reduce((acc, cur) => acc + cur).toFixed(2);
            incomeAmount.textContent = `$${income}`;
        }

        let filterarray = amount.filter((item) => item < 0);
        if (filterarray.length === 0) {
            expensesAmount.textContent = `$${0}.00`;
        } else if (filterarray.length === 1) {
            expensesAmount.textContent = `$${-filterarray[0]}.00`;
        } else {
            console.log(filterarray)
            let expenses = filterarray.reduce((acc, cur) => acc + cur);
            expensesAmount.textContent = `$${-expenses}.00`;
        }
        BalanceAmount.textContent = `$${balance}`;
    }
}
findingEmount();

buttonElement.addEventListener("click", function() {
    let amount = parseInt(itemAmount.value);
    listid = listid + 1
    let todo = {
        name: itemName.value,
        money: itemAmount.value,
        id: listid,
    };
    listofItems.push(todo);
    localStorage.setItem("storedElement9", JSON.stringify(listofItems));

    createElementstoEnter(todo);
    itemName.value = "";
    itemAmount.value = "";
});