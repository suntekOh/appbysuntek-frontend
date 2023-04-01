import { Navigate, useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <div id="error-page" className="px-2">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}