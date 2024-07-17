import React from "react";
import Button from 'react-bootstrap/Button';
import MainGrid from './MainGrid';

function Body() {
    return (

        <div class="text-white">
            <MainGrid>
            </MainGrid>

            <form class="col-md-12">
                <div className='input-block'>
                    <label htmlFor='title'>titulo teste</label>
                    <input />
                </div>
                <div className='input-block'>
                    <label htmlFor='nota'>anotação</label>
                    <textarea></textarea>
                </div>
                <Button type='submit'>salvar</Button>
            </form>
        </div>
    )
}

export default Body;