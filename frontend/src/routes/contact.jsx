import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

// Asynchronous function named 'action' that handles the update of a contact's favorite status
export async function action({ request, params }) {
    // Extracting form data from the request
    let formData = await request.formData();
  
    // Updating the contact's favorite status based on the submitted form data
    return updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
  }
  
  // Asynchronous function named 'loader' that retrieves contact data based on the provided contactId
  export async function loader({ params }) {
    // Retrieving the contact data using the 'getContact' function
    const contact = await getContact(params.contactId);
  
    // If no contact is found, throw a 404 Not Found response
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  
    // Returning the contact data
    return { contact };
  }
  
  // React functional component named 'Contact'
  export default function Contact() {
    // Extracting 'contact' from the data loaded by the route
    const { contact } = useLoaderData();
  
    // JSX for displaying contact information and options
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank" rel="noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// React functional component named 'Favorite' for managing favorite status
function Favorite({ contact }) {
    // Accessing the 'fetcher' and 'useFetcher' from 'react-router-dom'
    const fetcher = useFetcher();
  
    // Retrieving the favorite status from the contact data
    let favorite = contact.favorite;
  
    // Checking if the 'fetcher' has form data and updating 'favorite' accordingly
    if (fetcher.formData) {
      favorite = fetcher.formData.get("favorite") === "true";
    }
  
    // JSX for displaying and toggling favorite status
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}