import shortid from "shortid";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const { argv } = yargs(hideBin(process.argv));
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const added = await addContact(shortid.generate(), name, email, phone);
      if (added.contact) {
        console.log(added.status);
        console.table(added.contact);
      } else {
        console.log(added.status);
      }

      break;

    case "remove":
      const removed = await removeContact(id);
      console.log(removed);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
