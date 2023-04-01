import React from 'react';
import { fakeAuthProvider } from './fakeAuthProvider'
import {
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { SignedInUser } from '../../models/user-models';
import { flushSync } from 'react-dom';

interface AuthContextType {
    user: SignedInUser;
    signin: (user: SignedInUser | undefined, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(): JSX.Element {
    let [user, setUser] = React.useState<any>(null);

    let signin = (signedInUser: SignedInUser | undefined, callback: VoidFunction) => {
        if (signedInUser) {
            return fakeAuthProvider.signin(() => {
                flushSync(() => {
                    setUser({
                        userId: signedInUser.userId,
                        authToken: signedInUser.authToken
                    });
                });
                callback();
            });
        }
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            flushSync(() => {
                setUser(null);
            });
            callback();
        });
    };

    let value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>
            <Outlet/>
        </AuthContext.Provider>
        ) 
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    console.log(auth)
    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}

export function isLoggedIn(): boolean {
    let auth = useAuth();
    return auth?.user != null;
}

export function loggedInUser(): string {
    let auth = useAuth();
    return auth?.user?.userId ?? "";
}


function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user.userId}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

