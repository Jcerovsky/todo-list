import React from 'react'
import {Todo} from '../model'
import './styles.css'
import {IndividualTodo} from "./IndividualTodo";
import {Droppable} from "react-beautiful-dnd";


interface Props {
    allTodos: Todo[],
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({allTodos, setAllTodos, completedTodos, setCompletedTodos} : Props) => {


    return (

        <div className="container">

            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver? "dragactive" : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Active tasks</span>
                            {allTodos?.map((todo, index) => (
                                <IndividualTodo
                                    todo={todo}
                                    key={todo.id}
                                     allTodos={allTodos}
                                    setAllTodos={setAllTodos}
                                    index={index}
                                />))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

            <Droppable droppableId="TodosRemove">
                {
                    (provided,snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver? "dragremove" : ''}`}
                             ref={provided.innerRef}
                             {...provided.droppableProps} >
                            <span className="todos__heading">Completed tasks</span>
                            {completedTodos?.map((todo, index) => (
                                <IndividualTodo
                                    todo={todo}
                                    key={todo.id}
                                    allTodos={completedTodos}
                                    setAllTodos={setCompletedTodos}
                                    index={index}
                                />
                            ))}

                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
        </div>


    )
}

export {TodoList}