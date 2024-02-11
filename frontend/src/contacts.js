import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from "axios";
import qs from "qs";

export async function getContacts(query) {
    await fakeNetwork(`getContacts:${query}`);
    try {
        let contacts = await axios.get("http://localhost:3000/contact/all").then(
            (response) => {
                return response.data.contacts;
            }
        );
        if (!contacts) contacts = [];
        if (query) {
            contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
        }
        return contacts.sort(sortBy("last", "createdAt"));
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
}

export async function createContact() {
    await fakeNetwork();
    try {
        let contactDate = { createdAt: Date.now() };
        const data = qs.stringify(contactDate);

        let contact = await axios
            .post("http://localhost:3000/contact/create", data)
            .then((response) => {
                var person = {
                    id: response.data.contact._id,
                };
                return person;
            });
        return contact;
    } catch (error) {
        console.error("Error creating contact:", error);
        return null;
    }
}

export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    try {
        let contact = await axios
            .get(`http://localhost:3000/contact/find/${id}`)
            .then((response) => {
                return response.data.contact[0];
            });
        return contact ?? null;
    } catch (error) {
        console.error("Error fetching contact:", error);
        return null;
    }
}

export async function updateContact(id, updates) {
    await fakeNetwork();
    try {
        const data = qs.stringify(updates);
        const contact = await axios.patch(
            `http://localhost:3000/contact/edit/${id}`,
            data
        );
        return contact;
    } catch (error) {
        console.error("Error updating contact:", error);
        return null;
    }
}

export async function deleteContact(id) {
    try {
        await axios.delete(`http://localhost:3000/contact/delete/${id}`);
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
}

let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 800);
    });
}
