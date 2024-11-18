import { useNavigate } from 'react-router-dom'

function Admin() {
    const navigate = useNavigate()

    const handlePageChange = () => {
        navigate('/')
    }

    return (
        <>
            <div className='border min-h-20 flex justify-between p-4'>
                <div className='flex items-center border'>Icon</div>
                <div
                    className='flex items-center border p-2 cursor-pointer rounded'
                    onClick={handlePageChange}
                >Dashboard</div>
            </div>
            <div className="flex h-screen border ">
                Admin page
            </div>
        </>
    )
}

export default Admin
