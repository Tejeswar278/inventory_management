import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${baseUrl}/get_orders`); // Replace with your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders); // Assuming the response contains an "orders" array
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleGoBack = () => {
        navigate('/app1');
    };

    return (
        <div className="h-screen overflow-hidden">
            {/* Top Bar */}
            <div className="border fixed top-0 left-0 right-0 min-h-20 flex justify-between p-4 bg-white z-10">
                <div className='flex items-center font-bold text-5xl cursor-pointer' onClick={handleGoBack}>Inventory</div>
                <div
                    className="flex items-center border p-2 cursor-pointer min-w-28 justify-around"
                    onClick={handleGoBack}
                >
                    Dashboard
                </div>
            </div>

            {/* Orders Section */}
            <div className="p-6 flex h-full pt-20">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Your Orders</h1>
                <div className='flex-1 overflow-y-auto border-t border-b p-4'>
                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div
                                    key={order.order_id}
                                    className="border bg-white p-4 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-red-500 mb-2">
                                        Order #{index + 1} - {new Date(order.order_date).toLocaleDateString()} {/* Format the date */}
                                    </h3>
                                    <div className="text-gray-700 font-semibold mb-2">
                                        Total Price: ₹{order.products.reduce((total, product) => total + product.total_price, 0)} {/* Sum the total price of products */}
                                    </div>
                                    <div className="text-gray-700 mb-2">
                                        Total Items: {order.total_items}
                                    </div>
                                    <div>
                                        {order.products.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="flex justify-between mb-2"
                                            >
                                                <span>{item.product_name}</span>
                                                <span>
                                                    {item.quantity} x ₹{item.price} = ₹{item.total_price}
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
