import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalDelete({ show, handleClose, selectedMovie, handleDelete }) {

    const onDelete = () => {

        if (selectedMovie === '' && show) {
            return;
        }

        handleDelete()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="bg-dark text-white">
                    <h3>Tem certeza que deseja deletar este filme?</h3>
                </Modal.Body>

                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button type="submit" variant="primary" onClick={() => { onDelete(); handleClose(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete;
