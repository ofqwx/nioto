import * as Ant from "@ofqwx/ant-plus";
import EventEmitter from "events";
import { SocketEvents } from "../pages/api/ant-plus-socket";
import { SensorType, SensorData, SensorEvent } from "./sensor";

export default class Scanner {
  private scannerClasses = {
    hrSensor: Ant.HeartRateScanner,
    coreTemperatureSensor: Ant.CoreTemperatureScanner,
    bikePowerSensor: Ant.BicyclePowerScanner,
    fitnessEquipment: Ant.FitnessEquipmentScanner,
  };

  public sensorId = 0;
  public instance:
    | Ant.HeartRateScanner
    | Ant.CoreTemperatureScanner
    | Ant.BicyclePowerScanner
    | Ant.FitnessEquipmentScanner;

  constructor(
    sensorType: keyof typeof SensorType,
    stick: Ant.GarminStick2 | Ant.GarminStick3,
    eventBus: EventEmitter,
    sensorId?: number
  ) {
    if (sensorId) {
      this.sensorId = sensorId;
    }
    const scanner = new this.scannerClasses[SensorType[sensorType]](stick);
    this.instance = scanner;

    scanner.on(
      SensorEvent[sensorType],
      (data: Ant.CoreTemperatureSensorState | Ant.HeartRateSensorState) => {
        const sensorData: SensorData = {
          sensorType: SensorType[sensorType],
          data,
          timestamp: Date.now(),
        };

        eventBus.emit(SocketEvents.scannerData, sensorData);
      }
    );

    scanner.on("detached", () => {
      eventBus.emit(SocketEvents.scannerStopped, sensorType);
    });

    eventBus.on(SocketEvents.stopScanner, (sensorTypeToStop) => {
      if (sensorTypeToStop === sensorType) {
        scanner.detach();
      }
    });
  }
}
