cimport { NavigateFunction, useNavigate, useRouteError } from "react-router-dom";
import { IAuthInfoFromLocalService } from "../../services/auth-info-from-local-service";
import { useAuth, AuthContextType } from "../auth/authProvider";

export default function RouteErrorBoundary({ authInfoFromLocalService }: { authInfoFromLocalService: IAuthInfoFromLocalService }) {
    const error = useRouteError() as any;
    console.log(error.message);
    const auth = useAuth();
    const navigate = useNavigate();

    function errorHandler(
        e: React.FormEvent<HTMLFormElement>,
        auth?: AuthContextType,
        navigate?: NavigateFunction
    ) {
        e.preventDefault();

        const signedInUserName = authInfoFromLocalService.getSignedInUserName();
        if (auth && navigate) {
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
    }

    return <ErrorLayout error={error} auth={auth} navigate={navigate} errorHandler={errorHandler} />
}

export function FallBackErrorBoundary({ error, resetErrorBoundary } : { error: any, resetErrorBoundary: any }) {
    function errorHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href='/'
    }

    return <ErrorLayout error={error} errorHandler={errorHandler} />
}


function ErrorLayout({ error, auth, navigate, errorHandler }: { error: any, auth?: AuthContextType, navigate?: NavigateFunction, errorHandler: (e: React.FormEvent<HTMLFormElement>, auth?: AuthContextType, navigate?: NavigateFunction) => void; }): JSX.Element {
    return (
        <div id="error-page" className="px-2">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <form onSubmit={(e) => errorHandler(e, auth, navigate)}>
                <button className="btn btn-link custom-button-width" type="submit">Home</button>
            </form>

        </div>
    );
}
