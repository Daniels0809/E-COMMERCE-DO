import {create} from "zustand";

interface PersonState{

    firstname: string;
    lastname: string;

}

interface Actions {

    setFirstname(value: string): void;
    setLastname(value: string): void;
}



export const usePersonStore = create<PersonState & Actions>()((set) => ({
    firstname: "",
    lastname: "",

    setFirstname: (value: string) => set( state => ({ firstname: value })),
    setLastname: (value: string) => set(state => ({ lastname: value })),
}))