import axios from 'axios';
import { LoginProps } from '../types';

// const url = 'http://localhost:3000/api/properties';

export const getProperties = async () => {
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


export const editProperty = async ( id:string, name: string, value: number, img: string) => {
    
    try{
        const response = await axios.put(`http://localhost:3000/api/properties/${id}`, {
        name: name,
        value: value,
        img: img
        
    })
    console.log('Response:', response.data)
    }
    catch(error)  {
        console.log('Error: ',error)
    }
}


// try
// catch-finally



