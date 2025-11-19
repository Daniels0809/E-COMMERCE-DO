'use client'
import { useState } from "react"

interface Props {
    isOpen: boolean;
    onClose: () => void;
}


export default function NewProductModal({isOpen, onClose}: Props){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    if(!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("api/products")
    }

}