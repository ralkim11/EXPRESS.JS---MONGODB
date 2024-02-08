import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Function to fetch contacts from local storage, apply sorting and filtering
export async function getContacts(query) {
  // Simulate a network request with a specific key
  await fakeNetwork(`getContacts:${query}`);

  // Retrieve contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Initialize contacts as an empty array if not present
  if (!contacts) contacts = [];

  // If a query is provided, filter contacts using match-sorter based on first and last names
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  
  // Sort contacts by last name and createdAt timestamp
  return contacts.sort(sortBy("last", "createdAt"));
}

// Function to create a new contact
export async function createContact() {
  // Simulate a network request
  await fakeNetwork();

  // Generate a random id for the new contact
  let id = Math.random().toString(36).substring(2, 9);

  // Create a new contact object with the generated id and current timestamp
  let contact = { id, createdAt: Date.now() };

  // Get the existing contacts from local storage
  let contacts = await getContacts();

  // Add the new contact to the beginning of the contacts array
  contacts.unshift(contact);

  // Update the contacts in local storage
  await set(contacts);

  // Return the newly created contact
  return contact;
}

// Function to get a specific contact by id
export async function getContact(id) {
  // Simulate a network request for a specific contact
  await fakeNetwork(`contact:${id}`);

  // Get contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find the contact with the specified id
  let contact = contacts.find((contact) => contact.id === id);

  // Return the contact or null if not found
  return contact ?? null;
}

// Function to update a contact with the given id and updates
export async function updateContact(id, updates) {
  // Simulate a network request
  await fakeNetwork();

  // Get contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find the contact with the specified id
  let contact = contacts.find((contact) => contact.id === id);

  // Throw an error if the contact is not found
  if (!contact) throw new Error("No contact found for", id);

  // Update the contact with the provided updates
  Object.assign(contact, updates);

  // Update the contacts in local storage
  await set(contacts);

  // Return the updated contact
  return contact;
}

// Function to delete a contact with the given id
export async function deleteContact(id) {
  // Get contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find the index of the contact with the specified id
  let index = contacts.findIndex((contact) => contact.id === id);

  // Check if the contact with the specified id exists
  if (index > -1) {
    // Remove the contact at the found index
    contacts.splice(index, 1);

    // Update the contacts in local storage
    await set(contacts);

    // Return true indicating successful deletion
    return true;
  }

  // Return false indicating the contact was not found
  return false;
}

// Helper function to set contacts in local storage
function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// Simulate a cache to avoid slowing down previously seen requests
let fakeCache = {};

// Simulate a network request with optional caching
async function fakeNetwork(key) {
  // Clear the fakeCache when key is not provided
  if (!key) {
    fakeCache = {};
  }

  // Return immediately if the request has already been cached
  if (fakeCache[key]) {
    return;
  }

  // Mark the request as cached
  fakeCache[key] = true;

  // Simulate a network delay with a random timeout
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}