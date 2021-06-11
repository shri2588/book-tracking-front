import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { FaListUl, FaGripHorizontal } from "react-icons/fa";
import {Image} from 'cloudinary-react'

function GridView() {
    
  const [data, setData] = useState([])

  useEffect(() => {
    fetchbook()
  }, [])

  function fetchbook() {
    const requestBody = {
      query: `
                query{
                    
                  getBooks{
                    id
                    bookName
                    bookAuthor
                    bookGenre
                    imageId
                  }
                }

            `
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed')
        }
        return res.json()
      })
      .then(data => {
        setData(data.data.getBooks)

      })
      .catch(err => {
        console.log(err)
      })
  }
  console.log("Data",data)
    return (
        <>
      <Container style={{ marginTop: '30px' }}>
        <Row>
          {
            data.map(d => 
              <Col md={4}>
                <Card style={{height:'400px', marginTop:'20px'}}>
                  <Image cloudName="shri2588" className="d-block w-100" publicId={d.imageId} style={{height:'200px'}}/>
                  <Card.Body>
                    <Card.Title><strong>Book Title:</strong> {d.bookName}</Card.Title>
                    <Card.Title><strong>Book Author:</strong> {d.bookAuthor}</Card.Title>
                    <Card.Title><strong>Book Genre:</strong> {d.bookGenre}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )
          }


        </Row>
      </Container>
      </>
    )
}

export default GridView;