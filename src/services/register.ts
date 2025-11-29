import axios from "axios"

interface RegisterResponse {
    massage: string;
    userId: string;
}

export const register = async (name: string, email: string, pass: string): Promise<RegisterResponse> => {
    try {
        const res = await axios.post<RegisterResponse>("api/register", {
            name,
            email,
            pass,
            role: "user",
        });


        return res.data
    } catch (error) {
        console.log("Error: ", error)

        throw new Error("Fallo en la conexion")
    }
}