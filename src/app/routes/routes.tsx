import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/error/Error.tsx';
import MainLayout from '../layuots/mainLayout/MainLayout.tsx';
import AuthLayout from '../layuots/authLayout/AuthLayout.tsx';
import React from 'react';

// Функция проверки авторизации
const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

// Защищенный маршрут
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

// Публичный маршрут (только для неавторизованных)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    return !isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

export const router = createBrowserRouter([
    {
        path: '/home',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
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
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
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
    {
        path: '*',
        element: <Navigate to={isAuthenticated() ? '/home' : '/'} replace />,
    },
]);