import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/get_products`); // Replace with your API endpoint
                if (response.data && response.data.categories) {
                    setCategories(response.data.categories);
                    if (response.data.categories.length > 0) {
                        const defaultCategory = response.data.categories[0];
                        setProducts(defaultCategory.products);
                        setSelectedCategory(defaultCategory.category_name);
                        setSelectedCategoryId(defaultCategory._id); // Assuming `_id` is the category ID
                    }
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryName) => {
        const selected = categories.find((cat) => cat.category_name === categoryName);
        if (selected) {
            setProducts(selected.products);
            setSelectedCategory(categoryName);
            setSelectedCategoryId(selected._id); // Set category ID
        }
    };

    const handleSelectItem = (product) => {
        setSelectedItems((prev) => [
            ...prev,
            {
                name: product.product_name,
                price: product.price,
                quantity: 1,
                maxQuantity: product.quantity,
                category_id: selectedCategoryId, // Add category ID
                category_name: selectedCategory, // Add category name
            },
        ]);
    };

    const handleIncrementQuantity = (itemName) => {
        setSelectedItems((prev) =>
            prev.map((item) =>
                item.name === itemName && item.quantity < item.maxQuantity
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrementQuantity = (itemName) => {
        setSelectedItems((prev) =>
            prev
                .map((item) =>
                    item.name === itemName
                        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                        : item
                )
                .filter((item) => item.quantity > 0) // Remove items with 0 quantity
        );
    };

    const isItemSelected = (productName) => {
        return selectedItems.find((item) => item.name === productName);
    };

    const handleAddToCart = async () => {
        try {
            const payload = { products: selectedItems };
            await axios.post(`${baseUrl}/add_to_cart`, payload); // Replace with your API endpoint
            setSelectedItems([]); // Clear the selected items after successful API call
            alert('Items added to cart successfully');
            // Refresh the page after the alert
            window.location.reload(); // This will reload the page and fetch the updated cart data
        } catch (error) {
            console.error('Error adding items to cart:', error);
            alert('Failed to add items to cart');
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            {/* Top Bar */}
            <div className="border fixed top-0 left-0 right-0 min-h-20 flex justify-between p-4 bg-primary text-white z-10">
                <div className="flex items-center font-bold text-4xl cursor-pointer text-white-500">INVENTORY</div>
                <div className="flex space-x-4">
                    <div
                        className="flex items-center border p-2 cursor-pointer min-w-28 justify-around bg-btnbckg text-btntext"
                        onClick={() => navigate('/app1/cart')}
                    >
                        Cart
                    </div>
                    <div
                        className="flex items-center border p-2 cursor-pointer min-w-28 justify-around bg-btnbckg text-btntext"
                        onClick={() => navigate('/app1/admin')}
                    >
                        Admin
                    </div>
                    <div
                        className="flex items-center border p-2 cursor-pointer min-w-28 justify-around bg-btnbckg text-btntext"
                        onClick={() => navigate('/app1/orders')}
                    >
                        Orders
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex h-full pt-20">
                {/* Category Section */}
                <div className="border min-w-60 p-4 overflow-y-auto h-full bg-sidebckg">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`border text-sidenavtext font-bold p-4 mb-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-sidenavactivetext transition duration-200 ${selectedCategory === category.category_name ? 'bg-sidenavactivetext' : 'bg-sidenavtext text-primary'
                                }`}
                            onClick={() => handleCategoryChange(category.category_name)}
                        >
                            {category.category_name}
                        </div>
                    ))}
                </div>

                {/* Products Grid Section */}
                <div className="border flex-1 bg-gray-50 p-6 overflow-y-auto">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {products.map((product, index) => {
                                const selectedItem = isItemSelected(product.product_name);
                                return (
                                    <div
                                        key={index}
                                        className="border bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                                    >
                                        <h3 className="text-xl font-semibold text-red-500 mb-2">
                                            {product.product_name}
                                        </h3>
                                        <table className="w-full text-gray-700">
                                            <tbody>
                                                <tr>
                                                    <td className="font-semibold">Price:</td>
                                                    <td>₹{product.price}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Available:</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Description:</td>
                                                    <td>{product.description}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {/* Select or Quantity Buttons */}
                                        {selectedItem ? (
                                            <div className="flex justify-between items-center mt-4">
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                                    onClick={() => handleDecrementQuantity(product.product_name)}
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-bold">
                                                    {selectedItem.quantity}
                                                </span>
                                                <button
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                                    onClick={() => handleIncrementQuantity(product.product_name)}
                                                    disabled={selectedItem.quantity === selectedItem.maxQuantity}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                onClick={() => handleSelectItem(product)}
                                            >
                                                Select Item
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

            {/* Floating Add to Cart Button */}
            {selectedItems.length > 0 && (
                <button
                    className="fixed bottom-6 right-6 bg-green-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            )}
        </div>
    );
}

export default Dashboard;
