import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminNav() {

    const navigate = useNavigate();

    const handlePageChange = () => {
        navigate('/app1');
    };

    return (
        <>
            <div className='border flex justify-between p-4'>
                <div className='flex items-center font-bold text-5xl cursor-pointer' onClick={handlePageChange}>Inventory</div>
                <div
                    className='flex items-center border p-2 cursor-pointer rounded min-w-28 justify-around'
                    onClick={handlePageChange}
                >
                    Dashboard
                </div>
            </div>
        </>
    )
}
