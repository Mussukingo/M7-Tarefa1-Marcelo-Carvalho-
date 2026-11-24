import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [informacao, setInformacao] = useState(null);

  useEffect(() => {
    async function carregarFeriados() {
      try {
        const resposta = await fetch("https://caldays.com/api/holidays/PT", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!resposta.ok) {
          throw new Error("Erro ao obter dados da API.");
        }

        const dados = await resposta.json();

        setInformacao({
          country: dados.country,
          year: dados.year,
          count: dados.count,
        });

        setFeriados(dados.holidays);
      } catch (error) {
        setErro("Não foi possível carregar os feriados.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarFeriados();
  }, []);

  if (loading) {
    return <h2>A carregar feriados...</h2>;
  }

  if (erro) {
    return <p className="erro">{erro}</p>;
  }

  return (
    <>
      <div className="head_card">
        <h1>Feriados em Portugal</h1>

        {informacao && (
          <h2>
            País: {informacao.country} | Ano: {informacao.year} | Total:{" "}
            {informacao.count}
          </h2>
        )}
      </div>
      <div className="container">
      <div className="lista">
        {feriados.map((feriado, index) => (
          <div className="card" key={index}>
            <h3>{feriado.name}</h3>
            <p>Data: {feriado.date}</p>
          </div>
        ))}
        </div>
      </div>
      </>
  );
}

export default App;
