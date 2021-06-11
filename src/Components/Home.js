import React, {useState}  from 'react';
import { Jumbotron, Container, Row, Col, Button} from 'react-bootstrap';
import { FaListUl, FaGripHorizontal } from "react-icons/fa";
import GridView from './GridView'
import ListView from './ListView'

function Home() {

  const [grid, setGrid] = useState(true)
  const [list, setList] = useState(false)

  return (
    <>
      <Jumbotron>
        <h1 style={{ textAlign: 'center' }}>Book Tracking App</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Button onClick={()=>{
              setGrid(false)
              setList(true)
            }}><FaListUl /></Button>
            <Button style={{ marginLeft: '10px' }} onClick={()=>{
              setGrid(true)
              setList(false)
            }}><FaGripHorizontal /></Button>
          </Col>

        </Row>
        {
          grid ? <GridView/> :
          <ListView/>
        }
      </Container>

      


    </>
  )
}

export default Home;