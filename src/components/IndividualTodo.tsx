import React, {useEffect, useRef, useState} from 'react'
import {Todo} from "../model";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import './styles.css'
import {Draggable} from "react-beautiful-dnd";

type Props = {
    todo: Todo,
    allTodos: Todo[],
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index:number
}

export const IndividualTodo: React.FC<Props> = ({todo, allTodos, setAllTodos, index} : Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editText, setEditText] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setAllTodos(allTodos.map((todo) => todo.id === id? {...todo, isDone:!todo.isDone}:todo
            )
        )
    }

    const handleDelete = (id:number) => {
        setAllTodos(allTodos.filter(item => item.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()

        setAllTodos(allTodos.map(todo => (
            todo.id === id? {...todo, todo: editText}: todo
        )))

        setEdit(false )
    }

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [edit])


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                    <form
                        className="todos__single"
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit? (
                                <input ref={ref} type='text' value={editText} onChange={(e) => {setEditText(e.target.value)}} className="todos__single--text"/>
                            ): (

                                todo.isDone? (
                                    <s className="todos__single--text" >{todo.todo}</s>
                                ) : (
                                    <span className="todos__single--text">{todo.todo}</span>
                                )

                            )
                        }
                        <div>
                <span className='icon'>
                    <AiFillEdit onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit)
                        }
                    }}/>
                </span>
                            <span className='icon'>
                      <AiFillDelete onClick={() => {handleDelete(todo.id)}}/>
                </span>
                            <span className='icon'>
                    <MdDone onClick={() => {handleDone(todo.id)}}/>
                </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}