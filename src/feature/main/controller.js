import { createContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
export const mainContext = createContext()

export default function MainController({ children }) {

    const [todo, setTodo] = useState([])
    const [input, setInput] = useState('')
    const [summary, setSummary] = useState({
        total:0,
        progress:0,
        favorite:0
    })

    useEffect(() => {
        setSummary({
            total:todo.length,
            progress:todo.filter(item=>item.checked).length,
            favorite:todo.filter(item=>item.favorite).length
        })
    }, [todo])

    function createHandle() {
        setTodo([
            ...todo,
            {
                id: uuid(),
                value: input,
                favorite: false,
                checked: false
            }
        ])
        return setInput('')
    }

    function updateHandle(id, value) {
        return setTodo(
            todo.map(item =>
                item.id === id ? ({
                    ...item,
                    value: value
                }) : (item)
            )
        )
    }

    function checkHandle(id) {
        return setTodo(
            todo.map(item =>
                item.id === id ? ({
                    ...item,
                    checked: !item.checked
                }) : (item)
            )
        )
    }

    function favoriteHandle(id) {
        return setTodo(
            todo.map(item =>
                item.id === id ? ({
                    ...item,
                    favorite: !item.favorite
                }) : (item)
            )
        )
    }

    function deleteHandle(id) {
        return setTodo(
            todo.filter(item => (item.id !== id))
        )
    }

    return (
        <mainContext.Provider
            value={{
                todo,
                input, setInput,
                createHandle, checkHandle, favoriteHandle, deleteHandle, updateHandle, summary
            }}
        >
            {children}
        </mainContext.Provider>
    )
}