import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import { updateContact } from "../contacts";

// Asynchronous function named 'action' that handles the form submission and contact update
export async function action({ request, params }) {
    // Extracting form data from the request
    const formData = await request.formData();

    // Converting form data into an object containing updates for the contact
    const updates = Object.fromEntries(formData);

    // Asynchronously updating the contact using the 'updateContact' function
    await updateContact(params.contactId, updates);

    // After updating the contact, redirect to the contact details page
    return redirect(`/contacts/${params.contactId}`);
  }

  // React functional component named 'EditContact'
export default function EditContact() {
    // Extracting 'contact' from the data loaded by the route
  const { contact } = useLoaderData();

   // Accessing the 'navigate' function from the 'react-router-dom' library
  const navigate = useNavigate();

// JSX for the contact editing form
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
         type="button"
          onClick={() => {
            navigate(-1);
          }}
          >
            Cancel
            </button>
      </p>
    </Form>
  );
}