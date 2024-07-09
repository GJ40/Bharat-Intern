let expenses = [];

let totalAmount = 0;

const categorySelect = document.getElementById("category_select");
const amountInput = document.getElementById("amount_input");
const infoInput = document.getElementById("info");
const dateInput = document.getElementById("date_input");
const addBtn = document.getElementById("add-btn");
const budgetTableBody = document.getElementById("budget-table-body");
const totalAmountCell = document.getElementById("total-amount");

addBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const info = infoInput.value;
    const date = dateInput.value;

    if(category === ''){
        alert("Please Select Category.");
        return;
    }
    if(isNaN(amount) || amount < 0 ){
        alert("Please Enter valid Amount.");
        return;
    }
    if(info === ''){
        alert("Please Enter Info.");
        return;
    }
    if(date === ''){
        alert("Please select date.");
        return;
    }
    expenses.push({category, amount, info, date});
    if(category === 'income'){
        totalAmount += amount;
    }
    if(category === 'expense'){
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount;

    const newRow = budgetTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const delCell = newRow.insertCell();

    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.classList.add('del-btn');
    delBtn.addEventListener("click", () => {
        expenses.splice(expenses.indexOf(expense), 1);
        if(category === 'income'){
            totalAmount -= amount;
        }
        if(category === 'expense'){
            totalAmount += amount;
        }
        totalAmountCell.textContent = totalAmount;
        budgetTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;
    delCell.appendChild(delBtn);
});