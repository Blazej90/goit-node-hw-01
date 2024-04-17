const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action: list, get, add, remove")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!id) {
        console.error("Please provide ID for get action.");
        return;
      }
      getContactById(parseInt(id));
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error("Please provide name, email, and phone for add action.");
        return;
      }
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id) {
        console.error("Please provide ID for remove action.");
        return;
      }
      removeContact(parseInt(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action, id, name, email, phone });
