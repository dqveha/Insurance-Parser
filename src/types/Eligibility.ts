import { Benefit } from "./Benefit";
import { ErrorAAA } from "./ErrorAAA";

export type Eligibility = {
  errors?: ErrorAAA[];
  benefitsInformation?: Benefit[];
};
