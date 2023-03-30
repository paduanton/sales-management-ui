import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { storeSale } from "../actions/sale";

import ProductService from "../services/product.service";
import SaleService from "../services/sale.service";

// TODO
/*
  Split page sections in smaller components
*/

const Sale = () => {
  const dispatch = useDispatch();
  const [showReviewSaleModal, setShowReviewSaleModal] = useState(false);

  const [productsData, setProductsData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [previewSalesData, setPreviewSalesData] = useState({});
  const [salesProductData, setSalesProductData] = useState({ description : '', products: []});

  const fetchSalesData = async () => {
    const data = await SaleService.
      getSales().
      catch((error) => {
      });
    
      setSalesData(data);  
  }

  const reviewSale = async () => {
    const review = true;
    const products = salesProductData.products;

    const data = await SaleService.
      getSales(review, products).
      catch((error) => {
      });
    
      setPreviewSalesData(data);
      setShowReviewSaleModal(true); 
  }

  const addProduct = (event) => {
    event.preventDefault();
    
    const { description, product, quantity } = event.target;
    
    const currenctProductInfo = {
      id: product.value,
      quantity: Number(quantity.value)
    }

    const salesProductDataInfo = {
      ...salesProductData
    };

    salesProductDataInfo.description = description.value;
    salesProductDataInfo.products.push(currenctProductInfo);

    setSalesProductData(salesProductDataInfo);
  };

  const fetchProductsData = async () => {
    const productsData = await ProductService.
      getProducts().
      catch((error) => {
      });

    setProductsData(productsData);    
  }

  const addSale = async () => {
    dispatch(
      storeSale(
        salesProductData.description, salesProductData.products
      )
    ).then(() => {
      setShowReviewSaleModal(false);
      fetchSalesData();

      alert("Sales Added!")
    }); 
  };
  useEffect(() => {    
    fetchProductsData();
    fetchSalesData();
  }, [])

  return (
    <>
    <h1>Sale Page</h1>
    <Form onSubmit={addProduct}>
      <Row className="align-items-center">
        <Row className="align-items-center">

          <Col xs={4} className="my-1">
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" name="description" placeholder="Enter a description" />
            </Form.Group>
          </Col>
        </Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control type="number" name="quantity" placeholder="Integer value e.g. 4" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Label>Product:</Form.Label>
            <Form.Select name="product" aria-label="product type">
              {productsData ? productsData.map((product, index) => (
                <option key={`option-product-types-${index}`} value={product.id}>{product.name}</option>
              )) : alert("Not able to get a products, please add one product (go to /product) and try again")}

            </Form.Select>
        </Col>

        <Col xs="auto">
            <Button variant="secondary" type="submit">
              Add Product to Sale
            </Button>
        </Col>
      </Row>
    </Form>
      
      <h2>Current Sales Infomation</h2>
          Products:
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {salesProductData.products && salesProductData.products.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{productsData.find((item) => product.id == item.id).name}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" type="button" onClick={() => reviewSale()}>
              Review Current Sale
      </Button>
      < hr />
      <h3>All Sales</h3>

      <Container className="mt-4">
          <Row className="d-flex justify-content-center">
          {salesData ? salesData.map((sale, index) => (
            <Card key={`card-product-${index}`} style={{ width: '18rem' }} className="pt-4 m-1">
              <Card.Text key={`card-description-${index}`}>
                Description: {sale.description}
              </Card.Text >
              <Card.Text key={`card-price-${index}`}>
                Total Sale Price: {sale.total_sale_price}
              </Card.Text>
              <Card.Text key={`card-tax-${index}`}>
                Total Sale Taxes: {sale.total_sale_taxes}
              </Card.Text>
              <Card.Body>
                Products:
                <ListGroup variant="flush">
                  {sale.products && sale.products.map((product, index) => (
                    <>
                    <hr />
                    <hr />
                    #{index + 1}
                      <ListGroup.Item key={`card-product-product_name-${index}`}>Product Name: {product.product_name}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-percentage-${index}`}>Tax Percentage: {product.tax_percentage}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-price_per_item-${index}`}>Price per item: {product.price_per_item}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-tax_value_per_item-${index}`}>Tax value per item: {product.tax_value_per_item}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_tax_value-${index}`}>Total tax value: {product.total_tax_value}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_price-${index}`}>Total price: {product.total_price}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_items-${index}`}>Total total Items: {product.total_items}</ListGroup.Item>
                    </>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )) : 'No sale to show at this time, please add one and try again!'}
            
        </Row>
      </Container>

      <Modal show={showReviewSaleModal} onHide={() =>setShowReviewSaleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Preview Sale!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {previewSalesData ?
            <Card className="pt-4 m-1">
              <Card.Body>
              <Card.Text>
                Total Sale Price: {previewSalesData.total_sale_price}
              </Card.Text>
              <Card.Text>
                Total Sale Taxes: {previewSalesData.total_sale_taxes}
              </Card.Text>
                Products:
                <ListGroup variant="flush">
                  {previewSalesData.products && previewSalesData.products.map((product, index) => (
                    <>
                    <hr />
                    #{index + 1}
                      <ListGroup.Item key={`card-product-product_name-${index}`}>Product Name: {product.product_name}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-percentage-${index}`}>Tax Percentage: {product.tax_percentage}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-price_per_item-${index}`}>Price per item: {product.price_per_item}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-tax_value_per_item-${index}`}>Tax value per item: {product.tax_value_per_item}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_tax_value-${index}`}>Total tax value: {product.total_tax_value}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_price-${index}`}>Total price: {product.total_price}</ListGroup.Item>
                      <ListGroup.Item key={`card-product-total_items-${index}`}>Total total Items: {product.total_items}</ListGroup.Item>
                    </>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
           : 'No sale to show at this time, please add one and try again!'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewSaleModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addSale()}>
            Save Sale
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sale;
