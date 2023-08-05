import "./styles.css";
import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

function StatusLego({ defaultLego, i }) {
  const { register } = useFormContext();

  return (
    <div>
      <b>status</b>
      <br />
      <input {...register(`legos.${i}.value`)} />
    </div>
  );
}

function OperatorLego({ defaultLego, i }) {
  return <b>operator: {defaultLego.name}</b>;
}

function BlockNumberLego({ defaultLego, i }) {
  const { register } = useFormContext();

  return (
    <div>
      <b>block number</b>
      <br />
      <label>
        min:
        <input {...register("status")} />
      </label>
      <br />
      <label>
        min:
        <input {...register("status")} />
      </label>
    </div>
  );
}

function Lego({ defaultLego, i }) {
  switch (defaultLego.name) {
    case "status":
      return <StatusLego i={i} defaultLego={defaultLego} />;
    case "OR":
    case "AND":
      return <OperatorLego i={i} defaultLego={defaultLego} />;
    case "block_number_range":
      return <BlockNumberLego i={i} defaultLego={defaultLego} />;
    default:
      throw new Error("bad");
  }
}

const initialLegos = [
  {
    type: "attribute",
    name: "status",
    value: "good"
  },
  {
    type: "operator",
    name: "OR"
  },
  {
    type: "attribute",
    name: "block_number_range",
    min: 0,
    max: 0
  }
];

export default function App() {
  const formMethods = useForm({
    defaultValues: {
      status: "bad",
      legos: initialLegos
    }
  });
  const { handleSubmit } = formMethods;
  const onSubmit = (data) => console.log(data);

  const [defaultLegos, setDefaultLegos] = useState(initialLegos);

  const addLego = () =>
    setDefaultLegos((legos) => [
      ...legos,
      {
        type: "operator",
        name: "AND"
      }
    ]);

  return (
    <div className="App">
      <h1>Legos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          {defaultLegos.map((lego, i) => (
            <Lego key={i} i={i} defaultLego={lego} />
          ))}
        </FormProvider>
        <button type="button" onClick={addLego}>
          Add Lego
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
