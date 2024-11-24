import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DeleteCategory = ({ updateLocalStorage }) => {
    const [categories, setCategories] = useState([]);
    const [deleteCategory, setDeleteCategory] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${baseUrl}/get_category_list`); // Replace with your GET category API endpoint
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.categories);
                } else {
                    alert(data.message || "Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                alert("An error occurred while fetching categories.");
            }
        };

        fetchCategories();
    }, []);

    // Handle category deletion
    const handleDeleteCategory = async () => {
        if (!deleteCategory) {
            alert("Please select a category to delete.");
            return;
        }

        setLoading(true);

        try {
            const selectedCategory = categories.find(
                (cat) => cat.category_name === deleteCategory
            );

            const response = await fetch(`${baseUrl}/delete_category`, { // Replace with your DELETE category API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: selectedCategory.category_name,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Remove the deleted category from state
                const updatedCategories = categories.filter(
                    (cat) => cat.category_name !== deleteCategory
                );
                setCategories(updatedCategories);
                updateLocalStorage(updatedCategories); // Optional if local storage is being used
                setDeleteCategory("");
                setShowConfirmation(false);
                alert(data.message || "Category deleted successfully!");
            } else {
                alert(data.message || "Failed to delete category.");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("An error occurred while deleting the category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-4 border">
            <h2 className="font-bold mb-2">Delete Category</h2>
            <select
                value={deleteCategory}
                onChange={(e) => setDeleteCategory(e.target.value)}
                className="w-full p-2 mb-2 border"
            >
                <option value="">Select a Category</option>
                {categories.map((cat, index) => (
                    <option key={cat.category_id} value={cat.category_name}>
                        {cat.category_name}
                    </option>
                ))}
            </select>
            <button
                onClick={() => setShowConfirmation(true)}
                className="p-2 bg-red-500 text-white rounded w-full"
                disabled={!deleteCategory || loading}
            >
                {loading ? "Deleting..." : "Delete Category"}
            </button>
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg w-1/3">
                        <h2 className="font-bold text-lg mb-4">Confirm Deletion</h2>
                        <p className="mb-4">
                            Are you sure you want to delete the category "{deleteCategory}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="p-2 bg-gray-300 text-black rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteCategory}
                                className="p-2 bg-red-500 text-white rounded"
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteCategory;
