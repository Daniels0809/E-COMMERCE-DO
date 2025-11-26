export interface LoginProps {
    email: string;
    pass: string;
}


export interface ProductProps {
    name: string;
    category: string;
    price: number;
    image: string | File;
    stock: number;
    description: string;
    createdAt: string;
}