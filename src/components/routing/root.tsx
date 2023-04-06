import "bootstrap/dist/css/bootstrap.css";
import "../../css/site.css"
import "../../css/layout.css"
import { useRef, useState } from 'react';
import {
    useNavigate,
    Form,
    useLoaderData
} from "react-router-dom";
import { RoutingType } from '../../models/data';
import { isLoggedIn, loggedInUser } from '../auth/authProvider';
import { useErrorBoundary } from "react-error-boundary";
import { createHttpClient } from "../../services/http-client-service";


export async function action() {
    return null;
    //let contact = await createContact();
    //return redirect(`/contacts/${contact.id}/edit`);
}

export function loader(props: { request: any }) {
    return null;

    //const url = new URL(request.url);
    //const q = url.searchParams.get("q");
/*    const contacts = await getContacts(q);*/
    //return {
    //    contacts,
    //    q,
    //    firstContact: q ? contacts[0] : null,
    //};
}

export default function Root() {
    const [routingType, setRoutingType] = useState(RoutingType.AnonymousMain);
    const [user, setUser] = useState(null);
    const divRef = useRef(null);
    const { showBoundary } = useErrorBoundary();

    const loggedIn = isLoggedIn();
    const authenticatedUser = loggedInUser();

    if (loggedIn === false || authenticatedUser === null) {
        throw new Error("wrong approach");
    }

    function divClicked() {
        showBoundary({ message: "test" });
    }

    //const navigate = useNavigate();
    //const handelGoToIdentity = () => {
    //    navigate('/identity/login')
    //}

    //const content =
    //    routingType === RoutingType.AnonymousMain ? <AnonymousMain></AnonymousMain> :
    //        routingType === RoutingType.UserMain ? <UserMain></UserMain> :
    //            routingType === RoutingType.Authentication ?
    //                <Authentication handleUserAuthenticated={(u) => setUser(u)} handleRoutingType={(r) => setRoutingType(r)}>
    //                </Authentication> : <Error></Error>

    const content = <div>welcome to protected page</div>;


    return (
        <div className="container-fluid px-0" ref={divRef} onClick={divClicked}>
            <div className="d-flex flex-column vh-100">
                <div className="d-flex justify-content-between fixed-top py-1 custom-header-bg">
                    <Form action="/root">
                        <button type="submit" className="btn btn-link p-2">Home</button>
                    </Form>
                    <div className="d-flex flex-nowrap text-nowrap text-white p-2">Welcome {authenticatedUser}!</div>
                </div>

                <div className="flex-grow-1 d-flex flex-wrap content-padding-top">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button className="btn btn-link">Link</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link">Link</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link">Link</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link">Link</button>
                            </li>
                        </ul>
                    <div className="px-2 flex-grow-1 overflow-auto vh-100">
                        {content}
                    </div>
                </div>

                <div className="d-flex flex-wrap custom-footer-bg">
                    <div className="p-3 bd-custom-gray">Flex item</div>
                    <div className="p-3 bd-custom-gray">Flex item</div>
                    <div className="p-3 bd-custom-gray">Flex item</div>
                </div>
            </div>
        </div>
    );
}

