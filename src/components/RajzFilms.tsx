import { useState } from "react";
import type { Rajzfilmek } from "../type/rajfilmek"

type RajzfilProps = {
    rajzfilms: Rajzfilmek;
}

export function RajzFilms({rajzfilms} : RajzfilProps){
    const [premier, setPremier] = useState(false);

    return(
        <>
        <h1>{rajzfilms.cim}</h1>
        <p>Megjelnés éve: <b>{rajzfilms.megjelenesEve}</b></p> - {rajzfilms.megjelenesEve < 2000 ? "alma" : "alma2"}

        
        {premier && 
            <p>Premier: {rajzfilms.premier}</p>
        }
        <button onClick={()=>(setPremier(premier))}>{premier ? "van" : "nincs"}</button>
        </>
    )
}