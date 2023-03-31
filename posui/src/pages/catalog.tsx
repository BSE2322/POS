import React from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.jpg"
import "../assets/styles/style.css"

export default function Catalog() {
    const buildTable = () => {
        console.log("Document Loaded");
        //@ts-ignore
        var products = JSON.parse(localStorage.getItem("products"));
        if (products.length === 0) {
            window.alert("Stock is empty");
            return
        }
        console.log(products)
        //@ts-ignore
        products.forEach(element => {
            console.log(element.name)
            var tableRow = document.createElement("tr");
            var nc = document.createElement("td");
            nc.innerHTML = element.name;
            var tc = document.createElement("td");
            tc.innerHTML = element.type;
            var np = document.createElement("td");
            np.innerHTML = `$ ${element.price}`;
            var nq = document.createElement("td");
            nq.innerHTML = element.quantity;
            tableRow.appendChild(nc);
            tableRow.appendChild(tc);
            tableRow.appendChild(np);
            tableRow.appendChild(nq);
            //@ts-ignore
            document.getElementById("product-table").appendChild(tableRow)
        });
    }
    useEffect(() => {
        buildTable();
    }, []);
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
                </table>
            </div>
        </div>
    )
}