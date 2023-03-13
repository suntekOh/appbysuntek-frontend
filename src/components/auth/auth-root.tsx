import { useState } from 'react';
import {
    Outlet
} from "react-router-dom";

export async function action() {
    return null;
}

export async function loader({ }) {
    return null;
}


export default function AuthRoot({ }) {
/*    const [AuthType, setAuthType] = useState(AuthProcessType.Login);*/

    //const content =
    //    AuthType == AuthProcessType.ForgotPassword ? <ForgotPassword></ForgotPassword> :
    //        AuthType == AuthProcessType.SignUp ? <Signup></Signup> :
    //            <Login
    //                handleAuthTypeChange={(authType) => setAuthType(authType)}
    //                handleUserAuthenticated={handleUserAuthenticated}
    //                handleRoutingType={handleRoutingType}
    //            >
    //            </Login>;

/*    return content;*/

    return (
        <>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
    

}