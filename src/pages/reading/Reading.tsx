import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Chart } from "@/components/Chart/Chart";
import { ReadingsProps } from "@/interfaces/ApiResponse";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveDown, MoveUp } from "lucide-react";

// interface DataType {
//   id: number;
//   name: string;
// }

export default function Reading() {
  const { id } = useParams();
  const token = import.meta.env.VITE_API_TOKEN;
  const apiUrl = import.meta.env.VITE_API_URL_STATIONS_ID;
  const [graphType, setGraphType] = useState("T");
  const [periodFilter, setPeriodFilter] = useState<
    "today" | "7d" | "30d" | "all"
  >("30d");
  const today_date = new Date();

  const { data, loading, error } = useFetch(`${apiUrl}${id}`, token);

  if (loading || data === null) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

  const handleGraphType = (type: string) => {
    setGraphType(type);
    return;
  };

  // Função para agrupar os dados e calcular os valores máximo e mínimo para cada grandeza
  function calcularMaxMinPorTipo(array: ReadingsProps[]) {
    const agrupadoPorTipo = array.reduce((acc, reading) => {
      const { type, value } = reading;
      if (!acc[type]) acc[type] = [];
      acc[type].push(value);
      return acc;
    }, {} as Record<string, number[]>);

    // Calcula os máximos e mínimos para cada tipo
    const maxMinPorTipo = Object.keys(agrupadoPorTipo).map((type) => {
      const valores = agrupadoPorTipo[type];
      const max = Math.max(...valores);
      const min = Math.min(...valores);
      return { type, max, min };
    });

    return maxMinPorTipo;
  }

  const maxMinValues = data ? calcularMaxMinPorTipo(data.readings) : [];

  function handleInformation(type: string, max: number, min: number) {
    const title = () => {
      switch (type) {
        case "T":
          return "Temperatura";
        case "P":
          return "Pressão";
        case "U":
          return "Pluviometria";
        case "H":
          return "Umidade";
        case "A":
          return "Altura";
        case "L":
          return "Luminosidade";
      }
    };
    const unit = () => {
      switch (type) {
        case "T":
          return "°C";
        case "P":
          return "kPa";
        case "U":
          return "mm";
        case "H":
          return "%";
        case "A":
          return "m";
        case "L":
          return "lm";
      }
    };
    return (
      <div
        key={type}
        className="flex items-center py-4 w-full justify-between border-b-[1px] border-gray-400 pb-1"
      >
        <h3 className="text-start font-semibold text-base md:text-lg">
          {title()}
        </h3>
        <div className="flex items-start space-x-8 justify-start w-[60%]">
          <span className="flex items-center space-x-4 w-1/2">
            <MoveDown color="#263af1" />{" "}
            {type === "P" ? (min / 1000).toFixed(1) : min.toFixed(1)}
            {unit()}
          </span>
          <span className="flex items-center space-x-4 w-1/2">
            <MoveUp color="#e02929" />{" "}
            {type === "P" ? (max / 1000).toFixed(1) : max.toFixed(1)}
            {unit()}
          </span>
        </div>
      </div>
    );
  }

  function handlePeriodFilter(period: "today" | "7d" | "30d" | "all") {
    return setPeriodFilter(period);
  }

  const filteredData = data.readings.filter((reading: ReadingsProps) => {
    const date = new Date(reading.created_at);
    const referenceDate = new Date();
    let daysToSubtract = 30;
    if (periodFilter === "7d") {
      daysToSubtract = 7;
    } else if (periodFilter === "today") {
      daysToSubtract = 0;
    } else if (periodFilter === "all") {
      daysToSubtract = 9999;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  console.log(filteredData);
  return (
    <div className="px-2 w-full">
      {data && (
        <div className="flex flex-col py-4">
          <h1 className="text-center text-xl md:text-2xl font-semibold">
            Estação: {data.station_name}
          </h1>
          <h2 className="text-center text-base md:text-lg text-gray-950/60">
            {today_date.toLocaleDateString("pt-BR", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            })}
          </h2>
        </div>
      )}
      <div className="z-20 px-2 w-full min-h-[400px] overflow-hidden flex flex-col h-full items-center ">
        {graphType && (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full flex rounded-lg overflow-hidden">
              <div
                onClick={() => handlePeriodFilter("today")}
                data-active={periodFilter === "today"}
                className="w-1/3 text-center data-[active='true']:bg-emerald-500 p-2 hover:cursor-pointer bg-gray-300"
              >
                <span>Hoje</span>
              </div>
              <div
                onClick={() => handlePeriodFilter("7d")}
                data-active={periodFilter === "7d"}
                className="w-1/3 text-center data-[active='true']:bg-emerald-500 p-2 hover:cursor-pointer bg-gray-300"
              >
                <span>Últimos 7 dias</span>
              </div>
              <div
                onClick={() => handlePeriodFilter("30d")}
                data-active={periodFilter === "30d"}
                className="w-1/3 text-center data-[active='true']:bg-emerald-500 p-2 hover:cursor-pointer bg-gray-300"
              >
                <span>Últimos 30 dias</span>
              </div>
              <div
                onClick={() => handlePeriodFilter("all")}
                data-active={periodFilter === "all"}
                className="w-1/3 text-center data-[active='true']:bg-emerald-500 p-2 hover:cursor-pointer bg-gray-300"
              >
                <span>Todas as leituras</span>
              </div>
            </div>
            <div className="w-full md:flex-row flex md:space-y-0 md:space-x-4 flex-col md:items-start items-center space-y-4">
              <div className="w-full md:w-[65%] h-full ">
                <Chart
                  data={
                    filteredData.length > 0
                      ? filteredData.filter((reading: ReadingsProps) => {
                          return reading.type === graphType;
                        })
                      : null
                  }
                />
              </div>
              <div className="w-full md:w-[30%] md:h-[448px] flex-1 flex flex-col items-center rounded-lg shadow justify-start overflow-hidden bg-white">
                <div className="bg-theme-secondary-800 text-center w-full py-4">
                  <h2 className="text-xl md:text-3xl text-white">
                    Informações
                  </h2>
                </div>
                <div className="flex pb-4 md:pb-0 w-full flex-1 items-center flex-col justify-start px-6">
                  {maxMinValues.map(({ type, max, min }) =>
                    handleInformation(type, max, min)
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 w-full gap-4 px-4 mx-auto lg:w-[60%]">
          {["T", "P", "U", "H", "A", "L"].map((type) => (
            <Button
              key={type}
              onClick={() => handleGraphType(type)}
              disabled={graphType === type}
            >
              {type === "T" && "Temperatura"}
              {type === "P" && "Pressão"}
              {type === "U" && "Pluviometria"}
              {type === "H" && "Umidade"}
              {type === "A" && "Altura"}
              {type === "L" && "Luminosidade"}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
