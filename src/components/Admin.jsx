import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
    });

    const [editCategory, setEditCategory] = useState('');
    const [editProduct, setEditProduct] = useState('');
    const [editDetails, setEditDetails] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
    });

    const [deleteCategory, setDeleteCategory] = useState('');
    const [deleteProduct, setDeleteProduct] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('categories')) || [];
        setCategories(storedData);
    }, []);

    const updateLocalStorage = (updatedCategories) => {
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
    };

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.find((cat) => cat.name === newCategory)) {
            const updatedCategories = [...categories, { name: newCategory, products: [] }];
            setCategories(updatedCategories);
            updateLocalStorage(updatedCategories);
            setNewCategory('');
        } else {
            alert('Category already exists or is empty.');
        }
    };

    const handleAddProduct = () => {
        const { name, price, quantity, description } = productDetails;

        if (selectedCategory && name.trim() && price.trim() && quantity.trim() && description.trim()) {
            const newProduct = { name, price, quantity, description };
            const updatedCategories = categories.map((cat) => {
                if (cat.name === selectedCategory) {
                    return { ...cat, products: [...cat.products, newProduct] };
                }
                return cat;
            });
            setCategories(updatedCategories);
            updateLocalStorage(updatedCategories);
            setProductDetails({ name: '', price: '', quantity: '', description: '' });
        } else {
            alert('Please fill all product details and select a category.');
        }
    };

    const handleEditProduct = () => {
        if (editCategory && editProduct) {
            const updatedCategories = categories.map((cat) => {
                if (cat.name === editCategory) {
                    return {
                        ...cat,
                        products: cat.products.map((prod) =>
                            prod.name === editProduct ? editDetails : prod
                        ),
                    };
                }
                return cat;
            });
            setCategories(updatedCategories);
            updateLocalStorage(updatedCategories);
            setEditCategory('');
            setEditProduct('');
            setEditDetails({ name: '', price: '', quantity: '', description: '' });
            alert('Product details updated successfully!');
        } else {
            alert('Please select a category and a product to edit.');
        }
    };

    const handleDeleteProduct = () => {
        if (deleteCategory && deleteProduct) {
            const updatedCategories = categories.map((cat) => {
                if (cat.name === deleteCategory) {
                    return {
                        ...cat,
                        products: cat.products.filter((prod) => prod.name !== deleteProduct),
                    };
                }
                return cat;
            });
            setCategories(updatedCategories);
            updateLocalStorage(updatedCategories);
            setDeleteCategory('');
            setDeleteProduct('');
            setShowConfirmation(false);
            alert('Product deleted successfully!');
        } else {
            alert('Please select a category and a product to delete.');
        }
    };

    const handleEditCategoryChange = (category) => {
        setEditCategory(category);
        setEditProduct('');
        setEditDetails({ name: '', price: '', quantity: '', description: '' });
    };

    const handleEditProductChange = (productName) => {
        setEditProduct(productName);
        const product = categories
            .find((cat) => cat.name === editCategory)
            ?.products.find((prod) => prod.name === productName);
        setEditDetails(product || { name: '', price: '', quantity: '', description: '' });
    };

    const handlePageChange = () => {
        navigate('/');
    };

    return (
        <>
            <div className='border flex justify-between p-4'>
                <div className='flex items-center font-bold text-5xl cursor-pointer' onClick={handlePageChange}>Inventory</div>
                <div
                    className='flex items-center border p-2 cursor-pointer rounded'
                    onClick={handlePageChange}
                >
                    Dashboard
                </div>
            </div>
            <div className="flex p-4 gap-4">
                <div className="flex flex-col gap-4">
                    {/* Add Category Section */}
                    <div className="w-full p-4 border">
                        <h2 className="font-bold mb-2">Add New Category</h2>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full p-2 mb-2 border"
                        />
                        <button
                            onClick={handleAddCategory}
                            className="p-2 bg-blue-500 text-white rounded w-full"
                        >
                            Add Category
                        </button>
                    </div>

                    {/* Delete Product Section */}
                    <div className="w-full p-4 border">
                        <h2 className="font-bold mb-2">Delete Product</h2>
                        <select
                            value={deleteCategory}
                            onChange={(e) => setDeleteCategory(e.target.value)}
                            className="w-full p-2 mb-2 border"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={deleteProduct}
                            onChange={(e) => setDeleteProduct(e.target.value)}
                            className="w-full p-2 mb-2 border"
                            disabled={!deleteCategory}
                        >
                            <option value="">Select a Product</option>
                            {categories
                                .find((cat) => cat.name === deleteCategory)
                                ?.products.map((prod, index) => (
                                    <option key={index} value={prod.name}>
                                        {prod.name}
                                    </option>
                                ))}
                        </select>
                        <button
                            onClick={() => setShowConfirmation(true)}
                            className="p-2 bg-red-500 text-white rounded w-full"
                            disabled={!deleteCategory || !deleteProduct}
                        >
                            Delete Product
                        </button>
                    </div>

                    {/* Confirmation Popup */}
                    {showConfirmation && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                                <h2 className="font-bold text-lg mb-4">Confirm Deletion</h2>
                                <p className="mb-4">
                                    Are you sure you want to delete the product "{deleteProduct}" from
                                    the category "{deleteCategory}"?
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setShowConfirmation(false)}
                                        className="p-2 bg-gray-300 text-black rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteProduct}
                                        className="p-2 bg-red-500 text-white rounded"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Product Section */}
                <div className="w-1/3 p-4 border">
                    <h2 className="font-bold mb-2">Add Products</h2>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 mb-2 border"
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={productDetails.name}
                        onChange={(e) =>
                            setProductDetails({ ...productDetails, name: e.target.value })
                        }
                        placeholder="Enter product name"
                        className="w-full p-2 mb-2 border"
                    />
                    <input
                        type="text"
                        value={productDetails.price}
                        onChange={(e) =>
                            setProductDetails({ ...productDetails, price: e.target.value })
                        }
                        placeholder="Enter product price"
                        className="w-full p-2 mb-2 border"
                    />
                    <input
                        type="text"
                        value={productDetails.quantity}
                        onChange={(e) =>
                            setProductDetails({ ...productDetails, quantity: e.target.value })
                        }
                        placeholder="Enter product quantity"
                        className="w-full p-2 mb-2 border"
                    />
                    <textarea
                        value={productDetails.description}
                        onChange={(e) =>
                            setProductDetails({ ...productDetails, description: e.target.value })
                        }
                        placeholder="Enter product description"
                        className="w-full p-2 mb-2 border"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="p-2 bg-green-500 text-white rounded w-full"
                    >
                        Add Product
                    </button>
                </div>

                {/* Edit Product Section */}
                <div className="w-1/3 p-4 border">
                    <h2 className="font-bold mb-2">Edit Products</h2>
                    <select
                        value={editCategory}
                        onChange={(e) => handleEditCategoryChange(e.target.value)}
                        className="w-full p-2 mb-2 border"
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={editProduct}
                        onChange={(e) => handleEditProductChange(e.target.value)}
                        className="w-full p-2 mb-2 border"
                        disabled={!editCategory}
                    >
                        <option value="">Select a Product</option>
                        {categories
                            .find((cat) => cat.name === editCategory)
                            ?.products.map((prod, index) => (
                                <option key={index} value={prod.name}>
                                    {prod.name}
                                </option>
                            ))}
                    </select>
                    <input
                        type="text"
                        value={editDetails.name}
                        onChange={(e) =>
                            setEditDetails({ ...editDetails, name: e.target.value })
                        }
                        placeholder="Enter product name"
                        className="w-full p-2 mb-2 border"
                        disabled={!editProduct}
                    />
                    <input
                        type="text"
                        value={editDetails.price}
                        onChange={(e) =>
                            setEditDetails({ ...editDetails, price: e.target.value })
                        }
                        placeholder="Enter product price"
                        className="w-full p-2 mb-2 border"
                        disabled={!editProduct}
                    />
                    <input
                        type="text"
                        value={editDetails.quantity}
                        onChange={(e) =>
                            setEditDetails({ ...editDetails, quantity: e.target.value })
                        }
                        placeholder="Enter product quantity"
                        className="w-full p-2 mb-2 border"
                        disabled={!editProduct}
                    />
                    <textarea
                        value={editDetails.description}
                        onChange={(e) =>
                            setEditDetails({ ...editDetails, description: e.target.value })
                        }
                        placeholder="Enter product description"
                        className="w-full p-2 mb-2 border"
                        disabled={!editProduct}
                    />
                    <button
                        onClick={handleEditProduct}
                        className="p-2 bg-yellow-500 text-white rounded w-full"
                        disabled={!editProduct}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

        </>
    );
}

export default Admin;
