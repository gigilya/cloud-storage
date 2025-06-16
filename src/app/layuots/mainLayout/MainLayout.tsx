import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import '../../App.css';
import Header from '../../../widgets/Header/Header.tsx';

const MainLayout: FC = () => {
    return (
        <div className="appContainer">
            <Header />
            <div className="mainContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;