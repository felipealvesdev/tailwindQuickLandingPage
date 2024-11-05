import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Chart } from "@/components/Chart/Chart";
import { ReadingsProps } from "@/interfaces/ApiResponse";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// interface DataType {
//   id: number;
//   name: string;
// }

export default function Reading() {
  const { id } = useParams();
  const token = import.meta.env.VITE_API_TOKEN;
  const apiUrl = import.meta.env.VITE_API_URL_STATIONS_ID;
  const [graphType, setGraphType] = useState("T");

  const { data, loading, error } = useFetch(`${apiUrl}${id}`, token);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

  const handleGraphType = (type: string) => {
    setGraphType(type);
    return;
  };
  return (
    <div>
      <h1>Gráfico {id}</h1>
      {data && <h1>Dados carregados da api</h1>}
      <div className="z-20">
        {graphType && (
          <Chart
            data={data!.readings.filter((reading: ReadingsProps) => {
              return reading.type === graphType;
            })}
          />
        )}
        <div className="mt-12 w-full flex items-center justify-center space-x-4">
          <Button
            onClick={() => handleGraphType("T")}
            disabled={graphType === "T"}
          >
            Temperatura
          </Button>
          <Button
            onClick={() => handleGraphType("P")}
            disabled={graphType === "P"}
          >
            Pressão
          </Button>
          <Button
            onClick={() => handleGraphType("U")}
            disabled={graphType === "U"}
          >
            Umidade
          </Button>
          <Button
            onClick={() => handleGraphType("A")}
            disabled={graphType === "A"}
          >
            Altura
          </Button>
          <Button
            onClick={() => handleGraphType("L")}
            disabled={graphType === "L"}
          >
            Luminosidade
          </Button>
        </div>
      </div>
    </div>
  );
}
