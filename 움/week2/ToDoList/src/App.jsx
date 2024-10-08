import { useState } from 'react';
import './App.css';
import Button from './components/Button'; // Button 컴포넌트 import
import Input from './components/Input';   // Input 컴포넌트 import

function App() {
    const [todos, setTodos] = useState([
        {id: 1, task: '투두 만들어보기'},
        {id: 2, task: '희연 혜원 혜윤 건 찬민'}
    ]);
    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // 1. 추가하기
    const addTodo = () => {
        setTodos((prev) => [
            ...prev,
            {id: Math.floor(Math.random() * 100) + 2, task: text}
        ]);
        setText('');
    };

    // 2. 삭제하기
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    };

    // 3. 수정하기
    const updateTodo = (id, text) => {
        setTodos((prev) =>
            prev.map((item) => (item.id === id ? { ...item, task: text } : item))
        );
        setEditingId('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
                <Button onClick={addTodo} type="submit">
                    할 일 등록
                </Button>
            </form>

            <div className="todo-list">
                {todos.map((todo) => (
                    <div key={todo.id} className="todo-item">
                        {editingId !== todo.id ? (
                            <div className="todo-text">
                                <p>{todo.id}. {todo.task}</p>
                            </div>
                        ) : (
                            <div className="todo-text">
                                <p>{todo.id}. </p>
                                <Input
                                    defaultValue={todo.task}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            </div>
                        )}
                        <Button onClick={() => deleteTodo(todo.id)}>
                            삭제하기
                        </Button>
                        {editingId === todo.id ? (
                            <Button onClick={() => updateTodo(editingId, editText)}>
                                수정 완료
                            </Button>
                        ) : (
                            <Button onClick={() => setEditingId(todo.id)}>
                                수정 진행
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
