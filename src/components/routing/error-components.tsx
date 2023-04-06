import { Link, Navigate, useNavigate, useRouteError } from "react-router-dom";
import { IAuthInfoFromLocalService } from "../../services/auth-info-from-local-service";
import { useAuth } from "../auth/authProvider";

export default function RouteErrorPage({ authInfoFromLocalService }: { authInfoFromLocalService: IAuthInfoFromLocalService }) {
    const error = useRouteError() as any;
    console.log(error.message);
    const auth = useAuth();
    let navigate = useNavigate();

    function handleRedirectToHome(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const signedInUserName = authInfoFromLocalService.getSignedInUserName();
        if (signedInUserName) {
            auth.signin(
                { userName: signedInUserName },
                () => {
                    navigate("/root", { replace: true });
                }
            );
        } else {
            navigate("/", { replace: true });
        }
    }

    return (
        <div id="error-page" className="px-2">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <form>
            </form>
            <form onSubmit={handleRedirectToHome}>
                <button className="btn btn-link custom-button-width" type="submit">Home</button>
            </form>

        </div>
    );
}