"use client"
export default function Input({id, text, onChange}) {
    return (
        <input id={id} placeholder={text} type="text" onChange={onChange}></input>
    )
}