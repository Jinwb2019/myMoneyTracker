import { TransactionManager } from "./transactions.js";

// for category
const CATEGORY_OPTIONS = {
  Income: ["salary", "gift", "other"],
  Expense: ["food", "shopping", "entertainment", "restaurant", "other"]
};


export const UI = {
  
  // load all content (UI)
  render(transactions) {
    this.renderForm();
    this.renderSummary(transactions);
    this.renderTable(transactions);
  },

  renderForm() {
    const container = document.getElementById("form-container");
    container.innerHTML = `
      <form id="transaction-form">
        <input type="hidden" id="transaction-id" />
        
        <input type="number" id="amount" placeholder="Amount" required />
        
        <select id="type" required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        
        <select id="category" required>
          <option value="">Select Category</option>
        </select>
        
        <input type="date" id="date" required />
        
        <input type="text" id="description" placeholder="Description (optional)" />
        
        <button type="submit">Save Transaction</button>
      </form>
    `;

    // options of 'category' vary depending on 'type'
    document.getElementById("type").addEventListener("change", (e) => {
      const selectedType = e.target.value;
      UI.populateCategories(selectedType);
    });

  },

  // statistics calculated here
  renderSummary(transactions) {
    const income = transactions
      .filter(t => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    document.getElementById("summary").innerHTML = `
      <div class="summary">
        <p><strong>Total Income:</strong> $${income.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> $${expense.toFixed(2)}</p>
        <p><strong>Net Balance:</strong> $${balance.toFixed(2)}</p>
      </div>
    `;
  },

  renderTable(transactions) {
    const container = document.getElementById("transaction-list");

    if (transactions.length === 0) {
      container.innerHTML = "<p>No transactions yet.</p>";
      return;
    }

    // .sort(...) : sort from current to past (new to old)
    // .map(...) : traverse all elements of array (all transactions)
    // .join(...) : join as a html string
    let rows = transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(t => `
        <tr>
          <td data-label="Amount" class="${t.type === "Income" ? "income" : "expense"}">
            $${t.amount.toFixed(2)}
          </td>
          <td data-label="Type">${t.type}</td>
          <td data-label="Category">${t.category}</td>
          <td data-label="Date">${t.date}</td>
          <td data-label="Description">${t.description || ""}</td>
          <td data-label="Actions">
            <button class="btn-edit" data-id="${t.id}">Edit</button>
            <button class="btn-delete" data-id="${t.id}">Delete</button>
          </td>
        </tr>
      `).join("");

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>AMOUNT</th>
            <th>TYPE</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  },

  fillForm(t) {
    UI.populateCategories(t.type);
    document.getElementById("transaction-id").value = t.id;
    document.getElementById("amount").value = t.amount;
    document.getElementById("type").value = t.type;
    document.getElementById("category").value = t.category;
    document.getElementById("date").value = t.date;
    document.getElementById("description").value = t.description;
  },

  resetForm() {
    document.getElementById("transaction-form").reset();
    document.getElementById("transaction-id").value = "";
  },

  // function: options of 'category' vary depending on 'type'
  populateCategories(type) {
    const select = document.getElementById("category");
    select.innerHTML = '<option value="">Select Category</option>';

    if (CATEGORY_OPTIONS[type]) {
      CATEGORY_OPTIONS[type].forEach(cate => {
        const option = document.createElement("option");
        option.value = cate;
        option.textContent = cate;
        select.appendChild(option);
      });
    }
  },
};
