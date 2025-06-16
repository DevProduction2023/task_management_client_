import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from '../firebase/CheckAuth'

function PrivateRouter() {
    const [authenticated, setAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return () => unsubscribe();
    }, [location]);

    if (authenticated === null) {
        return <div className='text-center min-h-[90vh] align-middle py-[20%] font-bold text-xl'>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRouter;
