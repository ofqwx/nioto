import { Temperature, celsius } from "@buge/ts-units/temperature";
import { Pressure } from "@buge/ts-units/pressure";
import pressureDimension from "@buge/ts-units/pressure/dimension";
import { pascals } from "@buge/ts-units/pressure";
import { Length, meters } from "@buge/ts-units/length";
import { Scalar, percent } from "@buge/ts-units/scalar";
import { Mass, kilograms, grams } from "@buge/ts-units/mass";
import massDimension from "@buge/ts-units/mass/dimension";
import { Unit } from "@buge/ts-units";
import { Energy, joules } from "@buge/ts-units/energy";
import energyDimension from "@buge/ts-units/energy/dimension";
import { watts } from "@buge/ts-units/power";
import { Box, Flex } from "../../../components";
import LogTable from "../../../components/body-energy-consumption/LogTable";
import {
  Activity,
  FormattedData,
} from "../../../components/body-energy-consumption/types";
import { useState, useCallback, ReactElement } from "react";
import DataEntryForm, {
  DataInput,
} from "../../../components/body-energy-consumption/DataEntryForm";
import Layout from "../../../components/Layout";

export const mbar: Unit<pressureDimension.Pressure> = pascals
  .times(0.01)
  .withSymbol("mbar");
export const mg: Unit<massDimension.Mass> = grams.times(1000).withSymbol("mg");
export const kcal: Unit<energyDimension.Energy> = joules
  .times(1000)
  .withSymbol("");

export default function BodyEnergyConsumption() {
  const [data, setData] = useState<FormattedData[]>([
    {
      date: "22.10.2022",
      activity: Activity.CYCLING,
      totalTime: 48.5,
      temperature: celsius(27),
      airPressure: mbar(902),
      altitude: meters(911),
      humidity: percent(24),
      massBefore: kilograms(82.2),
      massAfter: kilograms(81.7),
      liquidIntake: 0.1,
      sodiumLossPerLiter: mg(1700),
      kCalories: kcal(481),
      avgHR: 108,
      maxHR: 178,
      avgPower: watts(170),
      bikeFTP: watts(322),
    },
  ]);

  const submit = useCallback((values: DataInput) => {
    setData((prevState) => [
      ...prevState,
      {
        date: values.date,
        activity: Activity.CYCLING,
        totalTime: values.totalTime,
        temperature: celsius(values.temperature || 0),
        airPressure: mbar(values.airPressure || 0),
        altitude: meters(values.altitude || 0),
        humidity: percent(values.humidity || 0),
        massBefore: kilograms(values.massBefore || 0),
        massAfter: kilograms(values.massAfter || 0),
        liquidIntake: values.liquidIntake || 0,
        sodiumLossPerLiter: mg(values.sodiumLossPerLiter || 0),
        kCalories: kcal(values.kCalories || 0),
        avgHR: values.avgHR || 0,
        maxHR: values.maxHR || 0,
        avgPower: watts(values.avgPower || 0),
        bikeFTP: watts(values.bikeFTP || 0),
      },
    ]);
  }, []);

  return (
    <Flex direction="column">
      <Box>
        <h1>Energy and sodium consumption</h1>
      </Box>

      <Box>
        <DataEntryForm submit={submit} />
      </Box>

      <Box>
        <LogTable data={data} />
      </Box>
    </Flex>
  );
}

BodyEnergyConsumption.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
