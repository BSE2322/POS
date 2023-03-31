import React, { useState } from 'react'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap'

import {Product,ProductDecorator,productFactory,ConcreteSalesPerson,ConcreteProductNotifier} from "../domain-lib/main";
import logo from "../assets/images/logo.jpg";
import Products from "./products";

// interface CartItem {
//     category: string
//     Quantity: number
//     shipping: boolean
//     Wrapping: boolean
// }

function Selling() {
    const [name, setName] = useState(" ")
    const [quantity, setQuantity]= useState(0)
    const [shipping, setShipping] = useState(false)
    const [wrapping,setWrapping] = useState(false)
    const [items, setItems] = useState<ProductDecorator[] | null>(null)
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
        try {
            if(name && quantity){
                //@ts-ignore
                const product: ProductDecorator = new ProductDecorator(productFactory(name,getType(name),getPrice(name),quantity));
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

  return (
    <Container>
        <div className="navbar">
            <a href="/"><img src={logo} alt="logo" width="100" /></a>
            <div>
                <a className="nav-item" href="/sell-products"><button className="catalog">Sell Products</button></a>
                <a className="nav-item" href="/manage-products"><button className="manage">Add Products</button></a>
                <a className="nav-item" href="/"><button className="catalog">Catalog</button></a>
            </div>
        </div>
        <Row>
            <Col>
                <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3">
                        <Form.Label>Select a product: </Form.Label>

                        <Form.Select name="category" id="category" value={name} onChange={(e)=>setName(e.target.value)}>
                            {selectedProducts && selectedProducts.map((item:Product)=>(
                                //@ts-ignore
                                <option value={item.name!}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='my-5'>
                        <Form.Label>Quantity</Form.Label>
                        {/* @ts-ignore */}
                        <Form.Control value={quantity} type="number" name='quantity' onChange={(e)=>setQuantity(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        {/* @ts-ignore */}
                        <Form.Check type="checkbox" label="shipping" value={shipping} onChange={(e)=>setShipping(e.target.checked)} />
                    </Form.Group>


                    <Form.Group>
                        {/* @ts-ignore */}
                        <Form.Check type="checkbox" label="wrapping" value={wrapping} onChange={(e)=>setWrapping(e.target.checked)} />
                    </Form.Group>

                    <div style={{display:"flex"}}>
                        <Button style={{marginRight:"1em"}} type='submit' className='mt-5'>Submit</Button>
                        <Button className='mt-5 ms-5' variant='secondary' onClick={resetForm}>Reset Form</Button>
                    </div>
                </Form>
            </Col>            
            <Col className='mt-4'>
            {items && items.map((item, index) => (
                    <Card key={index} className="mt-5 ps-5 pt-3">
                        <p>Name: {`${item.name}`} </p>
                       {shipping && <p>Shipping</p>}
                    </Card>
                ))
            }
            </Col>
        </Row>


    </Container>
  )
}

export default Selling