function handleFormSubmit(event) {
  event.preventDefault();

  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const expense = {
    amount,
    description,
    category
  };

  // If there's an editKey, update the existing expense
  if (editKey) {
    localStorage.setItem(editKey, JSON.stringify(expense));
    const expenseItem = document.getElementById(editKey);
    expenseItem.querySelector('span').textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
    editKey = null; // Reset the editKey
  } else {
    // Otherwise, add a new expense
    const expenseKey = Math.random().toString(36).substring(2, 15);
    localStorage.setItem(expenseKey, JSON.stringify(expense));
    showExpense(expense, expenseKey);
  }

  // Clear the form fields
  event.target.reset();
}

window.addEventListener("DOMContentLoaded", () => {
  Object.keys(localStorage).forEach((expenseKey) => {
    const expense = JSON.parse(localStorage.getItem(expenseKey));
    showExpense(expense, expenseKey);
  });
});

function showExpense(expense, expenseKey) {
  const ul = document.querySelector("ul");

  const li = document.createElement('li');
  li.id = expenseKey; // Assign a unique ID to the li element
  li.classList.add('expense-item');
  li.innerHTML = `
    <span>${expense.amount} - ${expense.description} - ${expense.category}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  ul.appendChild(li);

  const editBtn = li.querySelector('.edit-btn');
  const deleteBtn = li.querySelector('.delete-btn');

  editBtn.addEventListener('click', () => {
    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.getElementById('category');

    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categorySelect.value = expense.category;

    editKey = expenseKey; // Store the expenseKey for updating
  });

  deleteBtn.addEventListener('click', () => {
    localStorage.removeItem(expenseKey);
    ul.removeChild(li);
  });
}