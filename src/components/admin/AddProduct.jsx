import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productDetails, setProductDetails] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${baseUrl}/get_category_list`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                alert("Failed to load categories. Please try again.");
            }
        };

        fetchCategories();
    }, []);

    const handleAddProduct = async () => {
        const { name, price, quantity, description } = productDetails;

        if (selectedCategory && name.trim() && price.trim() && quantity.trim() && description.trim()) {
            const newProduct = { name, price: parseFloat(price), quantity: parseInt(quantity), description };
            setIsLoading(true);

            try {
                const response = await fetch(`${baseUrl}/add_products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: selectedCategory,
                        products: [newProduct],
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add product");
                }

                const result = await response.json();
                alert("Product added successfully!");
                setProductDetails({ name: "", price: "", quantity: "", description: "" });
                setSelectedCategory("");
            } catch (error) {
                console.error("Error adding product:", error);
                alert("Failed to add product. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("Please fill all product details and select a category.");
        }
    };

    return (
        <div className="w-full p-4 border">
            <h2 className="font-bold mb-2">Add Products</h2>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 mb-2 border"
            >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_name}>
                        {cat.category_name}
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
                className="p-2 bg-red-500 text-white rounded w-full"
                disabled={isLoading} // Disable button during API call
            >
                {isLoading ? "Adding Product..." : "Add Product"}
            </button>
        </div>
    );
};

export default AddProduct;
