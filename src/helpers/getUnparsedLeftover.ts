import { Benefit } from "../types/Benefit";

export const getUnparsedLeftover = (benefits: Benefit[]) => {
  const filteredBenefits = benefits.filter(
    (value: Benefit) => JSON.stringify(value) !== "{}",
  );
  return filteredBenefits.flat();
};
