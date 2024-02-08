import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
     // Asynchronously delete the contact using the 'deleteContact' function with the specified contactId
    await deleteContact(params.contactId);

    // After deleting the contact, redirect to the root path "/"
    return redirect("/");
}