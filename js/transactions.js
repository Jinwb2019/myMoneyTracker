import { Storage } from "./storage.js";
import { UI } from "./ui.js";

// basic function manager:
// add new transaction
// edit
// delete

export const TransactionManager = {
  transactions: [],

  init(initialData) {
    this.transactions = initialData;
    this.bindForm();
  },

  // binding action
  bindForm() {
    document.addEventListener("submit", (e) => {
      if (e.target.id === "transaction-form") {
        e.preventDefault(); // prevent form auto refresh page (default)
        this.addOrUpdate();
      }
    });
  },

  addOrUpdate() {
    const id = document.getElementById("transaction-id").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    // check: input amount 
    if (isNaN(amount)) {
      alert("Amount must be a valid number");
      return;
    }
    
    // Update: Editing existing transaction
    if (id) {
      const index = this.transactions.findIndex(t => t.id === id);
      this.transactions[index] = { id, amount, type, category, date, description };
    } else {
      const newTransaction = {
        id: Date.now().toString(),
        amount,
        type,
        category,
        date,
        description
      };
      this.transactions.push(newTransaction);
    }

    Storage.save(this.transactions);
    UI.render(this.transactions);
    UI.resetForm();
  },

  // !!
  delete(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    Storage.save(this.transactions);
    UI.render(this.transactions);
  },

  // !!!!!!!!!
  edit(id) {
    const t = this.transactions.find(t => t.id === id);
    if (t) {
      UI.fillForm(t);
    }
  }
};

// Action Discription: Edit
// Click edit, then all data shows in submission form, then edit and save again
// To be done: this process can be changed (i.e. with Modal)