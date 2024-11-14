import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  // ChartTooltipContent,
} from "@/components/ui/chart";
import { GraphType, ReadingsProps } from "@/interfaces/ApiResponse";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import clsx from "clsx";

export const description = "A simple area chart";

export function Chart({ data }: { data: ReadingsProps[] | null }) {
  function handleGraphType(type: GraphType) {
    switch (type.type) {
      case "T":
        return { label: "Temperatura", color: "#e01060" };
      case "L":
        return { label: "Luminosidade", color: "#c0d314" };
      case "P":
        return { label: "Pressão", color: "#bb1feb" };
      case "U":
        return { label: "Pluviometria", color: "#12e9de" };
      case "H":
        return { label: "Umidade", color: "#380ff0" };
      case "A":
        return { label: "Altura", color: "#ff4800" };
    }
  }
  const chartConfig = {
    desktop: handleGraphType({ type: data![0].type }),
  } satisfies ChartConfig;
  if (!data) {
    return null;
  }
  const sorted_data = data.sort((a, b) => {
    return a.id - b.id;
  });
  // console.log(sorted_data[0].value);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip items-center space-x-2 bg-slate-100 flex rounded-lg py-2 shadow-lg px-4">
          <div
            className={clsx("h-[90%] min-h-[48px] w-1 rounded-full", {
              "bg-[#acf100]": chartConfig.desktop.label === "Luminosidade",
              "bg-[#e01060]": chartConfig.desktop.label === "Temperatura",
              "bg-[#12e9de]": chartConfig.desktop.label === "Pluviometria",
              "bg-[#380ff0]": chartConfig.desktop.label === "Umidade",
              "bg-[#bb1feb]": chartConfig.desktop.label === "Pressão",
              "bg-[#ff4800]": chartConfig.desktop.label === "Altura",
            })}
          />
          <div className="w-36">
            <p className="text-xs font-regular">
              {new Date(label).toLocaleDateString("pt-BR", options)}
            </p>
            <div className="flex items-center justify-between ">
              <span>{chartConfig.desktop.label}:</span>
              <p className="text-base font-medium">
                {chartConfig.desktop.label === "Pressão"
                  ? (Number(payload[0].value) / 1000).toFixed(2)
                  : chartConfig.desktop.label === "Altura"
                  ? Number(payload[0].value).toLocaleString("pt-BR", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : payload[0].value}
                {chartConfig.desktop.label === "Umidade"
                  ? "%"
                  : chartConfig.desktop.label === "Altura"
                  ? "m"
                  : chartConfig.desktop.label === "Pluviometria"
                  ? "mm"
                  : chartConfig.desktop.label === "Pressão"
                  ? "kPa"
                  : chartConfig.desktop.label === "Luminosidade"
                  ? "lm"
                  : "°C"}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <Card className="w-full pt-12 m-0 mx-auto md:px-24">
      <CardContent className="w-full">
        <ChartContainer className="w-full" config={chartConfig}>
          <ResponsiveContainer width="100%">
            <AreaChart accessibilityLayer data={sorted_data}>
              <CartesianGrid vertical={false} />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.desktop.color}
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.desktop.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <YAxis
                axisLine={true}
                tickLine={true}
                tickMargin={8}
                tickFormatter={(value) => {
                  switch (chartConfig.desktop.label) {
                    case "Pluviometria":
                      return `${value}`;
                    case "Luminosidade":
                      return `${value}`;
                    case "Altura":
                      return `${value.toLocaleString("pt-BR", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        minimumIntegerDigits: 1,
                      })}`;
                    case "Umidade":
                      return `${value}`;
                    case "Pressão":
                      // O resultado da pressão vem em Pascal, dividindo por 1000, chegamos a unidade kPa com menor valor, mais legível
                      return `${value / 1000}`;
                    case "Temperatura":
                      return `${value}`;
                    default:
                      return `${value}`;
                  }
                }}
                unit={
                  sorted_data[0].type === "U"
                    ? "mm"
                    : sorted_data[0].type === "A"
                    ? "m"
                    : sorted_data[0].type === "P"
                    ? "kPa"
                    : sorted_data[0].type === "L"
                    ? "lm"
                    : sorted_data[0].type === "H"
                    ? "%"
                    : "°C"
                }
              />
              <XAxis
                dataKey="created_at"
                tickLine={true}
                angle={0}
                axisLine={true}
                tickMargin={8}
                minTickGap={100}
                interval={"preserveStartEnd"}
                dy={4}
                tickFormatter={(label) => {
                  const date = new Date(label);
                  const options: Intl.DateTimeFormatOptions = {
                    hour: "2-digit",
                    minute: "2-digit",
                  };
                  return date.toLocaleTimeString("pt-BR", options);
                }}
              />
              <ChartTooltip
                cursor={false}
                // content={<ChartTooltipContent indicator="line" />}
                content={<CustomTooltip />}
              />
              <Area
                dataKey={"value"}
                stroke={chartConfig.desktop.color}
                type={
                  chartConfig.desktop.label === "Pluviometria"
                    ? "step"
                    : "bumpX"
                }
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
