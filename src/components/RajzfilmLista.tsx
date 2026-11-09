import { useEffect, useState } from "react";
import type { Rajzfilmek } from "../type/rajfilmek";
import { RajzfilmKartya } from "../components/Rajzfilmek";
import "bootstrap/dist/css/bootstrap.min.css";

export function RajzfilmLista() {
  const URL = "./src/data/rajzfilmek.json";

  const [rajzfilms, setRajzfilms] = useState<Rajzfilmek[]>([]);
  const [kivalasztott, setKivalasztott] = useState<Rajzfilmek | null>(null);

  useEffect(() => {
    async function Adatbetoltes() {
      try {
        const valasz = await fetch(URL);
        const adatok: Rajzfilmek[] = await valasz.json();
        setRajzfilms(adatok);
      } catch (err) {
        console.error(err);
      }
    }
    Adatbetoltes();
  }, []);

  const RajfilmekSzama = rajzfilms?.length;
  const getOldestDate = () => {
    const sorted = [...rajzfilms].sort((a, b) => {
      return new Date(a.megjelenesEve).getTime() - new Date(b.megjelenesEve).getTime();
    });

    setKivalasztott(sorted[0]);
  };

  const getNewestDate = () => {
    const sorted = [...rajzfilms].sort((a, b) => {
      return new Date(b.megjelenesEve).getTime() - new Date(a.megjelenesEve).getTime();
    });

    setKivalasztott(sorted[0]);
  };

  return (
    <>
      <div className="container">
        <h1>Rajzfilmek</h1>

        <div className="row">
          {rajzfilms?.map((rajzfilm) => (
            <div className="col-sm-4" key={rajzfilm.id}>
              <RajzfilmKartya rajzfil={rajzfilm}></RajzfilmKartya>
            </div>
          ))}
        </div>
        <br />
        <br />
        <h1>Statisztikák</h1>
        <h3>Filmek száma: {RajfilmekSzama}</h3>
        <button onClick={()=>(getOldestDate())}>Legrégebbi</button>
        <button onClick={()=>(getNewestDate())}>Legújabb</button>
        <div className="row">
          {kivalasztott && (
            <div className="col-sm-4" key={kivalasztott.id}>
              <RajzfilmKartya rajzfil={kivalasztott} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
