import axios from "axios"

export const register = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post("api/register", {
            name,
            email,
            password
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}