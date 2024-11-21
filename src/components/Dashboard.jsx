import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);

    // Fetch categories and products from localStorage
    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (storedCategories.length > 0) {
            storedCategories.forEach((category) => {
                category.products.forEach((product) => {
                    const cartItem = storedCart.find((item) => item.name === product.name);
                    if (cartItem) {
                        product.quantity -= cartItem.cartQuantity; // Adjust quantity based on cart
                    }
                });
            });
            setCategories(storedCategories);
            setProducts(storedCategories[0].products);
            setSelectedCategory(storedCategories[0].name);
        }
    }, []);


    const handleCategoryChange = (categoryName) => {
        const selected = categories.find((cat) => cat.name === categoryName);
        setProducts(selected ? selected.products : []);
        setSelectedCategory(categoryName);
    };

    const updateLocalStorageCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleAddToCart = (product) => {
        const existingItem = cart.find((item) => item.name === product.name);
        if (existingItem) {
            return; // Item is already in the cart; use + or - buttons to modify quantity
        }
        const newCart = [...cart, { ...product, cartQuantity: 1 }];
        product.quantity -= 1; // Decrease product quantity by 1
        updateLocalStorageCart(newCart);
    };

    const handleIncrementQuantity = (product) => {
        const newCart = cart.map((item) => {
            if (item.name === product.name && product.quantity > 0) {
                product.quantity -= 1;
                return { ...item, cartQuantity: item.cartQuantity + 1 };
            }
            return item;
        });
        updateLocalStorageCart(newCart);
    };

    const handleDecrementQuantity = (product) => {
        const newCart = cart.map((item) => {
            if (item.name === product.name && item.cartQuantity > 0) {
                product.quantity += 1;
                return { ...item, cartQuantity: item.cartQuantity - 1 };
            }
            return item;
        }).filter((item) => item.cartQuantity > 0); // Remove items with 0 quantity
        updateLocalStorageCart(newCart);
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };
    const handleGoToBack = () => {
        navigate('/');
    };

    return (
        <div className='h-screen relative'>
            {/* Top Bar */}
            <div className="border min-h-20 flex justify-between p-4">
                <div className="flex items-center border" onClick={() => handleGoToBack}>Icon</div>
                <div className="flex space-x-4">
                    <div
                        className="flex items-center border p-2 cursor-pointer"
                        onClick={() => navigate('/admin')}
                    >
                        Admin
                    </div>
                    <div
                        className="flex items-center border p-2 cursor-pointer"
                        onClick={() => navigate('/orders')}
                    >
                        Orders
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex h-screen overflow-y-auto overflow-x-hidden border">
                {/* Category Section */}
                <div className="border min-w-60 bg-gray-100 p-4 overflow-y-auto h-full">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`border bg-red-500 text-white font-bold p-4 mb-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-200 ${selectedCategory === category.name ? 'bg-red-600' : 'bg-red-400'
                                }`}
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                {/* Products Grid Section */}
                <div className="border flex-1 bg-gray-50 p-6 overflow-y-auto h-full">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {products.map((product, index) => {
                                const cartItem = cart.find((item) => item.name === product.name);
                                return (
                                    <div
                                        key={index}
                                        className="border bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                                    >
                                        <h3 className="text-xl font-semibold text-red-500 mb-2">{product.name}</h3>
                                        <table className="w-full text-gray-700">
                                            <tbody>
                                                <tr>
                                                    <td className="font-semibold">Price:</td>
                                                    <td>₹{product.price}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Quantity:</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Description:</td>
                                                    <td>{product.description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {cartItem ? (
                                            <div className="flex items-center justify-between mt-4">
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                                    onClick={() => handleDecrementQuantity(product)}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4">{cartItem.cartQuantity}</span>
                                                <button
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                                    onClick={() => handleIncrementQuantity(product)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-lg text-center">
                            No products available in this category.
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Cart Button */}
            <button
                className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                onClick={handleGoToCart}
            >
                Go to Cart
            </button>
        </div>
    );
}

export default Dashboard;
