// contacts.js

const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * Funkcja listująca wszystkie kontakty
 */
function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => {
      if (typeof contactId === "number") {
        console.log(c.id, contactId);
        return c.id === contactId;
      } else {
        return c.id.toLowerCase() === contactId.toLowerCase();
      }
    });
    console.log("Contact by ID:", contact);
  });
}

/**
 * Funkcja usuwająca kontakt o podanym ID
 * @param {string|number} contactId - ID kontaktu do usunięcia
 */
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    let contacts = JSON.parse(data);
    contacts = contacts.filter(
      (c) => String(c.id).toLowerCase() !== String(contactId).toLowerCase()
    );
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing contacts file:", err);
        return;
      }
      console.log("Contact removed successfully");
    });
  });
}

/**
 * Funkcja dodająca nowy kontakt
 * @param {string} name - Imię i nazwisko nowego kontaktu
 * @param {string} email - Adres email nowego kontaktu
 * @param {string} phone - Numer telefonu nowego kontaktu
 */
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    let contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing contacts file:", err);
        return;
      }
      console.log("Contact added successfully");
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
