import { FormEvent, ReactElement, useCallback, useState } from "react";
import { Box, Flex } from "../../components";
import Layout from "../../components/Layout";

export default function DensityAltitude() {
  const [calculatedAltitude, setCalculatedAltitude] = useState<string | null>(
    null
  );
  const [values, setValues] = useState({
    seaLevelPressure: "1013.25",
    atmosphericPressure: "",
    temperature: "",
  });

  const onChangeFormInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    },
    []
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const altitude =
        ((Math.pow(
          Number(values.seaLevelPressure) / Number(values.atmosphericPressure),
          1 / 5.257
        ) -
          1) *
          (Number(values.temperature) + 273.15)) /
        0.0065;

      setCalculatedAltitude(String(altitude));
    },
    [values]
  );

  return (
    <Flex direction="column">
      <Box>
        <h1>Calculate altitude from air pressure and temperature</h1>
      </Box>

      <Box>
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>Data</legend>

            <label htmlFor="seaLevelPressure">Sea-level pressure: </label>
            <input
              type="text"
              id="seaLevelPressure"
              name="seaLevelPressure"
              value={values.seaLevelPressure}
              onChange={onChangeFormInputValue}
            />
            <br />
            <br />

            <label htmlFor="atmosphericPressure">Atmospheric pressure: </label>
            <input
              type="text"
              id="atmosphericPressure"
              name="atmosphericPressure"
              value={values.atmosphericPressure}
              onChange={onChangeFormInputValue}
            />
            <br />
            <br />

            <label htmlFor="temperature">Temperature: </label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={values.temperature}
              onChange={onChangeFormInputValue}
            />
            <br />
            <br />
          </fieldset>

          <br />

          <button type="submit">Submit</button>
        </form>
      </Box>

      <Box>
        <h2>
          Altitude:{" "}
          {calculatedAltitude !== null
            ? parseFloat(calculatedAltitude).toFixed(2) + " MASL"
            : "–"}
        </h2>
      </Box>
    </Flex>
  );
}

DensityAltitude.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
