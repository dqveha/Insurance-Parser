import { Benefit } from "../types/Benefit";

export const deleteBenefitProperties = (benefit: Benefit) => {
  const toDelete = [
    "additionalInformation",
    "authOrCertIndicator",
    "benefitAmount",
    "benefitPercent",
    "benefitQuantity",
    "benefitsAdditionalInformation",
    "benefitsDateInformation",
    "benefitsRelatedEntity",
    "benefitsRelatedEntities",
    "code",
    "coverageLevel",
    "coverageLevelCode",
    "headerLoopIdentifierCode",
    "inPlanNetworkIndicator",
    "inPlanNetworkIndicatorCode",
    "insuranceType",
    "insuranceTypeCode",
    "name",
    "planCoverage",
    "quantityQualifier",
    "quantityQualifierCode",
    "serviceTypeCodes",
    "serviceTypes",
    "timeQualifier",
    "timeQualifierCode",
    "trailerLoopIdentifierCode",
  ];
  toDelete.forEach((key: string) => delete benefit[key as keyof Benefit]);
};
