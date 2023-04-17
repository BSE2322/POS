//@ts-nocheck
import React, {useState} from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.jpg"
import "../assets/styles/style.css"

export default function Catalog() {
    const [products, setProducts] = useState<Array<object>>([{"name":"Test","type":"test","price":232,"quantity":2}]);
    useEffect(() => {
        //@ts-ignore
        setProducts(JSON.parse(localStorage.getItem("products")));
    }, []);

    if (!products) {
        window.alert("Stock is empty");
        return
    }
    return (
        <div>
            <div className="navbar">
                <a href="/"><img src={logo} alt="logo" width="100" /></a>
                <div>
                    <a className="nav-item" href="/sell-products"><button className="catalog">Sell Products</button></a>
                    <a className="nav-item" href="/manage-products"><button className="manage">Add Products</button></a>
                    <a className="nav-item" href="/"><button className="catalog">Catalog</button></a>
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
                    {products.map((e:any)=>(
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