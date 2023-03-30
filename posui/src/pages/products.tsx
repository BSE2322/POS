import React from "react";
import { productFactory } from "../domain-lib/main";
import logo from "../assets/images/logo.jpg"
import "../assets/styles/style.css"
import { Navigate } from "react-router-dom";

export default function Products() {
    const addProduct = ()=>{
        console.log("Creating Product")
        // @ts-ignore
        var product_name:String = document.getElementById("product_name").value;
        // @ts-ignore
        var product_type:String = document.getElementById("product_type").value;
        // @ts-ignore
        var product_price:Number = document.getElementById("product_price").value;
        // @ts-ignore
        var product_quantity:Number = document.getElementById("product_quantity").value;
        // @ts-ignore
        var product:Product = productFactory(product_name,product_type,product_price,product_quantity)
        product.addProduct()
    }
    return (
        <div>
            <div className="navbar">
                <a href="/"><img src={logo} alt="logo" width="100" /></a>
                <div>
                    <a className="nav-item" href="/manage-products"><button className="manage">Manage Products</button></a>
                    <a className="nav-item" href="/"><button className="catalog">Catalog</button></a>
                </div>
            </div>

            <div>
                <h2 className="product-heading">Add Product</h2>
                <div className="form-div">
                    <form id="product_form">
                        <input type="text" name="" id="product_name" placeholder="Product Name" required /><br />
                        <select className="select-type" name="" id="product_type">
                            <option value="Clothing">Clothing</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Groceries">Groceries</option>
                        </select><br />
                        <input type="number" id="product_price" placeholder="Price" required /><br />
                        <input type="number" id="product_quantity" placeholder="Quantity" required /><br />
                    </form>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={()=>{addProduct(); return <Navigate to="/" replace/>}}>Submit</button>
            </div>
        </div>
    );
}