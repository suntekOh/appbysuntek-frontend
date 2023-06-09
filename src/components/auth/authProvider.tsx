import React from 'react';
import {
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { AuthenticatedUser } from '../../models/user-models';
import { flushSync } from 'react-dom';
import { IAuthInfoFromLocalService } from '../../services/auth-info-from-local-service';
import { Console, debug } from 'console';

export interface AuthContextType {
    user: AuthenticatedUser;
    signin: (user: AuthenticatedUser, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ authInfoFromLocalService }: { authInfoFromLocalService: IAuthInfoFromLocalService }): JSX.Element {
    const [user, setUser] = React.useState<any>(null);
    const signin = (signedInUser: AuthenticatedUser, callback: VoidFunction) => {
        flushSync(() => {
            setUser({
                userName: signedInUser.userName
            });
        })
        authInfoFromLocalService.set(signedInUser.userName);
        callback();
    };

    const signout = (callback: VoidFunction) => {
        flushSync(() => {
            setUser(null);
        });
        authInfoFromLocalService.clear();
        callback();
    }
    
    const value = { user, signin, signout };


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
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        // Redirect them to the /signin page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    return children;
}

export function isLoggedIn(): boolean {
    const auth = useAuth();
    return auth?.user != null;
}

export function getUserNameFromAuth(): string {
    const auth = useAuth();
    return auth?.user?.userName ?? "";
}


function AuthStatus() {
    const auth = useAuth();
    const navigate = useNavigate();

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

