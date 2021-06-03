import { createContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { GetAllTodoAPI, CreateTodoAPI, UpdateTodoAPI, DeleteTodoAPI } from './api'
export const mainContext = createContext()

export default function MainController({ children }) {

    const [todo, setTodo] = useState([])
    const [input, setInput] = useState('')
    const [summary, setSummary] = useState({
        total: 0,
        progress: 0,
        favorite: 0
    })

    useEffect(() => {
        load()
    }, [])

    useEffect(()=>{
        setSummary({
            total:todo.length,
            progress:todo.filter(item=>item.checked === true).length,
            favorite:todo.filter(item=>item.favorite === true).length,
        })
    }, [todo])

    function load() {
        GetAllTodoAPI().then(res => {
            setTodo(res.data.data.map(item => raw_to_data(item)))
            
        }).catch(err => {
            console.error(err)
        })
    }

    async function createHandle() {
        await CreateTodoAPI(data_to_raw({
            id: uuid(),
            value: input,
            favorite: false,
            checked: false
        }))
        setInput('')
        return load()
    }

    async function updateHandle(id, value) {
        await UpdateTodoAPI(id, { name: value })
        return load()
    }

    async function checkHandle(id, value) {
        await UpdateTodoAPI(id, { progress:!value })
        return load()
    }

    async function favoriteHandle(id, value) {
        await UpdateTodoAPI(id, { favorite:!value })
        return load()
    }

    async function deleteHandle(id) {
        await DeleteTodoAPI(id)
        return load()
    }

    function raw_to_data(data) {
        return {
            id: data.uuid,
            value: data.name,
            favorite: data.favorite,
            checked: data.progress
        }
    }

    function data_to_raw(data) {
        return {
            uuid: data.id,
            name: data.value,
            favorite: data.favorite,
            progress: data.progress
        }
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