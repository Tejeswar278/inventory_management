import { useState } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AddCategory = ({ categories, setCategories, updateLocalStorage }) => {
    const [newCategory, setNewCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Optional: for showing a loading state

    const handleAddCategory = async () => {
        if (newCategory.trim() && !categories.find((cat) => cat.name === newCategory)) {
            try {
                setIsLoading(true); // Set loading state
                const response = await fetch(`${baseUrl}/create_category`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ category: newCategory }), // Adjust payload as per your API
                });

                if (!response.ok) {
                    throw new Error("Failed to add category");
                }

                const addedCategory = await response.json(); // Assuming the API returns the added category
                const updatedCategories = [...categories, addedCategory];
                setCategories(updatedCategories);
                updateLocalStorage(updatedCategories);
                setNewCategory("");
                alert("Category added successfully!");
            } catch (error) {
                console.error("Error adding category:", error);
                alert("Failed to add category. Please try again.");
            } finally {
                setIsLoading(false); // Reset loading state
            }
        } else {
            alert("Category already exists or is empty.");
        }
    };

    return (
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
                className="p-2 bg-red-500 text-white rounded w-full"
                disabled={isLoading} // Disable button during loading
            >
                {isLoading ? "Adding..." : "Add Category"}
            </button>
        </div>
    );
};

export default AddCategory;
