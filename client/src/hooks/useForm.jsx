import { useState } from "react";

function useForm(shape, reference) {
    const [form, setForm] = useState(shape);

    const handleInput = (e) => {
        setForm(prevForm => ({...prevForm, [e.target.name]: e.target.value }));
    }

    const clearForm = () => {
        setForm(shape);
    }

    return [form, handleInput, clearForm];
}

export default useForm;