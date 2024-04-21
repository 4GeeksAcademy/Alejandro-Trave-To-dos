import React, { useState, useEffect } from "react";

const List = () => {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null); //para ocultar la X
    const [placeholder, setPlaceholder] = useState("Añadir nueva tarea");
    const [numTodos, setNumTodos] = useState(todoList.length);
    const [nameTarea, setNameTarea] = useState('tareas');

    function addTodo() {
        setTodoList([...todoList, inputValue]);
        setInputValue('');
    }

    function eraseTodo(index) {
        const updatedTodoList = todoList.filter((_, i) => i !== index);
        setTodoList(updatedTodoList);
    }

    useEffect(() => {
        todoList.length === 0 ? setNumTodos('Sin') : setNumTodos(todoList.length);
        todoList.length === 1 ? setNameTarea('tarea') : setNameTarea('tareas');
        todoList.length === 0 ? setPlaceholder('Añade una tarea') : setPlaceholder('Añade otra tarea');
    }, [todoList]);

    return (
        <div className="col d-flex justify-content-center list">
            <form>
                <div className="row shadow p-3 rounded">
                    <input
                        type="text"
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue}
                        placeholder={placeholder}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTodo();
                            }
                        }}
                    />
                </div>
                {todoList.map((toDo, index) => (
                    <div
                        key={index}
                        className="row shadow todos"
                        onMouseOver={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <p className="item">
                            {toDo}
                            {hoverIndex === index && (
                                <span onClick={() => eraseTodo(index)} className="float-end p-0 m-0 erase">x</span>
                            )}
                        </p>
                    </div>
                ))}
                <div className="row shadow-sm foot">
                    <p className="m-1">{numTodos} {nameTarea} por hacer</p>
                </div>
            </form>
        </div>
    );
};

export default List;
