import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from "../services/api"

function ModalMaisInformacoes({ selectedMovie, show, handleClose }) {

    const [foundMovie, setFoundMovie] = useState({});

    useEffect(() => {

        if (selectedMovie === '') {
            return;
        }

        api.get(selectedMovie)
           .then((response) => setFoundMovie(response.data))
           .catch((err) => {
               console.error("ops! ocorreu um erro" + err);
           });
    }, [selectedMovie]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>{foundMovie.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark text-white">
                    <p>{foundMovie.description}</p>
                    <img alt='' src={foundMovie.imageUrl} />
                </Modal.Body>

                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalMaisInformacoes;