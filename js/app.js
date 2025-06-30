import { Storage } from "./storage.js";
import { UI } from "./ui.js";
import { TransactionManager } from "./transactions.js";

const transactions = Storage.load() || [];

TransactionManager.init(transactions);
UI.render(transactions);

// table control: delete and edit
// check in transactions.js
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-edit")) {
    const id = e.target.dataset.id;
    TransactionManager.edit(id);
  }
  if (e.target.matches(".btn-delete")) {
    const id = e.target.dataset.id;
    TransactionManager.delete(id);
  }
});

// search/filter by date
document.getElementById("filter-date").addEventListener("change", (e) => {
  const selectedDate = e.target.value;
  if (selectedDate) {
    const filtered = TransactionManager.transactions.filter(
      t => t.date === selectedDate
    );
    UI.render(filtered);
  }
});

document.getElementById("clear-filter").addEventListener("click", () => {
  document.getElementById("filter-date").value = "";
  UI.render(TransactionManager.transactions);
});
