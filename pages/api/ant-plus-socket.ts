import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import AntPlusStickServer from "../../antPlusServer/server";
import { SensorData } from "../../antPlusServer/sensor";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export enum SocketEvents {
  startAntPlusStickServer = "startAntPlusStickServer",
  antPlusStickServerInitializing = "antPlusStickServerInitializing",
  stopAntPlusStickServer = "stopAntPlusStickServer",
  antPlusStickServerStarted = "antPlusStickServerStarted",
  antPlusStickServerStopped = "antPlusStickServerStopped",
  antPlusStickServerStartFailed = "antPlusStickServerStartFailed",
  sensorData = "sensorData",
  newStream = "newStream",
  attachSensor = "attachSensor",
  detachSensor = "detachSensor",
  sensorAttached = "sensorAttached",
  sensorDetached = "sensorDetached",
  attachedSensorsUpdated = "attachedSensorsUpdated",
  scanSensor = "scanSensor",
  stopScanner = "stopScanner",
  scannerStopped = "scannerStopped",
  scanningSensors = "scanningSensors",
  scannerData = "scannerData",
}

let antPlusStickServer: AntPlusStickServer | null = null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket?.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket?.server);
    res.socket.server.io = io;

    let interval: NodeJS.Timer | null = null;

    io.on("connection", (clientSocket) => {
      console.log("Socket connected");

      clientSocket.on(SocketEvents.startAntPlusStickServer, () => {
        console.log("Ant+ stick server is initializing...");

        if (antPlusStickServer === null) {
          antPlusStickServer = new AntPlusStickServer();
        }

        antPlusStickServer.eventBus.on(
          SocketEvents.antPlusStickServerStarted,
          () => {
            console.log("Ant+ stick server is running, reading sensors...");

            antPlusStickServer?.eventBus.emit(SocketEvents.attachSensor, {
              sensorType: "CORE_TEMPERATURE_SENSOR",
              sensorId: 41088,
            });

            setTimeout(() => {
              antPlusStickServer?.eventBus.emit(SocketEvents.attachSensor, {
                sensorType: "HR_SENSOR",
                sensorId: 27976,
              });
            }, 1000);

            interval = setInterval(() => {
              if (antPlusStickServer?.sensorsData) {
                clientSocket.broadcast.emit(
                  SocketEvents.sensorData,
                  JSON.stringify(antPlusStickServer.sensorsData)
                );
              }
            }, 1000);
          }
        );

        antPlusStickServer.eventBus.on(
          SocketEvents.antPlusStickServerStopped,
          () => {
            console.log("Ant+ stick server is not running");
            antPlusStickServer = null;
          }
        );

        antPlusStickServer.eventBus.on(
          SocketEvents.antPlusStickServerStartFailed,
          () => {
            console.log("Ant+ stick not found");
          }
        );

        antPlusStickServer.eventBus.on(
          SocketEvents.scannerData,
          (data: SensorData) => {
            console.log(`New ${data.sensorType} value from scanner`);

            clientSocket.broadcast.emit(
              SocketEvents.scannerData,
              JSON.stringify(data)
            );
          }
        );

        // antPlusStickServer.eventBus.on(
        //   SocketEvents.attachedSensorsUpdated,
        //   (attachedSensors) => {
        //     clientSocket.broadcast.emit(
        //       SocketEvents.attachedSensorsUpdated,
        //       JSON.stringify(attachedSensors)
        //     );
        //   }
        // );

        antPlusStickServer.eventBus.emit(SocketEvents.startAntPlusStickServer);
      });

      clientSocket.on(SocketEvents.stopAntPlusStickServer, () => {
        console.log("Ant+ stick server is stopping...");

        if (antPlusStickServer !== null) {
          antPlusStickServer.eventBus.emit(SocketEvents.stopAntPlusStickServer);
        }

        if (interval !== null) {
          clearInterval(interval);
        }
      });
    });

    io.on("disconnect", () => {
      console.log("Socket disconnected");

      if (interval !== null) {
        clearInterval(interval);
      }
    });
  }
  res.end();
}
