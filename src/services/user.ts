import axios from 'axios';
import { LoginProps } from '../types';

// const url = 'http://localhost:3000/api/properties';

export const getUsers = async () => {
    const response = await axios.get('/api/users');
    console.log(response.data.data)

    return response.data
}


export const login = async ({email,pass}: LoginProps) => {

    const response = await axios.post('/api/users', {
        email: email,
        pass: pass
    } )

    return response.data.data
}


export const editUsers = async ( id:string, name: string, email: string, pass: string) => {
    
    try{
        const response = await axios.put(`/api/users/${id}`, {
        name: name,
        email: email,
        pass: pass
        
    })
    console.log('Response:', response.data)
    }
    catch(error)  {
        console.log('Error: ',error)
    }
}


export const deleteUser = async ( id: string ) => {

    try {
        const response = await axios.delete(`/api/users`, {params: {id}})
        return response.data

    }
    catch (error) {
        console.log(error)
        throw error;
        
    }
}

// try
// catch-finally



