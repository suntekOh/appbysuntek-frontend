import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { container, Lifecycle } from 'tsyringe';
import { customConstants } from './models/constants';
import { AuthInfoFromLocalService } from './services/auth-info-from-local-service';
import "bootstrap/dist/css/bootstrap.css";
import "./css/site.css"
import "./css/all.css"
import { FakeApi } from "./services/fake-api";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

container.register(
    customConstants.DI.IAuthInfoFromLocalService,
    { useClass: AuthInfoFromLocalService },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    customConstants.DI.IFakeApi,
    { useClass: FakeApi },
    { lifecycle: Lifecycle.Singleton }
);

root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
