export type Benefit = {
  code?: string;
  name?: string;
  serviceTypeCodes?: string[];
  serviceTypes?: string[];
  insuranceTypeCode?: string;
  insuranceType?: string;
  planCoverage?: string;
  headerLoopIdentifierCode?: string;
  trailerLoopIdentifierCode?: string;
  benefitsRelatedEntity?: {
    entityIdentifier?: string;
    entityType?: string;
    entityName?: string;
    entityFirstname?: string;
    entityMiddlename?: string;
    entityIdentification?: string;
    entityIdentificationValue?: string;
    contactInformation?: {
      name?: string;
      contacts?: Array<{
        communicationMode: string;
        communicationNumber: string;
      }>;
    };
    address?: {
      address1?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    };
  };
  benefitsRelatedEntities?: {
    entityIdentifier?: string;
    entityType?: string;
    entityName?: string;
    entityFirstname?: string;
    entityMiddlename?: string;
    entityIdentification?: string;
    entityIdentificationValue?: string;
    contactInformation?: {
      name?: string;
      contacts?: Array<{
        communicationMode: string;
        communicationNumber: string;
      }>;
    };
    address?: {
      address1?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    };
  }[];
  coverageLevelCode?: string;
  coverageLevel?: string;
  timeQualifierCode?: string;
  timeQualifier?: string;
  benefitAmount?: string;
  inPlanNetworkIndicatorCode?: string;
  inPlanNetworkIndicator?: string;
  additionalInformation?: { description: string }[];
  benefitPercent?: string;
  benefitQuantity?: string;
  quantityQualifier?: string;
  quantityQualifierCode?: string;
  authOrCertIndicator?: string;
  benefitsDateInformation?: {
    planBegin?: string;
    benefitBegin?: string;
    eligibility?: string;
    plan?: string;
    benefit?: string;
    admission?: string;
    admissions?: {
      date: string;
    }[];
  };
  benefitsAdditionalInformation?: {
    planNumber?: string;
    drugFormularyNumber?: string;
    planNetworkIdNumber?: string;
    groupNumber?: string;
    insurancePolicyNumber?: string;
  };
};
