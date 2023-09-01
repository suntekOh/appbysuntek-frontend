import {
    useLoaderData
} from "react-router-dom";
import { ProductCategories } from '../../services/fake-api';
import { AppBarType } from "../../models/enums";
import DrawerAppBar, { DrawerAppBarProps } from "./drawer-app-bar";


export default function AnonymousHome() {
    const productCategories = useLoaderData() as Array<ProductCategories>;

    const props: DrawerAppBarProps  = 
    { // make sure all required component's inputs/Props keys&types match
        window: undefined,
        appBarType: AppBarType.Annonymous
    }
   
    return (
        <DrawerAppBar {...props} >
        </DrawerAppBar>
    );
}

