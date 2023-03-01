import {
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
} from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
import styled from "styled-components";
import Flex from "../grid/Flex";
import { useRef, memo, MutableRefObject } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

Chart.register(
  StreamingPlugin,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler
);

export type ChartStream = {
  x: number;
  y: number;
};

type StreamDataChartProps = {
  data: ChartStream;
  unit: string;
  width?: string;
  chartOptions?: {
    lineColor: string;
  };
};

export default function StreamDataChart({
  data,
  unit,
  chartOptions,
  width,
}: StreamDataChartProps) {
  const currentChartValue = useRef<ChartStream>({ x: Date.now(), y: 0 });
  currentChartValue.current = data;

  return (
    <ChartContainer width={width}>
      <ChartCurrentValue>
        {data.y}
        {unit}
      </ChartCurrentValue>
      <MemoizedLineStreamChart data={currentChartValue} {...chartOptions} />
    </ChartContainer>
  );
}

const MemoizedLineStreamChart = memo(LineStreamChart);

type LineStreamChartProps = {
  data: MutableRefObject<ChartStream>;
  lineColor?: string;
};

function LineStreamChart({ data, lineColor }: LineStreamChartProps) {
  return (
    <Line
      data={{
        datasets: [
          {
            backgroundColor: "transparent",
            borderColor: lineColor ?? "red",
            cubicInterpolationMode: "monotone",
            data: [],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        animation: false,
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          streaming: {
            duration: 100000,
            // frameRate: 10,
          },
          filler: {
            propagate: true,
          },
        },
        scales: {
          x: {
            display: false,
            type: "realtime",
            reverse: true,
            realtime: {
              delay: 2000,
              refresh: 1000,
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  if (data.current.y > 0) {
                    dataset.data.push({
                      x: data.current.x,
                      y: data.current.y,
                    });
                  }
                });
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            display: false,
            max: 200,
            min: 40,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      }}
    />
  );
}

const ChartCurrentValue = styled.div`
  position: absolute;
  font-size: 3rem;
`;

const ChartContainer = styled(Flex)<Partial<StreamDataChartProps>>`
  position: relative;
  padding: 0 1rem;
  gap: 2rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.fg};
  border-radius: 8px;
  height: 80px;
  width: ${(props) => props.width};
`;
