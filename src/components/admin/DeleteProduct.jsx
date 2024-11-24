import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DeleteCategory = ({ updateLocalStorage }) => {
    const [categories, setCategories] = useState([]);
    const [deleteCategory, setDeleteCategory] = useState("");
    const [deleteCategoryId, setDeleteCategoryId] = useState("");
    const [products, setProducts] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/get_category_list`); // Replace with your actual API endpoint
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products for the selected category
    const fetchProducts = async (categoryId, categoryName) => {
        try {
            const response = await axios.post(`${baseUrl}/get_category`, {
                category_name: categoryName,
                category_id: categoryId,
            }); // Replace with your actual API endpoint
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const handleDeleteProduct = async () => {
        if (deleteCategory && deleteProduct) {
            try {
                const response = await axios.post(`${baseUrl}/delete_product`, {
                    category: deleteCategory,
                    category_id: deleteCategoryId,
                    product_name: deleteProduct,
                }); // Replace with your actual API endpoint
                alert(response.data.message || "Product deleted successfully!");
                // Optionally update categories or products in local state
                const updatedProducts = products.filter(
                    (prod) => prod.name !== deleteProduct
                );
                setProducts(updatedProducts);
                updateLocalStorage(categories); // Assuming `updateLocalStorage` is for categories
                setShowConfirmation(false);
                setDeleteProduct("");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete the product. Please try again.");
            }
        } else {
            alert("Please select a category and a product to delete.");
        }
    };

    return (
        <div className="w-full p-4 border">
            <h2 className="font-bold mb-2">Delete Product</h2>
            <select
                value={deleteCategory}
                onChange={(e) => {
                    const selectedCategory = categories.find(
                        (cat) => cat.category_name === e.target.value
                    );
                    setDeleteCategory(e.target.value);
                    setDeleteCategoryId(selectedCategory.category_id);
                    fetchProducts(selectedCategory.category_id, selectedCategory.category_name);
                    setDeleteProduct(""); // Reset product selection
                }}
                className="w-full p-2 mb-2 border"
            >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_name}>
                        {cat.category_name}
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
                {products.map((prod, index) => (
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
    );
};

export default DeleteCategory;
