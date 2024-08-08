import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalInsert({ show, handleClose, handleSave }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
        handleClose();
    };

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        genre: '',
        imageUrl: '',
        description: '',
        releaseDate: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Adicione um filme</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark text-white">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReleaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>URL da Imagem</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Sinopsis</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button type="submit" variant="primary" onClick={() => { handleSubmit(); handleClose(); }}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalInsert;