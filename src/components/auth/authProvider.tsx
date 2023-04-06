import React, { useEffect, useLayoutEffect } from 'react';
import {
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { SignedInUser } from '../../models/user-models';
import { flushSync } from 'react-dom';
import { IAuthInfoFromLocalService } from '../../services/auth-info-from-local-service';

interface AuthContextType {
    user: SignedInUser;
    signin: (user: SignedInUser, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ authInfoFromLocalService }: { authInfoFromLocalService: IAuthInfoFromLocalService }): JSX.Element {
    let [user, setUser] = React.useState<any>(null);
    let signin = (signedInUser: SignedInUser, callback: VoidFunction) => {
        flushSync(() => {
            setUser({
                userName: signedInUser.userName
            });
        })
        authInfoFromLocalService.set(signedInUser.userName);
        callback();
    };

    let signout = (callback: VoidFunction) => {
        flushSync(() => {
            setUser(null);
        });
        authInfoFromLocalService.clear();
        callback();
    }
    
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
    return auth?.user?.userName ?? "";
}


function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user.userName}!{" "}
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

