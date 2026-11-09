import { useEffect, useState } from "react";
import type { Rajzfilmek } from "../type/rajfilmek";
import { RajzfilmKartya } from "../components/Rajzfilmek";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  <div className="container">

    <div className="text-center mb-5">
      <h1 className="text-warning">
        Rajzfilmek világa
      </h1>
      <p className="text-secondary fs-5">
        Fedezd fel a legjobb rajzfilmeket!
      </p>
      <hr className="w-25 mx-auto border-primary border-2" />
    </div>

    <div className="row g-4 mb-5">
      {rajzfilms?.map((rajzfilm) => (
        <div className="col-12 col-sm-6 col-lg-4" key={rajzfilm.id}>
          <RajzfilmKartya rajzfil={rajzfilm} />
        </div>
      ))}
    </div>

    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body p-4 text-center">

        <h2 className="fw-bold mb-3">
          <i className="bi bi-bar-chart-fill text-primary me-2"></i>
          Statisztikák
        </h2>

        <div className="bg-light rounded-3 py-3 mb-4">
          <h5 className="text-secondary mb-1">
            Összes rajzfilm száma
          </h5>
          <h2 className="fw-bold text-primary mb-0">
            {RajfilmekSzama}
          </h2>
        </div>

        <p className="text-secondary">
          Válaszd ki, melyik rajzfilmet szeretnéd megtekinteni!
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-outline-primary px-4 py-2 rounded-pill"
            onClick={getOldestDate}
          >
            <i className="bi bi-hourglass-top me-2"></i>
            Legrégebbi
          </button>

          <button
            className="btn btn-primary px-4 py-2 rounded-pill"
            onClick={getNewestDate}
          >
            <i className="bi bi-stars me-2"></i>
            Legújabb
          </button>
        </div>

      </div>
    </div>
      <br />
    {kivalasztott && (
      <div className="mt-5">
        <h3 className="fw-bold text-center mb-4">
          Kiválasztott rajzfilm
        </h3>

        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-lg-4">
            <RajzfilmKartya rajzfil={kivalasztott} />
          </div>
        </div>
      </div>
    )}

  </div>
);
}
