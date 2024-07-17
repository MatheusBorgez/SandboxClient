import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function MainGrid() {
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    Coluna 1
                </Col>
                <Col xs={6} md={8}>
                    Coluna 2
                </Col>
            </Row>
        </Container>
    );
}

export default MainGrid;
