import {
  addExpense,
  deleteExpense,
  updateExpense,
  retrieveExpenses,
  addIncome,
  deleteIncome,
  retrieveIncome,
  getBudgetLeft,
} from "./localStorage.js";
let expenseItemSection = document.getElementById("expenseItemSection");
let incomeItemSection = document.getElementById("incomeItemSection");
let remainingBudget = document.getElementById("remainingBudget");
let expenseNameTxt = document.getElementById("expenseName");
let expenseAmtTxt = document.getElementById("expenseAmt");
let addExpenseBtn = document.getElementById("addExpenseBtn");
let incomeAmtTxt = document.getElementById("incomeAmt");
let addIncomeBtn = document.getElementById("addIncomeBtn");
let expenseErrorMsg = document.getElementById("expenseErrorMsg");
let incomeErrorMsg=document.getElementById("incomeErrorMsg");

//to populate expense list
function populateExpenseSection() {
  expenseItemSection.innerText = ""; //resets the section to avoid duplicate entries
  let expenseData = retrieveExpenses();
    if (expenseData !=null)
        {
        expenseData.map((expense) => {
            console.log("ID" + expense.id);
            console.log("AMT" + expense.amount);
        
            const expenseSectionItem = document.createElement("div"); // favorite item  create
            expenseSectionItem.classList.add(
              "flex",
              "items-center",
              "p-2",
              "text-gray-900",
              "rounded-lg",
              "dark:text-white",
              "hover:bg-amber-100",
              "dark:hover:bg-amber-700",
              "group"
            );
        
            // Create a <span> for the text to separate it from the icon
            const expenseText = document.createElement("input");
            expenseText.value = `${expense.name}`;
            expenseSectionItem.appendChild(expenseText); // Add the text to the <li>
        
            //create another <span> for the amount
            const expenseAmount = document.createElement("input");
            expenseAmount.value = `${expense.amount}`;
            expenseSectionItem.appendChild(expenseAmount); // Add the amount to the <li>
        
            // create an updatebutton
            const updateExpenseBtn = document.createElement("button");
            updateExpenseBtn.innerText = "Update";
            expenseSectionItem.appendChild(updateExpenseBtn);
        
            updateExpenseBtn.addEventListener('click',()=>{
                updateExpense( expense.id, expenseText.value,expenseAmount.value);
                populateExpenseSection();
                displayRemainingBudget();
            })
        
            //create a delete button
            const removeExpenseBtn = document.createElement("button");
            removeExpenseBtn.innerText = "Delete";
            expenseSectionItem.appendChild(removeExpenseBtn);
        
            removeExpenseBtn.addEventListener("click", () => {
              deleteExpense(expense.id);
              populateExpenseSection();
              displayRemainingBudget();
            });
        
            // Append the <li> to the parent container
            expenseItemSection.appendChild(expenseSectionItem);
            console.log(expenseSectionItem);
          }); //end of mapping from expensesdata from local storage
    }// end of if json data return is null/ expense list is null
    else{
        const emptyExpenseList=document.createElement('p');
        emptyExpenseList.innerText ="No expenses added yet";
        expenseItemSection.appendChild(emptyExpenseList);
    }
  
}

function populateIncomeSection() {
  incomeItemSection.innerText = "";
  let incomeData = retrieveIncome();

  incomeData.map((income) => {
    const incomeSectionItem = document.createElement("div"); // favorite item  create
    incomeSectionItem.classList.add(
      "flex",
      "items-center",
      "p-2",
      "text-gray-900",
      "rounded-lg",
      "dark:text-white",
      "hover:bg-amber-100",
      "dark:hover:bg-amber-700",
      "group"
    );

    //create another <span> for the amount
    const incomeAmount = document.createElement("span");
    incomeAmount.innerText = `${income.amount}`;
    incomeSectionItem.appendChild(incomeAmount); // Add the amount to the <li>

    //create a delete button
    const removeIncomeBtn = document.createElement("button");
    removeIncomeBtn.innerText = "Delete";
    incomeSectionItem.appendChild(removeIncomeBtn);

    removeIncomeBtn.addEventListener("click", () => {
      deleteIncome(income.id);
      populateIncomeSection();
      displayRemainingBudget();
    });

    // Append the <li> to the parent container
    incomeItemSection.appendChild(incomeSectionItem);
    console.log(incomeItemSection);
  }); //end of mapping from income data from local storage
}

function displayRemainingBudget() {
  remainingBudget.innerText = getBudgetLeft().toFixed(2);
}


addExpenseBtn.addEventListener("click", () => {
    console.log("EXP VAL"+expenseNameTxt.value);
    if (expenseNameTxt.value=="" || expenseAmtTxt.value=="")
        {
            expenseErrorMsg.innerText="ERROR: expense name and amount are required"
        }
    else{
        addExpense(expenseNameTxt.value, Number(expenseAmtTxt.value));
        populateExpenseSection();
        displayRemainingBudget();
    }
});

addIncomeBtn.addEventListener("click", () => {

    if (incomeAmtTxt.value=="")
        {
            incomeErrorMsg.innerText="ERROR: Income amount is required"
        }
    else{
        addIncome(Number(incomeAmtTxt.value));
        populateIncomeSection();
        displayRemainingBudget();
    }

});

populateIncomeSection();
populateExpenseSection();
displayRemainingBudget();