import * as Ant from "@ofqwx/ant-plus";
import EventEmitter from "events";
import { SocketEvents } from "../pages/api/ant-plus-socket";

export type SensorState =
  | Ant.CoreTemperatureSensorState
  | Ant.HeartRateSensorState
  | Ant.BicyclePowerSensorState
  | Ant.FitnessEquipmentSensorState;

export enum SensorType {
  HR_SENSOR = "hrSensor",
  CORE_TEMPERATURE_SENSOR = "coreTemperatureSensor",
  BIKE_POWER_SENSOR = "bikePowerSensor",
  FITNESS_EQUIPMENT = "fitnessEquipment",
}

export enum SensorEvent {
  HR_SENSOR = "hbdata",
  CORE_TEMPERATURE_SENSOR = "coreTempData",
  BIKE_POWER_SENSOR = "powerData",
  FITNESS_EQUIPMENT = "fitnessData",
}

export type SensorData = {
  sensorType: SensorType;
  data: SensorState;
  timestamp: number;
};

export default class Sensor {
  private sensorClasses = {
    hrSensor: Ant.HeartRateSensor,
    coreTemperatureSensor: Ant.CoreTemperatureSensor,
    bikePowerSensor: Ant.BicyclePowerSensor,
    fitnessEquipment: Ant.FitnessEquipmentSensor,
  };

  public sensorId = 0;
  public instance:
    | Ant.HeartRateSensor
    | Ant.CoreTemperatureSensor
    | Ant.BicyclePowerSensor
    | Ant.FitnessEquipmentSensor;

  constructor(
    sensorType: keyof typeof SensorType,
    stick: Ant.GarminStick2 | Ant.GarminStick3,
    eventBus: EventEmitter,
    sensorId?: number
  ) {
    if (sensorId) {
      this.sensorId = sensorId;
    }
    const sensor = new this.sensorClasses[SensorType[sensorType]](stick);
    this.instance = sensor;

    sensor.on(
      SensorEvent[sensorType],
      (data: Ant.CoreTemperatureSensorState | Ant.HeartRateSensorState) => {
        const sensorData: SensorData = {
          sensorType: SensorType[sensorType],
          data,
          timestamp: Date.now(),
        };

        eventBus.emit(SocketEvents.sensorData, sensorData);
      }
    );

    sensor.on("attached", function () {
      console.log(SensorType[sensorType] + " attached");

      eventBus.emit(SocketEvents.sensorAttached, sensor);
    });

    sensor.on("detached", function () {
      console.log(SensorType[sensorType] + " datached");

      eventBus.emit(SocketEvents.sensorDetached, sensor);
    });
  }
}
