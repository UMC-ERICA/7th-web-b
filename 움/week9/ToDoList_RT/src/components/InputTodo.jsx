import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import styles from './InputTodo.module.css';

export default function InputTodo() {
    const [todolist, setTodolist] = useState('');
    const dispatch = useDispatch();

    function handleText(e) {
        setTodolist(e.target.value);
    }

    function onReset() {
        setTodolist('');
    }

    return (
        <form
            className={styles.formContainer}
            onSubmit={(e) => {
                e.preventDefault();
                if (todolist.trim()) {
                    dispatch(add(todolist));
                    onReset();
                }
            }}
        >
            <input
                className={styles.textbar}
                type="text"
                value={todolist}
                onChange={handleText}
                placeholder="Add a new task"
            />
            <input className={styles.submitbutton} type="submit" value="+" />
        </form>
    );
}
