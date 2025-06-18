import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import '../../App.css';

const AuthLayout: FC = () => {
    return (
        <div className="appContainer">
            <div className="mainContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;