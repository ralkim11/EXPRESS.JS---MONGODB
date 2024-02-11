import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

// Asynchronous function named 'action' that creates a new contact and redirects to its edit page
/*export async function action() {
  // Creating a new contact and retrieving its details
  const contact = await createContact();
  
  // Redirecting to the edit page of the newly created contact
  return redirect(`/contacts/${contact.id}/edit`);
}*/

export async function action() {
  // Creating a new contact and retrieving its details
  const contact = await createContact();

  // Check if the 'contact' object exists and has an 'id' property
  if (contact && contact.id) {
    // Redirecting to the edit page of the newly created contact
    return redirect(`/contacts/${contact.id}/edit`);
  } else {
    // Handle the case where 'contact' is null or does not have an 'id' property
    console.error("Error: Contact object is null or missing 'id' property");
    // You may choose to handle this error differently, such as redirecting to an error page
    // For now, let's redirect back to the root page
    return redirect("/");
  }
}

// Asynchronous function named 'loader' that loads data before rendering the component
export async function loader({ request }) {
  // Extracting the query parameter 'q' from the request URL
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  
  // Retrieving contacts based on the query
  const contacts = await getContacts(q);
  
  // Returning contacts and the query parameter
  return { contacts, q };
}

// React functional component named 'Root'
export default function Root() {
  // Extracting 'contacts' and 'q' from the data loaded by the route
  const { contacts, q } = useLoaderData();

  // Accessing navigation-related functions and state from 'react-router-dom'
  const navigation = useNavigation();
  const submit = useSubmit();

  // Determining if a search is in progress
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  // Effect hook to update the search input value when 'q' changes
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // JSX for rendering the Root component

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact._id}>
                  <NavLink to={`contacts/${contact._id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }
        >
          <Outlet />
        </div>
      </>
    );
  }