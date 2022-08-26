import React, { useState, useEffect } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Header from '../header/header';
import './todos_list.css'

// import { DBConfig } from '../DBConfig';
// import { initDB } from 'react-indexed-db';

// initDB(DBConfig);


const TodosList = () => {
    const { getAll } = useIndexedDB('TodosList');
    const { update } = useIndexedDB('TodosList');
    const [due_dateInput, setdue_dateInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [show_list, setShow_list] = useState();
    const [show_down_check, setShow_down_check] = useState(false);
    let disabledButton = true;

    useEffect(() => {
        setList(due_dateInput);
    }, [show_down_check]);

    useEffect(() => {
        setList(due_dateInput);
    }, [due_dateInput]);

    useEffect(() => {
        setList(due_dateInput);
    }, [todos]);

    function HandleChange(e) {
        setdue_dateInput(e.target.value);
    }

    function showdone() {
        setShow_down_check(!show_down_check);
    }

    function changeDue_date(difference) {
        let date = new Date(due_dateInput);
        let newdate = new Date();
        newdate.setDate(date.getDate() + difference);
        newdate = dateToString(newdate);
        setdue_dateInput(newdate);
    }
    function dateToString(date) {
        let year = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month < 10 ? month = '0' + month.toString() : month = month.toString();
        day < 10 ? day = '0' + day.toString() : day = day.toString();
        let strdate = year + '-' + month + '-' + day;
        return strdate;
    }

    function setList(date) {
        let new_list = [];
        todos.forEach(todo => {
            if (todo.due_date == date) {
                if (show_down_check == true) {
                    new_list.push(todo);
                }
                else if (todo.done == false) {
                    new_list.push(todo);
                }
            }
        });
        setShow_list(new_list);
    }

    function doneTodo(todo) {
        const todoUpdate = {
            title: todo.title,
            due_date: todo.due_date,
            done: !todo.done,
            id: todo.id
        };
        update(todoUpdate).then(event => {
            alert('Edited!');
            getAll().then(TodosListFromDB => {
                setTodos(TodosListFromDB);
            });
        });
    };

    useEffect(() => {
        getAll().then(TodosListFromDB => {
            setTodos(TodosListFromDB);
        });
    }, []);

    return (
        <div>
            <Header />
            <div className='formTag col-sm-4 offset-sm-4'>
                <div className='checkbox'>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Show all todos"
                        onChange={() => showdone()}
                    />
                </div>
                <div className='dateControl'>
                    <Button variant="primary" size="sm"
                        {...due_dateInput == '' ? disabledButton = true : disabledButton = false}
                        disabled={disabledButton}
                        onClick={() => changeDue_date(-1)}>
                        pre
                    </Button>
                    <Form.Control className='dateControl' type="date" name="dueDate"
                        value={due_dateInput}
                        onChange={e => HandleChange(e)} />
                    <Button variant="primary" size="sm"
                        {...due_dateInput == '' ? disabledButton = true : disabledButton = false}
                        disabled={disabledButton}
                        onClick={() => changeDue_date(1)}>
                        next
                    </Button>
                </div>
            </div>
            <div className='tabletag col-sm-6 offset-sm-3'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {show_list?.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.due_date}</td>
                                <td>
                                    <Form.Check
                                        type='checkbox'
                                        checked={todo.done}
                                        onChange={() => doneTodo(todo)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div >
    );
}

export default TodosList;