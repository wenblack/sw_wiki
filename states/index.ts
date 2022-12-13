import { useState } from "react";

export const [message, setMessage] = useState('');
export function handleChange(event: any) {
    setMessage(event.target.value);
    console.log("Digitado:", event.target.value);
};



export function states() {

}