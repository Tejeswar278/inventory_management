import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${baseUrl}/get_cart`);
                if (response.ok) {
                    const data = await response.json();
                    setCart(data.products); 
                    calculateTotalPrice(data.products);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCart();
    }, []);

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setTotalPrice(total);
    };

    const handleRemoveItem = async (item) => {
        try {
            const response = await fetch(`${baseUrl}/remove_item`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_name: item.product_name,
                    quantity: item.quantity,
                    category_name: item.category_name,  
                }),
            });

            if (response.ok) {
                const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
                setCart(updatedCart);
                calculateTotalPrice(updatedCart);
                setShowModal(false);
                alert('Item removed successfully!');
                window.location.reload();
            } else {
                alert('Failed to remove item!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Error removing item!');
        }
    };

    const handleOrder = async () => {
        try {
            const response = await fetch(`${baseUrl}/create_order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: cart,
                    total_items: cart.length,
                    total_cart_value: totalPrice,
                }),
            });

            if (response.ok) {
                alert('Order placed successfully!');
                setCart([]); // Clear cart after successful order
            } else {
                alert('Failed to place order!');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order!');
        }
    };

    const handleGoBack = () => {
        navigate('/app1');
    };

    return (
        <div className="h-screen overflow-hidden">
            {/* Top Bar */}
            <div className="border fixed top-0 left-0 right-0 min-h-20 flex justify-between p-4 bg-white z-10">
                <div className="font-bold text-5xl cursor-pointer" onClick={handleGoBack}>
                    Inventory
                </div>
                <div className="border p-2 cursor-pointer" onClick={handleGoBack}>
                    Dashboard
                </div>
            </div>

            {/* Cart Items Section */}
            <div className="p-6 flex h-full pt-20">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Your Cart</h1>
                <div className="flex-1 overflow-y-auto border-t border-b p-4">
                    {cart.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="border bg-white p-4 rounded-lg shadow-lg relative"
                                >
                                    <h3 className="text-xl font-semibold text-red-500 mb-2">{item.product_name}</h3>
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
                                    <button
                                        className="absolute top-2 right-2 text-red-500"
                                        onClick={() => {
                                            setItemToRemove(item);
                                            setShowModal(true);
                                        }}
                                    >
                                        ✖ Remove
                                    </button>
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
            {cart.length > 0 ? (
                <button
                    className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    onClick={handleOrder}
                    disabled={cart.length === 0}
                >
                    Place Order - ₹{totalPrice}
                </button>
            ) : (
                <button
                    className="fixed bottom-6 right-6 bg-blue-200 text-white font-bold p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    disabled={true}
                >
                    Place Order - ₹{totalPrice}
                </button>
            )}

            {/* Remove Item Confirmation Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold text-center mb-4">Are you sure you want to remove this item?</h2>
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-500 text-white p-2 rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded-lg"
                                onClick={() => handleRemoveItem(itemToRemove)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
