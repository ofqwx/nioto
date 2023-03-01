import { FormEvent, useCallback, useState } from "react";
import { Activity } from "./types";

type DataEntryFormProps = {
  submit: (values: DataInput) => void;
};

export type DataInput = {
  date: string;
  activity: Activity;
  totalTime: number;
  temperature?: number;
  airPressure?: number;
  altitude?: number;
  humidity?: number;
  massBefore?: number;
  massAfter?: number;
  liquidIntake?: number;
  sodiumLossPerLiter?: number;
  kCalories?: number;
  avgHR?: number;
  maxHR?: number;
  avgPower?: number;
  bikeFTP?: number;
};

export default function DataEntryForm({ submit }: DataEntryFormProps) {
  const [values, setValues] = useState<DataInput>({
    date: "",
    activity: Activity.CYCLING,
    totalTime: 0,
  });

  const onChangeFormInputValue = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
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

      submit(values);
    },
    [values]
  );

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Data</legend>

        <label htmlFor="date">Date: </label>
        <input
          type="text"
          id="date"
          name="date"
          value={values.date}
          onChange={onChangeFormInputValue}
        />
        <br />
        <br />

        <label htmlFor="activity">Activity: </label>
        <select
          id="activity"
          name="activity"
          value={values.activity}
          onChange={onChangeFormInputValue}
        >
          {(Object.keys(Activity) as Array<keyof typeof Activity>).map(
            (key) => (
              <option value={key}>{Activity[key]}</option>
            )
          )}
        </select>
        <br />
        <br />

        <label htmlFor="totalTime">Date: </label>
        <input
          type="number"
          id="totalTime"
          name="totalTime"
          value={values.totalTime}
          onChange={onChangeFormInputValue}
        />
        <br />
        <br />
      </fieldset>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
