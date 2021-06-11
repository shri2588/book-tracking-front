import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { Image } from 'cloudinary-react'

function ListView() {

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
  console.log("Data", data)
  return (
    <>
      <Container style={{ marginTop: '30px' }}>
        <Row>
          <Col>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Book Title</th>
                  <th>Book Author</th>
                  <th>Book Genre</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(d =>
                    <tr>
                      <td><Image cloudName="shri2588" className="mx-auto d-block" publicId={d.imageId} style={{width:'100px', height:'100px'}}/></td>
                      <td>{d.bookName}</td>
                      <td>{d.bookAuthor}</td>
                      <td>{d.bookGenre}</td>
                    </tr>
                  )
                }

              </tbody>
            </Table>
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default ListView;