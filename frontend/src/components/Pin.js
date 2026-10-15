"use client"

export default function Pin({link, me_gusta, onclick}) {

    
    return (
        <div>
            <img src={link}></img>
            <p>{me_gusta}</p>
            <button onClick={onclick}>Ir al pin</button>
        </div>
    );
}