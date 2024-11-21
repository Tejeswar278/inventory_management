import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders_placed')) || [];
        setOrders(storedOrders);
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="h-screen">
            {/* Top Bar */}
            <div className="border min-h-20 flex justify-between p-4">
            <div className="flex items-center border" onClick={handleGoBack}>Icon</div>
                <div
                    className="flex items-center border p-2 cursor-pointer"
                    onClick={handleGoBack}
                >
                    Dashboard
                </div>
            </div>

            {/* Orders Section */}
            <div className="flex flex-col h-screen overflow-y-auto border">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Your Orders</h1>
                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div
                                    key={index}
                                    className="border bg-white p-4 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-red-500 mb-2">
                                        Order #{index + 1} - {order.date}
                                    </h3>
                                    <div className="text-gray-700 font-semibold mb-2">
                                        Total Price: ₹{order.totalPrice}
                                    </div>
                                    <div>
                                        {order.items.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="flex justify-between mb-2"
                                            >
                                                <span>{item.name}</span>
                                                <span>
                                                    {item.cartQuantity} x ₹{item.price} = ₹
                                                    {item.cartQuantity * item.price}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-lg text-center">
                            No orders placed yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;
