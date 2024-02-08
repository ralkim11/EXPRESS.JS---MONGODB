import { useRouteError } from "react-router-dom";

//Component to display an error page
export default function ErrorPage() {
//Using the useRouteError hook to get information about the route error
  const error = useRouteError();

//Logging the error to the console
  console.error(error);

//Rendering the error page
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}