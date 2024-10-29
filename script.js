let editKey = null; // Global variable to track editing

function handleFormSubmit(event) {
  event.preventDefault();

  const expense = {
    amount: document.getElementById('amount').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
  };

  if (editKey) {
    updateExpense(expense);
  } else {
    addExpense(expense);
  }

  event.target.reset(); // Clear form fields
}

function addExpense(expense) {
  const expenseKey = generateKey();
  localStorage.setItem(expenseKey, JSON.stringify(expense));
  displayExpense(expense, expenseKey);
}

function updateExpense(expense) {
  localStorage.setItem(editKey, JSON.stringify(expense));
  const expenseItem = document.getElementById(editKey);
  expenseItem.querySelector('span').textContent = formatExpense(expense);
  editKey = null; // Reset after updating
}

function displayExpense(expense, expenseKey) {
  const li = document.createElement('li');
  li.id = expenseKey;
  li.innerHTML = `
    <span>${formatExpense(expense)}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
  document.querySelector("ul").appendChild(li);
  setupButtons(li, expenseKey, expense);
}

function setupButtons(li, expenseKey, expense) {
  li.querySelector('.edit-btn').addEventListener('click', () => {
    document.getElementById('amount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;
    editKey = expenseKey; // Set editKey for updating
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    localStorage.removeItem(expenseKey);
    li.remove(); // Remove from UI
  });
}

function formatExpense(expense) {
  return `${expense.amount} - ${expense.description} - ${expense.category}`;
}

function generateKey() {
  return Math.random().toString(36).substring(2, 15); // Unique key generation
}

window.addEventListener("DOMContentLoaded", () => {
  Object.keys(localStorage).forEach((expenseKey) => {
    const expense = JSON.parse(localStorage.getItem(expenseKey));
    displayExpense(expense, expenseKey);
  });
});

// Attach handleFormSubmit to the form's submit event
document.getElementById('expense-form').addEventListener('submit', handleFormSubmit);
