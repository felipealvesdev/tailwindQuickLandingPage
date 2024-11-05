import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GraphType, ReadingsProps } from "@/interfaces/ApiResponse";
import { dimensions } from "@/utils/dimensions";

export const description = "A simple area chart";

export function Chart({ data }: { data: ReadingsProps[] | null }) {
  function handleGraphType(type: GraphType) {
    switch (type.type) {
      case "T":
        return { label: "Temperatura", color: "#acf100" };
      case "L":
        return { label: "Luminosidade", color: "#00ffff" };
      case "P":
        return { label: "Pressão", color: "#ff0000" };
      case "U":
        return { label: "Umidade", color: "#00ff00" };
      case "A":
        return { label: "Altura", color: "#ff00ff" };
    }
  }
  const chartConfig = {
    desktop: handleGraphType({ type: data![0].type }),
  } satisfies ChartConfig;
  if (!data) {
    return null;
  }
  const sorted_data = data
    .map((reading: ReadingsProps) => {
      return {
        id: reading.id,
        organization: reading.organization,
        station: reading.station,
        type: reading.type,
        value: reading.value,
        created_at: new Date(reading.created_at).toLocaleDateString("pt-BR"),
      };
    })
    .sort((a, b) => {
      return a.id - b.id;
    });
  console.log(sorted_data[0].value);
  return (
    <Card className="w-fit pt-12 mx-auto px-24">
      <CardContent>
        <ChartContainer style={{ height: 600 }} config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={sorted_data}
            width={dimensions.width >= 500 ? 530 : 380}
            margin={{ top: 0, right: 0, bottom: 100, left: -0 }}
          >
            <CartesianGrid vertical={false} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.desktop.color}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.desktop.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <YAxis
              unit={
                sorted_data[0].type === "U"
                  ? "%"
                  : sorted_data[0].type === "A"
                  ? "km"
                  : sorted_data[0].type === "P"
                  ? "Pa"
                  : "°C"
              }
            />
            <XAxis
              dataKey="created_at"
              tickLine={true}
              angle={0}
              axisLine={true}
              tickMargin={8}
              minTickGap={-200}
              dy={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={"value"}
              stroke={chartConfig.desktop.color}
              type="monotone"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
