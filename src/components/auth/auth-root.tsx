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
    return (
        <>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
    

}