import { Storage } from "./storage.js";
import { UI } from "./ui.js";
import { TransactionManager } from "./transactions.js";

const transactions = Storage.load() || [];

TransactionManager.init(transactions);
UI.render(transactions);

// table control: delete and edit
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
