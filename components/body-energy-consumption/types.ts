import { Energy } from "@buge/ts-units/energy";
import { Length } from "@buge/ts-units/length";
import { Mass } from "@buge/ts-units/mass";
import { Power } from "@buge/ts-units/power";
import { Pressure } from "@buge/ts-units/pressure";
import { Scalar } from "@buge/ts-units/scalar";
import { Temperature } from "@buge/ts-units/temperature";

export enum Activity {
  LAP_SWIMMING = "Lap swimming",
  OPEN_WATER_SWIMMING = "Open water swimming",
  CYCLING = "Cycling",
  INDOOR_CYCLING = "Indoor cycling",
  RUNNING = "Running",
  INDOOR_RUNNING = "Indoor running",
}

export type FormattedData = {
  date: string;
  activity: Activity;
  totalTime: number;
  temperature: Temperature;
  airPressure: Pressure;
  altitude: Length;
  humidity: Scalar;
  massBefore: Mass;
  massAfter: Mass;
  liquidIntake: number;
  sodiumLossPerLiter: Mass;
  kCalories: Energy;
  avgHR: number;
  maxHR: number;
  avgPower: Power;
  bikeFTP: Power;
};
