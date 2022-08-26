import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './new_todo.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../header/header';
import { useIndexedDB } from 'react-indexed-db';
import { DBConfig } from '../DBConfig';
import { initDB } from 'react-indexed-db';

initDB(DBConfig);
const NewTodo = () => {
    const { add } = useIndexedDB('TodosList');
    const [due_dateInput, setdue_dateInput] = useState('');
    const [titleInput, settitleInput] = useState('');
    const handle_submit = (event) => (
        event.preventDefault());

    const handleChange = (inputName, e) => (
        (inputName == 'Date') ? setdue_dateInput(e.target.value) : settitleInput(e.target.value))

    const add_data = () => {
        if (titleInput != '' && due_dateInput != '') {
            add({ title: titleInput, due_date: due_dateInput, done: false }).then(
                event => {
                    settitleInput('');
                    setdue_dateInput('');
                },
                error => {
                    console.log(error);
                }
            );

        }
    }

    return (
        <div>
            <Header />
            <Form className='formTag col-sm-4 offset-sm-4' onSubmit={handle_submit}>
                <Form.Group className="group" controlId="formBasicEmail">
                    <Form.Label className='label'>Title</Form.Label>
                    <Form.Control className='input' type="text" placeholder="Enter title"
                        value={titleInput}
                        onChange={e => handleChange('Title', e)} />
                </Form.Group>

                <Form.Group className="group" controlId="formBasicPassword">
                    <Form.Label className='label'>Date</Form.Label>
                    <Form.Control className='input' type="date" name="dueDate"
                        value={due_dateInput}
                        onChange={e => handleChange('Date', e)} />
                </Form.Group>
                <div className='buttonDiv'>
                    <Button variant="primary" type="submit" onClick={add_data}>
                        Add Todo
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default NewTodo;