import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ModalMaisInformacoes from './ModalMaisInformacoes'

function MainGrid({ data }) {

  const [selectedMovie, setSelectedMovie] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
              <td>{item.duration}</td>
              <td>{item.imdb}</td>
              <td>
                {new Date(item.releaseDate).toLocaleDateString('pt-BR')}
              </td>
              <td>
                <Button variant="secondary" onClick={() => {setSelectedMovie(item._id); setShow(true)}}>...</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalMaisInformacoes selectedMovie={selectedMovie} show={show} handleClose={handleClose}/>

    </>
  );
}

export default MainGrid;
