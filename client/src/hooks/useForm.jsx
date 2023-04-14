import { useState } from "react";

function useForm(shape) {
    const [form, setForm] = useState(shape);

    const handleInput = (e) => {
        setForm(prevForm => ({...prevForm, [e.target.name]: e.target.value }));
    }

    return [form, handleInput];
}

export default useForm;