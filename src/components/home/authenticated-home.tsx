import {
    useNavigate,
    Form,
    useLoaderData,
} from "react-router-dom";
import { getUserNameFromAuth, useAuth } from '../auth/authProvider';
import { useErrorBoundary } from "react-error-boundary";
import HomeHeader from "./home-header";
import HomeFooter from "./home-footer";
import { ProductCategories } from "../../services/fake-api";
import { HomeHeaderType } from "../../models/enums";
import DrawerAppBar, { DrawerAppBarProps } from "../DrawerAppBar";


export async function action() {
    return null;
}

export function loader(props: { request: any }) {
    return null;
}

export default function AuthenticatedHome() {
    const productCategories = useLoaderData() as Array<ProductCategories>;

    const props: DrawerAppBarProps =
    { // make sure all required component's inputs/Props keys&types match
        window: undefined,
        homeHeaderType: HomeHeaderType.Authenticated
    }

    return (
        <DrawerAppBar {...props} >
        </DrawerAppBar>
    );
}

