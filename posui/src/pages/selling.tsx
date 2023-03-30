import React, { useState } from 'react'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap'

function Selling() {
    const [category, setCategory] = useState(" ")
    const [Quantity, setQuantity]= useState(0)
    const [shipping, setShipping]= useState(false)
    const [wrapping, setwrapping]= useState(false)

    
        // @ts-ignore
    const handleSubmit = (e) =>{
        alert("Product Added")
        e.preventDefault()
        try {        
            console.log(category)
            console.log(Quantity)
            console.log(shipping)
            console.log(wrapping)

        } catch (error) {
          console.log(error)  
        }

    }
    const resetForm =()=>{
        setCategory(" ")
        setQuantity(0)
        setShipping(false)
        setwrapping(false)
    }
  return (
    <Container>
        <Row>
            <Col>
                <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3">
                        <Form.Label>Select a product category: </Form.Label>

                        <Form.Select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                            <option value=""> </option>
                            <option value="clothing">Clothing</option>
                            <option value="electronics">Electronics</option>
                            <option value="grocery">Grocery</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='my-5'>
                        <Form.Label>Quantity</Form.Label>
                        {/* @ts-ignore */}
                        <Form.Control type="number" name='quantity' onChange={(e)=>setQuantity(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Check type="checkbox" label="shipping" onChange={(e)=>setShipping(e.target.checked)} />
                    </Form.Group>


                    <Form.Group>
                        <Form.Check type="checkbox" label="wrapping" onChange={(e)=>setwrapping(e.target.checked)} />
                    </Form.Group>

                    <Button type='submit' className='mt-5'>Submit</Button>
                    <Button className='mt-5 ms-5' variant='secondary' onClick={resetForm}>Reset Form</Button>
                </Form>
            </Col>

            {category&&Quantity&&
                <Col className='mt-4'>
                    <Card className="mt-5 ps-5 pt-3">
                        <p>Category: {category}</p>
                        <p>Quantity: {Quantity}</p>
                        {shipping|| wrapping? <>
                        <p>{shipping}</p>
                        <p>{wrapping}</p>
                        </>: <></>
                        }

                    </Card>
                </Col>
            }
        </Row>


    </Container>
  )
}

export default Selling