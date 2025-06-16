import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error/Error.tsx';
import MainLayout from '../layuots/mainLayout/MainLayout.tsx';
import RegisterLayout from '../layuots/authLayout/AuthLayout.tsx';

export const router = createBrowserRouter([
    {
        path: '/home',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home',
                lazy: () =>
                    import('../pages/home/home.tsx').then((module) => ({
                        Component: module.default,
                    })),
            },
            {
                path: 'profile',
                lazy: () =>
                    import('../pages/profile/profile.tsx').then((module) => ({
                        Component: module.default,
                    })),
            },
            {
                path: 'files',
                lazy: () =>
                    import('../pages/files/files.tsx').then((module) => ({
                        Component: module.default,
                    })),
            },
        ],
    },
    {
        path: '/',
        element: <RegisterLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                lazy: () =>
                    import('../pages/auth/auth.tsx').then((module) => ({
                        Component: module.default,
                    })),
            },
        ],
    },
]);
