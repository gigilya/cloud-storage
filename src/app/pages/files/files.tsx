import { FC, useEffect, useState } from 'react';
import RecentFiles from '../../../widgets/RecentFiles/RecentFiles.tsx';
import Navigation from '../../../widgets/Navigation/Navigation.tsx';
import { FileItem } from '../../../shared/api/types.ts';
import { useNavigate } from 'react-router';

const Files: FC = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllFiles = async () => {
            const response = await fetch(
                `https://ggj-cldstrg.ru/api/v1/storage/my-files`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );
            if (!response.ok) {
                navigate('/error');
                console.log(`${response.statusText} (код ${response.status})`);
            }
            const data = await response.json();
            setFiles(data);
        };

        fetchAllFiles();
    },[navigate]);
    return (
        <div>
            <Navigation />
            <RecentFiles filesUser={files}/>
        </div>
    );
};

export default Files;
