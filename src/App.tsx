import React, {useEffect, useState} from 'react';
import './App.css';
import InputField from "./components/InputField";
import {Todo} from './model'
import {TodoList} from "./components/TodoList";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
const App: React.FC = () => {


  const [todo, setTodo] = useState<string>('')
  const [allTodos, setAllTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setAllTodos([...allTodos, {id:Date.now(), todo: todo, isDone: false}])
      setTodo('')
    }

  }

    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const onDragEnd = (result: DropResult) => {
      const {source, destination } = result

      if (!destination){
        return
      }

      if (destination.droppableId === source.droppableId && destination.index == source.index)  {
        return;
      }
      let add
      const active = allTodos
      const complete = completedTodos

      if (source.droppableId === 'TodosList') {
        add = active[source.index]
        active.splice(source.index, 1)
      } else {
        add = complete[source.index]
        complete.splice(source.index, 1)
      }

      if (destination.droppableId === 'TodosList') {
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add)
      }
      setCompletedTodos(complete)
      setAllTodos(active)
    }

    useEffect(() => {
       // @ts-ignore
        const savedItems = JSON.parse(localStorage.getItem('todolist'))

        if (savedItems) {
            setAllTodos(savedItems)
            }

        }, [])




    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(allTodos))
    }, [allTodos])


  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <div className="App">
            <span className="heading">Donezo</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList allTodos={allTodos} setAllTodos={setAllTodos}
            completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
          </div>
      </DragDropContext>
  );
}

export default App;
