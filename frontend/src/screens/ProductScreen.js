import React, {useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { useNavigate } from 'react-router-dom';


function ProductScreen() {
  const history = useNavigate();

  const [qty, setQty] = useState(1)
  
  const dispatch = useDispatch()
  const {id} = useParams()  
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`)  
    // console.log(`${id} com a quantidade: ${qty}`) 
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {
          loading ? 
            <Loader/>
            : error
              ? <Message variant='danger'>{error}</Message>
            :
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={product.rating} text={` ${product.numReviews} avaliações`} color={'#F8E825'} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Descrição: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Preço:</Col>
                        <Col>
                          <strong>R${product.price}</strong>

                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0  && (

                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control 
                              as='select'
                              value={qty}
                              onChange={(e)=> setQty(e.target.value)}
                              >
                                {
                                  //creating a array of products in stock
                                  [...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))
                                }
                              </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button 
                        onClick={addToCartHandler}
                        className='btn btn-block' 
                        type='button' 
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                  
                </Card>
              </Col>
            </Row>
        }

      
    </div>
  )
}

export default ProductScreen