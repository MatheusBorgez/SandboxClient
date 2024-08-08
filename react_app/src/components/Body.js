import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import MainGrid from './MainGrid';
import ModalInsert from './ModalInsert';
import api from "../services/api";

function Body() {

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api
          .get()
          .then((response) => setData(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <>
            <div class="text-white">

                <Button variant="primary" onClick={handleShow}>
                    Cadastrar
                </Button>

                <ModalInsert show={show} handleClose={handleClose} />

                <MainGrid data={data}>
                </MainGrid>
            </div>
        </>
    )
}

export default Body;