import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (e) {
    console.log(e.message);
    return;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);
  if (!contact) return `Сontact with ID: ${contactId} not found`;
  return contact;
}

async function removeContact(contactId) {
  let isContactIdMatch = false;
  const contacts = await listContacts();
  const list = contacts.filter(({ id }) => {
    if (contactId === id) {
      isContactIdMatch = true;
      return false;
    } else {
      return true;
    }
  });

  if (!isContactIdMatch) return `Сontact with ID: ${contactId} not found`;

  try {
    await fs.writeFile(contactsPath, JSON.stringify(list));
    return `Сontact with ID: ${contactId} was removed`;
  } catch (e) {
    console.log(e.message);
    return;
  }
}

async function addContact(id, name, email, phone) {
  if (!id || !name || !email || !phone) return { status: "missing parameters" };
  const contacts = await listContacts();
  const contact = { id, name, email, phone };
  try {
    await fs.writeFile(contactsPath, JSON.stringify([...contacts, contact]));
    return { status: "Contact was added", contact };
  } catch (e) {
    console.log(e.message);
    return;
  }
}

export { listContacts, getContactById, removeContact, addContact };
