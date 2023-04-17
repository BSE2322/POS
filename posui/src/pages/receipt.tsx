import React from "react";
import {useSearchParams} from "react-router-dom";
import "../assets/styles/receipt.css"

export function Receipt(){
    const [searchParams, setSearchParams] = useSearchParams();
    try {
        const data = JSON.parse(searchParams.get("data") || `null`);
        if(data.receipt){
            let total = 0;
            data.receipt.items.map((e:any)=>{
                total = e.price + total;
            })
            return (
                <div>
                    <div id="invoice-POS">

                        <center id="top">
                            <a href={"/"}><div className="logo"></div></a>
                            <div className="info">
                                <h2>McDonald's</h2>
                            </div>{/*<!--End Info-->*/}
                        </center>{/*}<!--End InvoiceTop-->*/}

                        <div id="mid">
                            <div className="info">
                                <h2>Contact Info</h2>
                                <p>
                                    Address : Kanjokya, Kampala, 03882<br/>
                                    Email   : carrerfourpos@gmail.com<br/>
                                    Phone   : +256(731) 343-8944<br/>
                                </p>
                        </div>
        </div>
            {/*<!--End Invoice Mid-->*/}

            <div id="bot">

                <div id="table">
                    <table>
                        <tr className="tabletitle">
                            <td className="item"><h2>Item</h2></td>
                            <td className="Hours"><h2>Qty</h2></td>
                            <td className="Rate"><h2>Sub Total</h2></td>
                        </tr>
                        {data.receipt.items.map((item:any)=>(
                            <tr className="service">
                                <td className="tableitem"><p className="itemtext">{item.name}</p></td>
                                <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                                <td className="tableitem"><p className="itemtext">UGX {item.price}</p></td>
                            </tr>
                        ))}
                        <tr className="tabletitle">
                            <td></td>
                            <td className="Rate"><h2>Total</h2></td>
                            <td className="payment"><h2 className="total-amount">UGX {total}</h2></td>
                        </tr>

                    </table>
                </div>{/*<!--End Table-->*/}

                <div id="legalcopy">
                    <p className="legal"><strong>Thank you for your business!</strong> </p>
                </div>

            </div>{/*<!--End InvoiceBot-->*/}
        </div>{/*<!--End Invoice-->*/}
                </div>
            )
        }else{
            return (
                <div>
                    <p>Poor data</p>
                </div>
            )
        }
    }catch (e) {
        console.log(e)
        return (
            <div>
                <p>No Item to show</p>
            </div>
        )
    }
}