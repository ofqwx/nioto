import * as Ant from "@ofqwx/ant-plus";
import EventEmitter from "events";
import { SocketEvents } from "../pages/api/ant-plus-socket";
import { Stream } from "../pages/tools/pain-cave-monitor";
import Scanner from "./scanner";
import Sensor, { SensorData, SensorType } from "./sensor";

export default class AntPlusStickServer {
  private stick: Ant.GarminStick2;
  private attachedSensors: Sensor[];

  public eventBus;
  public sensorsData: Stream = {
    hrSensor: null,
    coreTemperatureSensor: null,
    bikePowerSensor: null,
    fitnessEquipment: null,
  };

  constructor() {
    this.eventBus = new EventEmitter();
    this.stick = new Ant.GarminStick2();
    this.attachedSensors = [];

    this.eventBus.on(SocketEvents.startAntPlusStickServer, () => {
      this.start();
    });

    this.eventBus.on(SocketEvents.stopAntPlusStickServer, () => {
      this.stop();
    });
  }

  private start() {
    const server = this;

    if (this.stick.is_present()) {
      if (!this.stick.open()) {
        this.stick.open();
      }

      this.stick.on("startup", function () {
        console.log("Stick startup");

        server.eventBus.on(
          SocketEvents.scanSensor,
          (sensorType: keyof typeof SensorType) => {
            server.scanSensor(sensorType);
          }
        );

        server.eventBus.on(
          SocketEvents.attachSensor,
          ({
            sensorType,
            sensorId,
          }: {
            sensorType: keyof typeof SensorType;
            sensorId: number;
          }) => {
            const channel =
              server.attachedSensors.length > 0
                ? server.attachedSensors.length + 1
                : 0;

            server.attachSensor(sensorType, channel, sensorId);
          }
        );

        server.eventBus.on(SocketEvents.sensorAttached, (sensor) => {
          server.attachedSensors.push(sensor);

          server.eventBus.emit(
            SocketEvents.attachedSensorsUpdated,
            server.attachedSensors
          );
        });

        server.eventBus.on(SocketEvents.sensorDetached, (sensor) => {
          server.attachedSensors = server.attachedSensors.filter(
            ({ sensorId }) => sensorId !== sensor.sensorId
          );
          const updatedAttachedSensors = server.attachedSensors;

          server.eventBus.emit(
            SocketEvents.attachedSensorsUpdated,
            updatedAttachedSensors
          );
        });

        server.eventBus.on(SocketEvents.sensorData, (data: SensorData) => {
          console.log(`New ${data.sensorType} value`);

          switch (data.sensorType) {
            case SensorType.HR_SENSOR: {
              server.sensorsData[SensorType.HR_SENSOR] = {
                ...(data.data as Ant.HeartRateSensorState),
                timestamp: data.timestamp,
              };
            }
            case SensorType.CORE_TEMPERATURE_SENSOR: {
              server.sensorsData[SensorType.CORE_TEMPERATURE_SENSOR] = {
                ...(data.data as Ant.CoreTemperatureSensorState),
                isValidCoreTemp: () => true,
                timestamp: data.timestamp,
              };
            }
            case SensorType.BIKE_POWER_SENSOR: {
              server.sensorsData[SensorType.BIKE_POWER_SENSOR] = {
                ...(data.data as Ant.BicyclePowerSensorState),
                timestamp: data.timestamp,
              };
            }
            case SensorType.FITNESS_EQUIPMENT: {
              server.sensorsData[SensorType.FITNESS_EQUIPMENT] = {
                ...(data.data as Ant.FitnessEquipmentSensorState),
                timestamp: data.timestamp,
              };
            }
          }
        });

        server.eventBus.emit(SocketEvents.antPlusStickServerStarted);
      });
    } else {
      server.eventBus.emit(SocketEvents.antPlusStickServerStartFailed);
    }
  }

  private scanSensor(sensorType: keyof typeof SensorType) {
    const scanner = new Scanner(sensorType, this.stick, this.eventBus);

    scanner.instance.scan();
    this.eventBus.emit(SocketEvents.scanningSensors);
  }

  private attachSensor(
    sensorType: keyof typeof SensorType,
    channel: number,
    sensorId: number
  ) {
    const sensor = new Sensor(sensorType, this.stick, this.eventBus, sensorId);

    // this.eventBus.emit(SocketEvents.stopScanner, sensorType);

    // this.eventBus.on(
    //   SocketEvents.scannerStopped,
    //   (stoppedSensorType: keyof typeof SensorType) => {
    //     if (stoppedSensorType === sensorType) {
    //       sensor.instance.attach(channel, sensorId);
    //     }
    //   }
    // );
    sensor.instance.attach(channel, sensorId);
  }

  private stop() {
    this.stick.detach_all();
    this.stick.close();
    const eventBus = this.eventBus;
    this.sensorsData = {
      hrSensor: null,
      coreTemperatureSensor: null,
      bikePowerSensor: null,
      fitnessEquipment: null,
    };

    this.stick?.on("shutdown", function () {
      console.log("Stick shutdown");

      eventBus.emit(SocketEvents.antPlusStickServerStopped);
    });
  }
}
