import { FC, ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';

export interface RouterProviderProps {
    children?: ReactNode;
}

export const Provider: FC<RouterProviderProps> = () => {
    return <RouterProvider router={router} />;
};
