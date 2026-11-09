import { useState } from "react";
import type { Rajzfilmek } from "../type/rajfilmek";
import 'bootstrap/dist/css/bootstrap.min.css'

type Rajzfilmprops = {
  rajzfil: Rajzfilmek;
};

export function RajzfilmKartya({ rajzfil }: Rajzfilmprops) {
  const [premierlathato, setPremierLathato] = useState(true);

  return (
    <>
      <h2>{rajzfil.cim}</h2>
      <p>
        Studio: {rajzfil.studio}
        <i></i>
      </p>
      <p>
        Megjelenés éve: <b>{rajzfil.megjelenesEve}</b>
      </p>
      {premierlathato && <p>Premier: {rajzfil.premier}</p>}
      <button onClick={() => setPremierLathato(!premierlathato)}>
        {premierlathato ? "Premier elrejtése" : "premier megjelenítése"}
      </button>
    </>
  );
}
