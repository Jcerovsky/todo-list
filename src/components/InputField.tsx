import React, {useRef} from 'react'
import './styles.css'


interface Props {
    todo: string,
    setTodo:  React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

export default function InputField({todo, setTodo, handleAdd}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <form className="input" onSubmit={(e) => {
                handleAdd(e)
                inputRef.current?.blur()
                inputRef.current?.focus()

            }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter a task"
                    className="input__field"
                    value={todo}
                    onChange={
                        (e) => setTodo(e.target.value)
                    }/>
                <button className="input__button">Add</button>
            </form>
        </div>
    )
}
