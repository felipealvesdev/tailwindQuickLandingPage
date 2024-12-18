import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Chart } from "@/components/Chart/Chart";
import { ReadingsProps } from "@/interfaces/ApiResponse";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveDown, MoveUp } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

// interface DataType {
//   id: number;
//   name: string;
// }

export default function Reading() {
  const { language } = useTranslation();
  const { id } = useParams();
  const token = import.meta.env.VITE_API_TOKEN;
  const apiUrl = import.meta.env.VITE_API_URL_STATIONS_ID;
  const [graphType, setGraphType] = useState("T");
  const [periodFilter, setPeriodFilter] = useState<
    "today" | "7d" | "30d" | "all"
  >("all");
  const today_date = new Date();

  const { data, loading, error } = useFetch(`${apiUrl}${id}`, token);

  const translateObject = {
    title: {
      "pt-BR": "Estação",
      "en-US": "Station",
    },
    filters: [
      {
        "pt-BR": "Hoje",
        "en-US": "Today",
        periodFilter: "today",
      },
      {
        "pt-BR": "Últimos 7 dias",
        "en-US": "Last 7 days",
        periodFilter: "7d",
      },
      {
        "pt-BR": "Últimos 30 dias",
        "en-US": "Last 30 days",
        periodFilter: "30d",
      },
      {
        "pt-BR": "Todas as leituras",
        "en-US": "All readings",
        periodFilter: "all",
      },
    ] as {
      "pt-BR": string;
      "en-US": string;
      periodFilter: "today" | "7d" | "30d" | "all";
    }[],
    infoCard: {
      title: {
        "pt-BR": "Informações",
        "en-US": "Info",
      },
      parameters: [
        {
          title: "T",
          "pt-BR": "Temperatura",
          "en-US": "Temperature",
        },
        {
          title: "P",
          "pt-BR": "Pressão",
          "en-US": "Pressure",
        },
        {
          title: "H",
          "pt-BR": "Umidade",
          "en-US": "Humidity",
        },
        {
          title: "U",
          "pt-BR": "Pluviometria",
          "en-US": "Precipitation",
        },
        {
          title: "A",
          "pt-BR": "Altitude",
          "en-US": "Altitude",
        },
        {
          title: "L",
          "pt-BR": "Luminosidade",
          "en-US": "Luminosity",
        },
      ],
    },
  };

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

  function verifyDataExists(type: string) {
    if (maxMinValues.some((reading) => reading.type === type)) return true;

    return false;
  }

  function handleInformation(type: string, max: number, min: number) {
    function celsiusToFahrenheit(celsius: number) {
      return (celsius * 9) / 5 + 32;
    }
    const title = () => {
      switch (type) {
        case "T":
          return language === "pt-BR" ? "Temperatura" : "Temperature";
        case "P":
          return language === "pt-BR" ? "Pressão" : "Pressure";
        case "U":
          return language === "pt-BR" ? "Pluviometria" : "Preciptation";
        case "H":
          return language === "pt-BR" ? "Umidade" : "Humidity";
        case "A":
          return language === "pt-BR" ? "Altitude" : "Altitude";
        case "L":
          return language === "pt-BR" ? "Luminosidade" : "Luminosity";
      }
    };
    const unit = () => {
      switch (type) {
        case "T":
          return language === "pt-BR" ? "°C" : "°F";
        case "P":
          return "kPa";
        case "U":
          return "mm";
        case "H":
          return "%";
        case "A":
          return language === "pt-BR" ? "m" : "ft";
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
            {type === "P"
              ? (min / 1000).toFixed(1)
              : type === "T" && language === "pt-BR"
                ? min.toFixed(1)
                : type === "T" && language === "en-US"
                  ? celsiusToFahrenheit(min).toFixed(1)
                  : type === "A" && language === "en-US"
                    ? (min * 3.28084).toFixed(1)
                    : min.toFixed(1)}
            {unit()}
          </span>
          <span className="flex items-center space-x-4 w-1/2">
            <MoveUp color="#e02929" />{" "}
            {type === "P"
              ? (max / 1000).toFixed(1)
              : type === "T" && language === "pt-BR"
                ? max.toFixed(1)
                : type === "T" && language === "en-US"
                  ? celsiusToFahrenheit(max).toFixed(1)
                  : type === "A" && language === "en-US"
                    ? (max * 3.28084).toFixed(1)
                    : max.toFixed(1)}
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

  return (
    <div className="px-2 w-full">
      {data && (
        <div className="flex flex-col py-4">
          <h1 className="text-center text-xl md:text-2xl font-semibold">
            {language === "pt-BR"
              ? translateObject.title["pt-BR"]
              : translateObject.title["en-US"]}
            : {data.station_name}
          </h1>
          <h2 className="text-center text-base md:text-lg text-gray-950/60 dark:text-gray-50/60">
            {today_date.toLocaleDateString(
              language === "pt-BR" ? "pt-BR" : "en-US",
              {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              }
            )}
          </h2>
          
          
        </div>
      )}
      <div className="z-20 px-2 w-full min-h-[400px] overflow-hidden flex flex-col h-full items-center ">
        {graphType && (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full flex rounded-lg overflow-hidden">
              {translateObject.filters.map((filter, i) => {
                return (
                  <div
                    key={`${filter.periodFilter}-${i}`}
                    onClick={() => handlePeriodFilter(filter.periodFilter)}
                    data-active={periodFilter === filter.periodFilter}
                    className="w-1/3 text-center data-[active='true']:bg-orange-500 data-[active='true']:dark:bg-orange-500 p-2 hover:cursor-pointer bg-gray-300 dark:bg-gray-800"
                  >
                    <span>
                      {language === "pt-BR" ? filter["pt-BR"] : filter["en-US"]}
                    </span>
                  </div>
                );
              })}
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
              <div className="w-full md:w-[30%] md:h-[448px] flex-1 flex flex-col items-center rounded-lg shadow justify-start overflow-hidden bg-white dark:bg-gray-800">
                <div className="bg-theme-secondary-800 text-center w-full py-4">
                  <h2 className="text-xl md:text-3xl text-white">
                    {language === "pt-BR"
                      ? translateObject.infoCard.title["pt-BR"]
                      : translateObject.infoCard.title["en-US"]}
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
          {translateObject.infoCard.parameters.map(
            (type, i) =>
              verifyDataExists(type.title) && (
                <Button
                  key={`${type}-${i}`}
                  onClick={() => handleGraphType(type.title)}
                  disabled={graphType === type.title}
                >
                  {language === "pt-BR"
                    ? translateObject.infoCard.parameters[i]["pt-BR"]
                    : translateObject.infoCard.parameters[i]["en-US"]}
                </Button>
              )
          )}
        </div>

        {/* Botão de redirecionamento abaixo dos botões de parâmetros */}
        {Number(id) === 1 && (
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-4 py-2 bg-orange-500 text-black dark:text-white rounded hover:bg-orange-600 w-[200px] font-bold text-center"
          >
            Redirecionar
          </a>
        )}

          </div>

        </div>
      
  );
}