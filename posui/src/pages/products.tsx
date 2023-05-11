import React from "react";
import { productFactory } from "../domain-lib/main";
import logo from "../assets/images/logo.jpg"
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

export default function Products() {
    const navigate = useNavigate();
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
        return navigate("/",{replace:true})
    }
    return (
        <div>
            <div className="navbar">
                <a href="/"><img src={logo} alt="logo" width="100" /></a>
                <div>
                    <Link className="nav-item" to="/sell-products"><button className="catalog">Sell Products</button></Link>
                    <Link className="nav-item" to="/manage-products"><button className="manage">Add Products</button></Link>
                    <Link className="nav-item" to="/"><button className="catalog">Catalog</button></Link>
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
                <button onClick={addProduct}>Submit</button>
            </div>
        </div>
    );
}
