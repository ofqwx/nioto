import dynamic from "next/dynamic";
import * as Ant from "@ofqwx/ant-plus";
import {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import styled, { css } from "styled-components";
import { SensorData, SensorType } from "../../antPlusServer/sensor";
import { Box, Flex } from "../../components";
import Layout from "../../components/Layout";
import CoreBodyTemperatureSection from "../../components/pain-cave-monitor/CoreBodyTemperatureSection";

let antPlusSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export type Stream = {
  coreTemperatureSensor:
    | (Ant.CoreTemperatureSensorState & { timestamp: number })
    | null;
  hrSensor: (Ant.HeartRateSensorState & { timestamp: number }) | null;
  bikePowerSensor: (Ant.BicyclePowerSensorState & { timestamp: number }) | null;
  fitnessEquipment:
    | (Ant.FitnessEquipmentSensorState & { timestamp: number })
    | null;
};

const StreamDataChart = dynamic(
  () => import("../../components/pain-cave-monitor/StreamDataChart"),
  { ssr: false }
);

export default function PainCaveMonitor() {
  const [state, setState] = useState<Stream>({
    coreTemperatureSensor: null,
    hrSensor: null,
    bikePowerSensor: null,
    fitnessEquipment: null,
  });

  useEffect(() => {
    async function antPlusSocketInitializer() {
      await fetch("/api/ant-plus-socket");

      antPlusSocket = io();
      antPlusSocket.on("connect", () => {
        console.log("connected");
      });

      antPlusSocket.on("sensorData", (stream: string) => {
        console.log("sensor data");
        const parsedStream: Stream = JSON.parse(stream);

        setState(parsedStream);
      });

      antPlusSocket.on("scannerData", (stream: string) => {
        const parsedStream: SensorData = JSON.parse(stream);
        console.log("Scanner data", parsedStream);
      });
    }

    antPlusSocketInitializer();

    const interval = setInterval(() => {
      setState({
        coreTemperatureSensor: {
          CoreTemp: (Math.random() * 100).toFixed(0),
          timestamp: Date.now(),
        },
        hrSensor: {
          ComputedHeartRate: (Math.random() * 100).toFixed(0),
          timestamp: Date.now(),
        },
        bikePowerSensor: {
          timestamp: Date.now(),
          Power: Number((Math.random() * 100).toFixed(0)),
        },
        fitnessEquipment: null,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (antPlusSocket !== null) {
        antPlusSocket.disconnect();
      }
    };
  }, []);

  function stopReading() {
    if (antPlusSocket !== null) {
      antPlusSocket.emit("stopAntPlusStickServer");
    }
  }

  function startReading() {
    if (antPlusSocket !== null) {
      antPlusSocket.emit("startAntPlusStickServer");
    }
  }

  return (
    <Fragment>
      <FlexContainer justifyContent="space-between">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #000",
            borderRadius: "8px",
            width: "40%",
            padding: "0.65rem",
            gap: "1rem",
          }}
        >
          <Flex direction="column" gap="0.5rem" height="unset">
            <Flex gap="0.5rem" justifyContent="space-evenly">
              <Flex direction="column">
                <p style={{ textAlign: "center", margin: 0 }}>Moving time</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>1:20:53</h1>
              </Flex>

              <Flex direction="column">
                <p style={{ textAlign: "center", margin: 0 }}>Lap time</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>1:20:53</h1>
              </Flex>
            </Flex>

            <Flex gap="0.5rem" justifyContent="space-evenly">
              <Flex direction="column">
                <p style={{ textAlign: "center", margin: 0 }}>
                  Moving Distance
                </p>
                <h1 style={{ textAlign: "center", margin: 0 }}>54km</h1>
              </Flex>
              <Flex direction="column">
                <p style={{ textAlign: "center", margin: 0 }}>Lap Distance</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>20.10km</h1>
              </Flex>
            </Flex>
          </Flex>
          <hr style={{ width: "100%" }} />

          {/* <Flex gap="1rem" justifyContent="space-between"> */}
          <table>
            <thead>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Workout
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Last lap
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Avg. HR:</td>
                <td style={{ textAlign: "right" }}>123bpm</td>
                <td style={{ textAlign: "right" }}>Avg. HR:</td>
                <td style={{ textAlign: "right" }}>123bpm</td>
              </tr>
              <tr>
                <td>Avg. Pwr.:</td>
                <td style={{ textAlign: "right" }}>200w</td>
                <td style={{ textAlign: "right" }}>Avg. Pwr.:</td>
                <td style={{ textAlign: "right" }}>200w</td>
              </tr>
              <tr>
                <td>Avg. Core Temp.:</td>
                <td style={{ textAlign: "right" }}>38.2º</td>
                <td style={{ textAlign: "right" }}>Avg. Core Temp.:</td>
                <td style={{ textAlign: "right" }}>38.2º</td>
              </tr>
              <tr>
                <td>Decoupling:</td>
                <td style={{ textAlign: "right" }}>4.5%</td>
                <td style={{ textAlign: "right" }}>Decoupling:</td>
                <td style={{ textAlign: "right" }}>4.5%</td>
              </tr>
              <tr>
                <td>E.I:</td>
                <td style={{ textAlign: "right" }}>1.74</td>
                <td style={{ textAlign: "right" }}>E.I:</td>
                <td style={{ textAlign: "right" }}>1.74</td>
              </tr>
              <tr>
                <td>V.I:</td>
                <td style={{ textAlign: "right" }}>1.02</td>
                <td style={{ textAlign: "right" }}>V.I:</td>
                <td style={{ textAlign: "right" }}>1.02</td>
              </tr>
              <tr>
                <td>I.F:</td>
                <td style={{ textAlign: "right" }}>0.8</td>
                <td style={{ textAlign: "right" }}>I.F:</td>
                <td style={{ textAlign: "right" }}>0.8</td>
              </tr>
            </tbody>
          </table>
          {/* </Flex> */}
        </div>

        <KpisWrapper direction="column" flex="1 1 60%">
          {/* Power chart */}
          <StreamDataChart
            unit="w"
            data={{
              x: state.bikePowerSensor?.timestamp || Date.now(),
              y: state.bikePowerSensor?.Power || 0,
            }}
            chartOptions={{ lineColor: "blue" }}
          />

          {/* HR and Core chart */}
          <KpisWrapper>
            <StreamDataChart
              unit="bpm"
              width="50%"
              data={{
                x: state.hrSensor?.timestamp || Date.now(),
                y: state.hrSensor?.ComputedHeartRate || 0,
              }}
              chartOptions={{ lineColor: "red" }}
            />
            <StreamDataChart
              unit="º"
              width="50%"
              data={{
                x: state.coreTemperatureSensor?.timestamp || Date.now(),
                y: state.coreTemperatureSensor?.CoreTemp || 0,
              }}
              chartOptions={{ lineColor: "green" }}
            />
          </KpisWrapper>

          {/* Lap. boxes */}
          <KpisWrapper justifyContent="space-between" wrap="wrap">
            <ValueBox width="8rem">
              <Flex direction="column" gap="1rem">
                <p style={{ textAlign: "center", margin: 0 }}>Lap Power</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>200W</h1>
              </Flex>
            </ValueBox>

            <ValueBox width="8rem">
              <Flex direction="column" gap="1rem">
                <p style={{ textAlign: "center", margin: 0 }}>Lap HR</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>110bpm</h1>
              </Flex>
            </ValueBox>

            <ValueBox width="8rem">
              <Flex direction="column" gap="1rem">
                <p style={{ textAlign: "center", margin: 0 }}>Lap Core Temp.</p>
                <h1 style={{ textAlign: "center", margin: 0 }}>38.2º</h1>
              </Flex>
            </ValueBox>
          </KpisWrapper>
        </KpisWrapper>
      </FlexContainer>

      <KpisWrapper>
        <button onClick={() => stopReading()}>Stop session</button>
        <button onClick={() => startReading()}>Start session</button>
      </KpisWrapper>
    </Fragment>
  );
}

type KpisWrapperProps = {
  flex?: string;
  bordered?: boolean;
};

const KpisWrapper = styled(Flex)<KpisWrapperProps>`
  gap: 1rem;
  flex: ${(props) => props.flex || ""};
  ${(props) =>
    props.bordered
      ? css({
          border: "1px solid",
          borderColor: props.theme.colors.fg,
          borderRadius: "8px",
        })
      : null};
`;

const FlexContainer = styled(Flex)`
  gap: 1rem;
`;

const ValueBox = styled(Box)`
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.fg};
  border-radius: 8px;
  text-align: center;
  width: ${(props) => props.width};
`;

PainCaveMonitor.getLayout = function getLayout(page: ReactElement) {
  return <Layout fullWidth>{page}</Layout>;
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
`;
