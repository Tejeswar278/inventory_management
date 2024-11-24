import { useState } from "react";
import AddCategory from "./admin//AddCategory";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import DeleteCategory from "./admin/DeleteCategory";
import DeleteProduct from "./admin/DeleteProduct";
import AdminNav from "./admin/AdminNav";

const Admin = () => {
    const [categories, setCategories] = useState([]);

    const updateLocalStorage = (updatedCategories) => {
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    return (
        <>
            <AdminNav />
            <div className="flex gap-4 m-4">
                <AddCategory
                    categories={categories}
                    setCategories={setCategories}
                    updateLocalStorage={updateLocalStorage}
                />
                <AddProduct
                    categories={categories}
                    setCategories={setCategories}
                    updateLocalStorage={updateLocalStorage}
                />
                <EditProduct
                    categories={categories}
                    setCategories={setCategories}
                    updateLocalStorage={updateLocalStorage}
                />
            </div>
            <div className="flex gap-4 ms-4 me-4">
                <DeleteCategory
                    categories={categories}
                    setCategories={setCategories}
                    updateLocalStorage={updateLocalStorage}
                />
                <DeleteProduct
                    categories={categories}
                    setCategories={setCategories}
                    updateLocalStorage={updateLocalStorage}
                />
            </div>
        </>
    );
};

export default Admin;
