//@ts-nocheck
import React, {useState} from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.jpg"
import "../assets/styles/style.css"
import {Link} from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState<Array<object>>([{"name":"Test","type":"test","price":232,"quantity":2}]);
    useEffect(() => {
        //@ts-ignore
        setProducts(JSON.parse(localStorage.getItem("products")));
    }, []);

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

            <h2 style={{ textAlign: "center" }}>Product Catalog</h2>

            <div style={{padding:"2em"}}>
                <table id="product-table">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    {products && products.map((e:any)=>(
                        <tr>
                            <td>{e.name}</td>
                            <td>{e.type}</td>
                            <td>{e.price}</td>
                            <td>{e.quantity}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}