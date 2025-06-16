import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import '../../App.css';

const RegisterLayout: FC = () => {
    return (
        <div className="appContainer">
            <div className="mainContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default RegisterLayout;