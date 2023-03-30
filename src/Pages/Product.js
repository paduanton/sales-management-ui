import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { storeProduct } from "../actions/product";

import ProductService from "../services/product.service";

// TODO
/*
  Split page sections in smaller components
*/

const Product = () => {
  const dispatch = useDispatch();

  const [productsData, setProductsData] = useState([]);
  const [productTypesData, setProductTypesData] = useState([]);

  const fetchProductTypesData = async () => {
    const productTypesData = await ProductService.
      getProductTypes().
      catch((error) => {
      });

    setProductTypesData(productTypesData);    
  }

  const addProduct = async (event) => {
    event.preventDefault();
    
    const { name, price, productTypeId } = event.target; 

    dispatch(
      storeProduct(
        name.value, Number(price.value), Number(productTypeId.value)
      )
    ).then(() => {
      alert("Product Added")
      fetchProductsData();
    }); 
  };

  const fetchProductsData = async () => {
    const productsData = await ProductService.
      getProducts().
      catch((error) => {
      });

    setProductsData(productsData);    
  }

  useEffect(() => {    
    fetchProductsData();
    fetchProductTypesData();
  }, [])

  return (
    <>
    <h1>Product Page</h1>
    <Form onSubmit={addProduct}>
      <Row className="align-items-center">
        <Col xs={4} className="my-1">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter a name" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="text" name="price" placeholder="Integer value e.g. 80" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Label>Product Type:</Form.Label>
            <Form.Select name="productTypeId" aria-label="product type">
              {productTypesData ? productTypesData.map((productType, index) => (
                <option key={`option-product-types-${index}`} value={productType.id}>{productType.description}</option>
              )) : alert("Not able to store a product, please add one product type (go to /product_type) and try again")}

            </Form.Select>
        </Col>

        <Col xs="auto">
            <Button variant="secondary" type="submit">
              Add Product
            </Button>
        </Col>
      </Row>
    </Form>

      <Container className="mt-4">
          <Row className="d-flex justify-content-center">
          {productsData ? productsData.map((product, index) => (
            <Card key={`card-product-${index}`}style={{ width: '18rem' }} className="pt-4 m-1">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Name: {product.name}</ListGroup.Item>
                  <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )) : 'No product to show at this time, please add one and try again!'}
            
        </Row>
      </Container>
    </>
  );
};

export default Product;
