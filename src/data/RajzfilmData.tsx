import { useEffect, useState } from "react";
import type { Rajzfilmek } from "../type/rajfilmek";
import { RajzfilmKartya } from "../components/Rajzfilmek";
import "bootstrap/dist/css/bootstrap.min.css";

export function RajzfilmLista() {
  const URL = "./public/rajzfilmek.json";

  const [rajzfilms, setRajzfilms] = useState<Rajzfilmek[]>([]);

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

  return (
    <>
      <div className="container">
        <h1>Rajzfilmek</h1>
        <h3>Filmek száma: {RajfilmekSzama}</h3>

        <div className="row">
          {rajzfilms?.map((rajzfilm) => (
            <div className="col-sm-4" key={rajzfilm.id}>
              <RajzfilmKartya rajzfil={rajzfilm}></RajzfilmKartya>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
