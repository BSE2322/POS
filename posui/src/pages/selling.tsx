import React, { useState } from 'react'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap'

interface CartItem {
    category: string
    Quantity: number
    shipping: boolean
    Wrapping: boolean
}

function Selling() {
    const [category, setCategory] = useState(" ")
    const [Quantity, setQuantity]= useState(0)
    const [shipping, setShipping]= useState(false)
    const [wrapping, setwrapping]= useState(false)
    const [items, setItems] = useState<CartItem[] | null>(null)
    const products =[];
    const resetForm =()=>{
        console.log("run");
        
        setCategory(" ")
        setQuantity(0)
        setShipping(false)
        setwrapping(false)
    }
        // @ts-ignore
    const handleSubmit = (e) =>{
        e.preventDefault()
        try {        
            console.log(category)
            console.log(Quantity)
            console.log(shipping)
            console.log(wrapping)

            const cartItem: CartItem = {
                "category":category,
                "Quantity":Quantity,
                "shipping":shipping,
                "Wrapping":wrapping
            }
            
            if (items) {
                setItems([...items, cartItem])
            } else {
                setItems([cartItem])
            }

            alert("Product Added")
            resetForm() 

        } catch (error) {
          console.log(error)  
        }
    }
    console.log("Items",items)
    
  return (
    <Container>
        <Row>
            <Col>
                <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3">
                        <Form.Label>Select a product category: </Form.Label>

                        <Form.Select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value=""> </option>
                            <option value="clothing">Clothing</option>
                            <option value="electronics">Electronics</option>
                            <option value="grocery">Grocery</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='my-5'>
                        <Form.Label>Quantity</Form.Label>
                        {/* @ts-ignore */}
                        <Form.Control value={Quantity} type="number" name='quantity' onChange={(e)=>setQuantity(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        {/* @ts-ignore */}
                        <Form.Check type="checkbox" label="shipping" value={shipping} onChange={(e)=>setShipping(e.target.checked)} />
                    </Form.Group>


                    <Form.Group>
                        {/* @ts-ignore */}
                        <Form.Check type="checkbox" label="wrapping" value={shipping} onChange={(e)=>setwrapping(e.target.checked)} />
                    </Form.Group>

                    <Button type='submit' className='mt-5'>Submit</Button>
                    <Button className='mt-5 ms-5' variant='secondary' onClick={resetForm}>Reset Form</Button>
                </Form>
            </Col>            
            <Col className='mt-4'>
            {items && items.map((item, index) => (
                    <Card key={index} className="mt-5 ps-5 pt-3">
                        <p>Category: {item.category}</p>
                        <p>Quantity: {item.Quantity}</p>
                       {item.shipping && <p>Shipping</p>}
                    </Card>
                ))
            }
            </Col>
        </Row>


    </Container>
  )
}

export default Selling