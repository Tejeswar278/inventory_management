import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()

    
    const [count, setCount] = useState(0)

    const [items, setItems] = useState([])

    const items_1 = [
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Tuff",
            "price": 1200,
            "quantity": 23
        },
    ]

    const items_2 = [
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
        {
            "name": "Puff corn",
            "price": 1200,
            "quantity": 23
        },
    ]



    const item_cat = [
        {
            "name": "Tuff 100"
        },
        {
            "name": "Puff 200"
        },
    ]

    useEffect(() => {
        setItems(items_1)
    }, [])

    const handleItemsChange = (index) => {
        const value = index === 0 ? items_1 : items_2;
        console.log(value, "value of the items");
        setItems(value);
    };

    const handlePageChange = () => {
        navigate('/admin')
    }

    return (
        <div className=''>
            <div className='border min-h-20 flex justify-between p-4'>
                <div className='flex items-center border'>Icon</div>
                <div
                    className='flex items-center border p-2 cursor-pointer'
                    onClick={handlePageChange}
                >Admin</div>
            </div>
            <div className="flex h-screen overflow-y-auto overflow-x-hidden border">
                {/* Category Section */}
                <div className="border min-w-60 bg-gray-100 p-4 overflow-y-auto h-full">
                    {item_cat.map((category, index) => (
                        <div
                            key={index}
                            className="border bg-red-500 text-white font-bold p-4 mb-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-200"
                            onClick={() => handleItemsChange(index)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                {/* Items Grid Section */}
                <div className="border flex-1 bg-gray-50 p-6 overflow-y-auto h-full">
                    <div className="grid grid-cols-3 gap-6">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="border bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                <h3 className="text-xl font-semibold text-red-500 mb-2">{item.name}</h3>
                                <table className="w-full text-gray-700">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Price:</td>
                                            <td>₹{item.price}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Quantity:</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
