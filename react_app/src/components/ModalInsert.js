import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api'

function ModalInsert({ show, handleClose, selectedMovie, isEdit, handleNewData }) {

    const handleSubmit = (e) => {

        if (selectedMovie === '' && show) {
            return;
        }

        if (formData._id !== '') {
            api.put(`/movies/${formData._id}`, formData)
                .then(response => {
                    console.log('Sucesso!', response.data)
                    handleNewData(response.data)
                }).catch((err) => {
                    console.error("erro:", err);
                });
                return;
        }

        api.post('/movies', formData)
            .then(response => {
                console.log('Sucesso!', response.data)
                handleNewData(response.data)
                handleClose()
            }).catch((err) => {
                console.error("erro:", err);
            });
    };

    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        duration: '',
        genre: '',
        imageUrl: '',
        description: '',
        releaseDate: new Date(),
        imdb: '',
    })

    const getSelectedMovie = () => {
        if (isEdit) {

            api.get(`/movies/${selectedMovie}`)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered onEnter={getSelectedMovie}>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>{isEdit ? 'Editar' : 'Adicionar'} filme</Modal.Title>
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
                        <Form.Group controlId="formImdb">
                            <Form.Label>IMDB</Form.Label>
                            <Form.Control
                                type="number"
                                name="imdb"
                                value={formData.imdb}
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