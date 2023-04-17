import React, { useState } from 'react'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap'

import {
    Product,
    ProductDecorator,
    productFactory,
    ConcreteSalesPerson,
    ConcreteProductNotifier,
    PaymentContext, PayWithCash, PayWithCard, Cart, ConcreteCart, BarCodeReader, ConcreteBarCodeReader
} from "../domain-lib/main";
import logo from "../assets/images/logo.jpg";

function Selling() {
    const [name, setName] = useState(" ")
    const [quantity, setQuantity]= useState(0)
    const [shipping, setShipping] = useState(false)
    const [wrapping,setWrapping] = useState(false)
    const [items, setItems] = useState<ProductDecorator[] | null>(null)
    const [sum,setSum] = useState<number>(0);

    let video:any, canvas:any, imageurl:any, scanbtn:any, capturebtn:any, addbtn:any, paymentMethod:string;
    //@ts-ignore
    const selectedProducts = JSON.parse(localStorage.getItem("products"));
    const resetForm =()=>{
        console.log("run");
        
        setName(" ")
        setQuantity(0)
        setShipping(false)
        setWrapping(false)
    }

    const getPrice = (name:string)=>{
        let price:Number = 0;
        selectedProducts.forEach((item:Product)=>{
            if(item.name.localeCompare(name)){
                price = item.price;
            }
        })
        return price;
    }

    const getType = (name:string)=>{
        let type:String = '';
        selectedProducts.forEach((item:Product)=>{
            if(item.name.localeCompare(name)){
                type = item.type
            }
        })
        return type;
    }
        // @ts-ignore
    const handleSubmit = (e) =>{
        e.preventDefault()
        const salesperson:ConcreteSalesPerson = new ConcreteSalesPerson();
        const productNotifier:ConcreteProductNotifier = new ConcreteProductNotifier();
        productNotifier.subscribe(salesperson);
        productNotifier.notify(name);
        let price:number = getPrice(name).valueOf();
        let total:number = (sum + price);
        setSum(total);
        try {
            if(name && quantity){
                //@ts-ignore
                const product: ProductDecorator = new ProductDecorator(productFactory(name,getType(name),price,quantity));
                if(shipping){
                    product.shipProduct("Kampala");
                }else{
                    console.log("Product has been added to cart")
                }

                if(wrapping){
                    product.wrapProduct();
                }else{
                    console.log("Product has been added to cart")
                }
                if (items) {
                    setItems([...items, product])
                } else {
                    setItems([product])
                }
                resetForm()
            }else{
                console.log("Attributes are not set");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const scanCode = async ()=>{
        scanbtn = document.getElementById("initiateScan");
        capturebtn = document.getElementById("captureScan");

        //@ts-ignore
        scanbtn.style.display = "none";
        //@ts-ignore
        capturebtn.style.display = "inline";

        video = document.getElementById("video");
        let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
        //@ts-ignore
        video.srcObject = stream;
    }

    const captureCode = ()=>{
        addbtn = document.getElementById("addToCart");
        addbtn.style.display = "inline";
        capturebtn = document.getElementById("captureScan");
        capturebtn.style.display = "none";
        canvas = document.getElementById("canvas");
        canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
        imageurl = canvas.toDataURL('image/jpeg');
        let imageContainer = document.getElementById("video-container");
        let img = document.createElement("img");
        img.src = imageurl;
        img.height = 200;
        img.width = 300;
        video.hidden = true;
        //@ts-ignore
        imageContainer.appendChild(img);
    }

    const addToCart = () =>{
        addbtn = document.getElementById("addToCart");
        capturebtn = document.getElementById("captureScan");
        const salesperson:ConcreteSalesPerson = new ConcreteSalesPerson();
        const productNotifier:ConcreteProductNotifier = new ConcreteProductNotifier();
        productNotifier.subscribe(salesperson);
        productNotifier.notify(name);

        const cart:Cart = new ConcreteCart();
        const barcodeReader = new ConcreteBarCodeReader();
        barcodeReader.subscribe(cart);
        barcodeReader.notify();
        //@ts-ignore
        const product: ProductDecorator = new ProductDecorator(productFactory("Meat","Groceries",3000,1));
        setSum(sum+3000);
        if (items) {
            setItems([...items, product])
        } else {
            setItems([product])
        }


    }

    const handlePayment = (e:any)=>{
        e.preventDefault();
        let paymentContext: PaymentContext = new PaymentContext(new PayWithCash());
        if(paymentMethod.localeCompare("cash") == 0){
            console.log("used cash");
            paymentContext.executePayment(sum);
        }else if(paymentMethod.localeCompare("card") == 0){
            console.log("use card");
            paymentContext.setPaymentStrategy(new PayWithCard());
            paymentContext.executePayment(sum);
        }
        window.location.reload();

    }
    const checkBoxStyle = {
        marginLeft:"4em"
    }

    const inputStyle = {
        border:"0px",
        backgroundColor:"#f2f0e9"
    }

  return (
    <Container>
        <div className="navbar">
            <a href="/"><img src={logo} alt="logo" width="100" /></a>
            <div>
                <a className="nav-item" href="/sell-products"><button style={{backgroundColor:"green", borderRadius:"10px" }}>Sell Products</button></a>
                <a className="nav-item" href="/manage-products"><button className="manage">Add Products</button></a>
                <a className="nav-item" href="/"><button className="sell">Catalog</button></a>
            </div>
        </div>
        <Row className="center-block">
            <h2 style={{textAlign:"center",margin:"1em"}}>Sell Product</h2>
            <div>
                <h3 style={{
                    color:"green"
                }}>Total Price: {sum}</h3>
            </div>
            <Col style={{width:"60em", margin:"auto"}}>
                <div style={{
                    display:"flex"
                }}>
                    <Form onSubmit={handleSubmit} className="mt-5" style={{width:"400px"}}>
                        <Form.Group className="mb-3">
                            <h4 className='mb-3'>Add a Product to sell</h4>
                            <Form.Label>Select a product: </Form.Label>

                            <Form.Select className='py-3' style={{fontFamily:"Mona Sans",...inputStyle}} name="category" id="category" value={name} onChange={(e)=>setName(e.target.value)}>
                                {selectedProducts && selectedProducts.map((item:Product)=>(
                                    //@ts-ignore
                                    <option value={item.name!}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='my-5'>
                            <Form.Label>Enter Quantity: </Form.Label> <br />
                            {/* @ts-ignore */}
                            <Form.Control style={{fontFamily:"Mona Sans",...inputStyle}} placeholder="Quantity" value={quantity} type="number" name='quantity' onChange={(e)=>setQuantity(e.target.value)}/>
                        </Form.Group>

                        <h4 className='mb-3'>Choose an additional feature</h4>            
                        <Form.Group style={{display:"flex"}}>
                            <Form.Label style={{marginRight:"0.4em"}}>Shipping </Form.Label>
                            {/* @ts-ignore */}
                            <Form.Check style={checkBoxStyle} type="checkbox" value={shipping} onChange={(e)=>setShipping(e.target.checked)} />
                        </Form.Group>


                        <Form.Group style={{display:"flex"}}>
                            <Form.Label>Wrapping </Form.Label>
                            {/* @ts-ignore */}
                            <Form.Check style={checkBoxStyle} type="checkbox" value={wrapping} onChange={(e)=>setWrapping(e.target.checked)} />
                        </Form.Group>

                        <div  style={{ display: "flex", marginTop:"2em" }}>
                            <div style={{marginRight:"1em"}}>
                                <Button type='submit' className='submit' >Submit</Button>
                            </div>

                            <div id="video-container">
                                <Button id="initiateScan" style={{marginRight:"1em",display:"block", color:"white"}} onClick={scanCode} type='submit' variant="warning">Scan Barcode</Button>
                                <div>
                                    <Button id="captureScan" style={{marginRight:"1em",display:"none", marginBottom:"2em"}} onClick={captureCode} type='submit' variant="warning">Capture Code</Button>
                                    <Button id="addToCart" style={{marginRight:"1em",display:"none", marginBottom:"2em"}} onClick={addToCart} type='submit' variant="warning">Add To Cart</Button>
                                </div>
                                <video id="video" autoPlay={true} width="200" height="200"></video>
                                <canvas id="canvas" width="200" height="200" hidden={true}></canvas>
                            </div>
                        </div>
                    </Form>

                </div>
            </Col>            
            <Col className='mt-4'>
                <h3 style={{margin:"2em"}}>Cart Items</h3>
            {items && items.map((item, index) => (
                    <Card style={{
                        width:"6em",
                        marginRight:"auto",
                        marginLeft:"auto",
                        backgroundColor:"#d7dbde",
                        padding:"0.5em",
                        marginBottom:"1em"
                    }} key={index}>
                        <p style={{
                            fontWeight:"bold"
                        }}>{item.name}</p>
                        <span>{item.price.toString()}</span>
                       {shipping && <p>Shipping</p>}
                    </Card>
                ))
            }
                    <div style={{
                        marginLeft:"2em"
                    }} className="payment-container" id="payment-options">
                        <h3>Make Payment</h3>
                        <form onSubmit={handlePayment}>
                            <p>Choose payment method</p>
                            <label>
                                <input type="radio" name="method" value="card" onClick={async (e)=>{
                                    console.log("Card chosen");
                                    paymentMethod = "card";
                                    console.log(paymentMethod);
                                }}/>
                                    Card
                            </label><br/>
                            <label>
                                <input type="radio" name="method" value="cash" onClick={async (e)=>{
                                    console.log("Cash chosen");
                                    paymentMethod = "cash";
                                    console.log(paymentMethod);
                                }}/>
                                    Cash
                            </label>
                            <br/>
                                <button style={{
                                    backgroundColor:"green", borderRadius:"10px"
                                }} type="submit">Pay</button>
                        </form>

                    </div>
            </Col>
        </Row>


    </Container>
  )
}

export default Selling