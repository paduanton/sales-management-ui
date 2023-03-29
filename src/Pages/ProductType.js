import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { storeProductType } from "../actions/product";

import ProductService from "../services/product.service";

// TODO
/*
  Split page sections in smaller components
*/

const ProductType = () => {
  const dispatch = useDispatch();

  const [productTypesData, setProductTypesData] = useState([]);

  const addProductType = async (event) => {
    event.preventDefault();
    
    const { taxPercentage, description } = event.target; 

    dispatch(
      storeProductType(
        description.value, (Number(taxPercentage.value) / 100)
      )
    ).then(() => {
      alert("Product Type Added")
      fetchProductTypesData();
    }); 
  };

  const fetchProductTypesData = async () => {
    const productTypesData = await ProductService.
      getProductTypes().
      catch((error) => {
      });

    setProductTypesData(productTypesData);    
  }

  useEffect(() => {    
    fetchProductTypesData();
  }, [])

  return (
    <>
    <Form onSubmit={addProductType}>
      <Row className="align-items-center">
        <Col xs={4} className="my-1">
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" name="description" placeholder="Enter a description" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="taxPercentage">
            <Form.Label>Percentage:</Form.Label>
            <Form.Control type="text" name="taxPercentage" placeholder="Integer value e.g. 20" />
          </Form.Group>
        </Col>

          <Col xs="auto">
            <Button variant="secondary" type="submit">
              Add Product Type
            </Button>
          </Col>
        </Row>
      </Form>

      <Container className="mt-4">
          <Row className="d-flex justify-content-center">
          {productTypesData ? productTypesData.map((productType, index) => (
            <Card key={`card-product-type-${index}`}style={{ width: '18rem' }} className="pt-4 m-1">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Description: {productType.description}</ListGroup.Item>
                  <ListGroup.Item>Percentage: {productType.taxPercentage * 100}%</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )) : 'No product type to show at this time, please add one and try again!'}
            
        </Row>
      </Container>
    </>
  );
};

export default ProductType;
