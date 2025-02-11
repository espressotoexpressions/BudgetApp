//populate expenses
// const expenseList = [
//     { id: 1, name: "Lunch", amount: 10 },
//     { id: 2, name: "Bus Ticket", amount: 2.5 }
//   ];

//populate income
// const incomeList = [
//     { id: 1, amount: 1000 },
//     { id: 2, amount: 250.12 }
//   ];


function addExpense(expenseName,amt){
    let expenseList=retrieveExpenses();
       if (expenseList !=null){
    expenseList.push({id: expenseList.length+1,name :expenseName,amount: amt});
        
       }
       else 
       {
            expenseList=[];
           expenseList.push({id:1,name :expenseName,amount: amt});
       }
       localStorage.setItem('Expenses',JSON.stringify(expenseList));
}
function deleteExpense(idToDelete){
    let expenseList=retrieveExpenses()
    let index =expenseList.findIndex(expense=>expense.id==idToDelete);// find the index of the item wewant to delete
    console.log("INDEX TO DELETE" +index);
    expenseList.splice(index, 1); //remove it from the list based on index
    console.log(expenseList);
    localStorage.setItem('Expenses', JSON.stringify(expenseList));

    
}
function updateExpense(isToUpdate,newExpenseName, newAmt){
    let expenseList=retrieveExpenses()
    let index =expenseList.findIndex(expense=>expense.id==isToUpdate);// find the index of the item wewant to delete
    console.log("INDEX TO UPDATE" +index);
    
    if (index !== -1) { // Check if the item exists
        expenseList[index].name = newExpenseName; // Update name
        expenseList[index].amount = Number(newAmt); // Update amount
        console.log("Updated Expenses:", expenseList);
    } else {
        console.log("Expense not found!");
    }
    localStorage.setItem('Expenses', JSON.stringify(expenseList));

 
}


function retrieveExpenses(){
   
    let expenseData = localStorage.getItem('Expenses');
    console.log("EXPENSE DATA" +JSON.parse(expenseData));
    return JSON.parse(expenseData);

}

function addIncome(amt){
    let incomeList=retrieveIncome();
    if (incomeList !=null){
        incomeList.push({id:incomeList.length+1,amount:amt});
    }
    else{
        incomeList=[];
        incomeList.push({id:1,amount:amt});
    }
    console.log (incomeList);
    localStorage.setItem('Income',JSON.stringify(incomeList));
}

function retrieveIncome(){
let incomeData = localStorage.getItem('Income');
// console.log("RETRIEVE INCOME"+ JSON.parse(incomeData));
return JSON.parse(incomeData);
  
}

function deleteIncome(idToDelete){
    let incomeList=retrieveIncome()
    let index =incomeList.findIndex(income=>income.id==idToDelete);// find the index of the item wewant to delete
    console.log("INDEX TO DELETE" +index);
    incomeList.splice(index, 1); //remove it from the list based on index
    console.log(incomeList);
    localStorage.setItem('Income', JSON.stringify(incomeList));

 
}


function getBudgetLeft()
{
    let incomeData = retrieveIncome();
    let totalIncome=0;
    let totalExpense=0;
    if (incomeData !=null)
        {
            incomeData.map(income =>{
                console.log("ID" +income.id);
                console.log("AMT"+income.amount);
                totalIncome += income.amount;
            })
            console.log("TOTAL"+ totalIncome);
  
            
        }
              
        let expenseData = retrieveExpenses();
        if(expenseData !=null)
            {
                expenseData.map(expense =>{
                    console.log("ID" +expense.id);
                    console.log("AMT"+expense.amount);
                    totalExpense += expense.amount;
                })
                console.log("TOTAL: "+ totalIncome);
                console.log("EXP: "+totalExpense);
            }

    
        // console.log("BUDGETLEFT" + (totalIncome-totalExpense));
        return totalIncome-totalExpense;
}





export{addExpense, deleteExpense,updateExpense,retrieveExpenses,addIncome,deleteIncome,retrieveIncome,getBudgetLeft}