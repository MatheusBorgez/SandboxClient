import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ModalMaisInformacoes from './ModalMaisInformacoes'
import ModalInsert from './ModalInsert'
import ModalDelete from './ModalDelete';
import api from '../services/api';

function MainGrid({ data, updateData }) {

  const [selectedMovie, setSelectedMovie] = useState("");

  const [showMaisInformacoes, setShowMaisInformacoes] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    api.delete(`/${selectedMovie}`)
      .then(response => {
        console.log('Sucesso!', response.data)
      }).catch((err) => {
        console.error("erro:", err);
      });
      const updatedData = data.filter(item => item._id !== selectedMovie)
    updateData(updatedData);
  }

  const handleEditData = (editData) => {
    const updatedData = data.filter(item => item._id !== selectedMovie)
    updatedData.push(editData)
    updateData(updatedData)
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Duração</th>
            <th>Imdb</th>
            <th>Data de lançamento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.genre}</td>
              <td>{item.duration} minutos</td>
              <td>{item.imdb}</td>
              <td>
                {new Date(item.releaseDate).toLocaleDateString('pt-BR')}
              </td>
              <td>
                <Button variant='' className='btn-primary' onClick={() => { setSelectedMovie(item._id); setShowMaisInformacoes(true) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </Button>
                <Button variant='' className="btn-warning ms-1" onClick={() => { setSelectedMovie(item._id); setShowInsert(true); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </Button>
                <Button variant='' className="btn-danger ms-1" onClick={() => { setSelectedMovie(item._id); setShowDelete(true); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalMaisInformacoes show={showMaisInformacoes} selectedMovie={selectedMovie} handleClose={() => setShowMaisInformacoes(false)} />
      <ModalInsert show={showInsert} selectedMovie={selectedMovie} handleClose={() => setShowInsert(false)} isEdit={showInsert} handleNewData={handleEditData} />
      <ModalDelete show={showDelete} selectedMovie={selectedMovie} handleClose={() => setShowDelete(false)} handleDelete={handleDelete} />

    </>
  );
}

export default MainGrid;
