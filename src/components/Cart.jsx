import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        calculateTotalPrice(storedCart);
    }, []);

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.cartQuantity * item.price, 0);
        setTotalPrice(total);
    };

    const handleOrder = () => {
        const ordersPlaced = JSON.parse(localStorage.getItem('orders_placed')) || [];
        const newOrder = {
            id: Date.now(),
            items: [...cart],
            totalPrice,
            date: new Date().toLocaleString(),
        };
        ordersPlaced.push(newOrder);
        localStorage.setItem('orders_placed', JSON.stringify(ordersPlaced));
        localStorage.removeItem('cart'); // Clear the cart after placing the order
        setCart([]);
        alert('Order placed successfully!');
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className='h-screen relative'>
            {/* Top Bar */}
            <div className='border min-h-20 flex justify-between p-4'>
                <div className='flex items-center border'>Icon</div>
                <div
                    className='flex items-center border p-2 cursor-pointer'
                    onClick={handleGoBack}
                >
                    Dashboard
                </div>
            </div>

            {/* Cart Items Section */}
            <div className="flex flex-col h-screen overflow-y-auto border">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Your Cart</h1>
                    {cart.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="border bg-white p-4 rounded-lg shadow-lg"
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
                                                <td>{item.cartQuantity}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-lg text-center">
                            Your cart is empty.
                        </div>
                    )}
                </div>
            </div>

            {/* Order Button */}
            {cart.length > 0 && (
                <button
                    className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    onClick={handleOrder}
                >
                    Order
                </button>
            )}
        </div>
    );
}

export default Cart;
