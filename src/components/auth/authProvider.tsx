import React from 'react';
import { fakeAuthProvider } from './fakeAuthProvider'
import {
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { UserDto } from '../../model/userDto';

interface AuthContextType {
    user: any;
    signin: (user: UserDto | undefined, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(): JSX.Element {
    let [user, setUser] = React.useState<any>(null);

    let signin = (userDto: UserDto | undefined, callback: VoidFunction) => {
        if (userDto) {
            return fakeAuthProvider.signin(() => {
                setUser(userDto.userId);
                callback();
            });
        }
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
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

function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
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

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();


    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}