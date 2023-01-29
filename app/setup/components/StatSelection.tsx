import { FC, useMemo } from "react";
import { statConfigsById } from "../../../data/types/statConfigsById";
import StatSelectionInput from "./StatSelectionInput";

interface Props {}

const StatSelection: FC<Props> = () => {
  const statInputs = useMemo(
    () =>
      Object.values(statConfigsById).map((statConfig) => {
        return <StatSelectionInput key={statConfig.id} statConfig={statConfig} />;
      }),
    []
  );

  return <div>{statInputs}</div>;
};

export default StatSelection;
