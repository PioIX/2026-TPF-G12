"use client"
export default function Input({idInput, text, onChange}) {
    return (
        <input id={idInput} placeholder={text} type="text" onChange={onChange}></input>
    )
}