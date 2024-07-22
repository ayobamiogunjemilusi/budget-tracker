// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transaction-form');
  const transactionType = document.getElementById('transaction-type');
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const balanceElement = document.getElementById('balance');
  const transactionsList = document.getElementById('transactions-list');
  
  let balance = 0;
  const transactions = [];
  
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const type = transactionType.value;
      const amount = parseFloat(amountInput.value);
      const description = descriptionInput.value || 'No description';
      
      if (type === '' || isNaN(amount) || amount <= 0) {
          alert('Please provide valid inputs.');
          return;
      }
      
      if (type === 'expense' && amount > balance) {
          alert('Insufficient funds!');
          return;
      }
      
      if (type === 'income') {
          balance += amount;
      } else if (type === 'expense') {
          balance -= amount;
      }
      
      transactions.push({ type, amount, description });
      updateUI();
      
      form.reset();
  });
  
  function updateUI() {
      balanceElement.textContent = `$${balance.toFixed(2)}`;
      
      transactionsList.innerHTML = '';
      transactions.forEach(transaction => {
          const li = document.createElement('li');
          li.textContent = `${transaction.type === 'income' ? 'Income' : 'Expense'}: $${transaction.amount.toFixed(2)} - ${transaction.description}`;
          transactionsList.appendChild(li);
      });
  }
});
