import * as response from "./Eligibilities/000051.json";
import { Benefit } from "./types/Benefit";
import { Eligibility } from "./types/Eligibility";
import { networkMap } from "./maps/networkMap";
import { deleteBenefitProperties } from "./helpers/deleteBenefitProperties";
import { getUnparsedLeftover } from "./helpers/getUnparsedLeftover";

const benefitsSummary: any = {
  "Not Applicable": {},
  "In-Network": {},
  "Out-of-Network": {},
  "Other Payors": {},
  Unknown: {},
};

const parseBenefits = (eligibility: Eligibility) => {
  let benefits: Benefit[];

  if (eligibility.errors) {
    console.log(eligibility.errors);
    return eligibility.errors;
  }
  if (eligibility.benefitsInformation) {
    benefits = eligibility.benefitsInformation;

    // To reference what's leftover after parsing as a validating tool
    const benefitsClone: any = structuredClone(benefits);

    benefits.forEach((benefit, index: number) => {
      const {
        additionalInformation,
        authOrCertIndicator,
        benefitAmount,
        benefitPercent,
        benefitQuantity,
        benefitsAdditionalInformation,
        benefitsDateInformation,
        benefitsRelatedEntity,
        benefitsRelatedEntities,
        coverageLevel,
        name,
        inPlanNetworkIndicator,
        insuranceType,
        planCoverage,
        quantityQualifier,
        timeQualifier,
        serviceTypes,
      } = benefit;

      let planNetwork: string, coverage: string;

      if (inPlanNetworkIndicator) {
        planNetwork = inPlanNetworkIndicator;
      } else {
        planNetwork = "Unknown";
      }

      const network = networkMap[planNetwork as keyof typeof networkMap];

      if (coverageLevel) {
        coverage = coverageLevel;
      } else {
        coverage = "Other";
      }

      if (!benefitsSummary[network][coverage]) {
        benefitsSummary[network][coverage] = {};
      }

      if (serviceTypes) {
        serviceTypes.forEach((service: string) => {
          if (name && name !== "Other or Additional Payor") {
            let benefitInfo: any;

            if (!(service in benefitsSummary[network][coverage])) {
              benefitsSummary[network][coverage][service] = {};
            }

            if (!(name in benefitsSummary[network][coverage][service])) {
              benefitsSummary[network][coverage][service][name] = {};
              benefitInfo = {
                ...benefitsSummary[network][coverage][service][name],
              };

              if (insuranceType) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  insuranceType,
                };
              }
            }

            if (benefitsDateInformation) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                benefitsDateInformation,
              };
            }
            if (planCoverage) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                planCoverage,
              };
            }
            if (authOrCertIndicator) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                authOrCertIndicator,
              };
            }
            if (benefitsAdditionalInformation) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                benefitsAdditionalInformation,
              };
            }

            if (benefitAmount) {
              if (timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: { benefitAmount, additionalInformation },
                };
              } else if (!timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  benefitAmount,
                  additionalInformation,
                };
              } else if (timeQualifier && !additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: benefitAmount,
                };
              } else {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  benefitAmount,
                };
              }
            }
            if (benefitPercent) {
              if (timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: { benefitPercent, additionalInformation },
                };
              } else if (!timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  benefitPercent,
                  additionalInformation,
                };
              } else if (timeQualifier && !additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: benefitPercent,
                };
              } else {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  benefitPercent,
                };
              }
            }
            // 00036 requires this logic
            if (quantityQualifier && benefitQuantity) {
              if (timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: {
                    [quantityQualifier]: benefitQuantity,
                    additionalInformation,
                  },
                };
                console.log(benefitsSummary[network][coverage][service][name]);
              } else if (timeQualifier && !additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  [timeQualifier]: { [quantityQualifier]: benefitQuantity },
                };
              } else if (!timeQualifier && additionalInformation) {
                benefitsSummary[network][coverage][service][name] = {
                  ...benefitsSummary[network][coverage][service][name],
                  benefitQuantity,
                  additionalInformation,
                };
              } else {
                benefitsSummary[network][coverage][service][name][
                  quantityQualifier
                ] = benefitQuantity;
              }
            }

            if (benefitsRelatedEntity) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                benefitsRelatedEntity,
              };
            }
            if (benefitsRelatedEntities) {
              benefitsSummary[network][coverage][service][name] = {
                ...benefitsSummary[network][coverage][service][name],
                benefitsRelatedEntities,
              };
            }
          } else {
            if (!benefitsSummary["Other Payors"][coverage]) {
              benefitsSummary["Other Payors"][coverage] = [];
            }
            benefitsSummary["Other Payors"][coverage] = [
              ...benefitsSummary["Other Payors"][coverage],
              benefit,
            ];
          }

          benefitsClone[index].serviceTypes.shift();
          benefitsClone[index].serviceTypeCodes.shift();
        });

        if (
          benefitsClone[index].serviceTypes.length === 0 &&
          benefitsClone[index].serviceTypeCodes.length === 0
        ) {
          deleteBenefitProperties(benefitsClone[index]);
        }
      }
    });

    const unparsedLeftover = getUnparsedLeftover(benefitsClone);

    console.group("(a) - UNPARSED LEFTOVER");
    console.dir(unparsedLeftover, { depth: null });
    console.log("LENGTH: ", unparsedLeftover.length);
    console.groupEnd();
    console.log();
    console.group("(b) - BENEFIT SUMMARY");
    console.dir(benefitsSummary, { depth: null });
    console.groupEnd();

    return benefitsSummary;
  }
};

parseBenefits(response);
