# Insurance Eligibility Parser

## Description

This is a project to parse and sort out insurance eligibility information returned by [Change Healthcare's Eligibility API](https://developers.changehealthcare.com/eligibilityandclaims/reference/medical-network-eligibility-v3-overview). Examples of them are under `src/eligibilities` with descriptions found [here](#from-change-healthcares-sandbox-api-values-and-test-responses).

Two outputs are console logged.

1. `(a) - UNPARSED LEFTOVER` - An internal validating tool. While the function runs, it assures if the properties were looked and parsed from the Change Healthcare JSON. Any objects leftover is a sign that there are gaps within the `(b) - BENEFIT SUMMARY` and should update the function to include what's in the unparsed leftover.
2. `(b) - BENEFIT SUMMARY` - The data model is outputted on the basis of this order: `Benefit summary` -> `In-Network / Out-of-Network` -> `Coverage Level` -> `Service Type` -> `Eligibility or Benefit Information`.

## Installation

- NOTE: Requires node installed

1. Clone this repo.
2. `cd` into `InsuranceParser` and `npm install`.
3. Change ID of eligibility on line 1 of `src/app.ts` to desired Change Healthcare Eligibility example, save, then run `npm run test` in terminal for results.
4. There should be two console log outputs for review: `(a) - UNPARSED LEFTOVER` and `(b) - BENEFIT SUMMARY`

### From Change Healthcare's "[Sandbox API Values and Test Responses](https://developers.changehealthcare.com/eligibilityandclaims/docs/eligibility-sandbox-api-values-and-test-responses)"

| ID     | Description                                                                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 00001  | This is a canned response that returns a single coverage plan. This will work for any payer.                                                                                          |
| 000002 | This is a canned response that returns a badly formatted 271. This will work for any payer.                                                                                           |
| 00003  | This is a canned response that returns a good 271 that contains maxed MSG01 field (AN..264) and EB03 repeating data element (99 repeats). This will work for any payer.               |
| 00004  | This is a canned response that returns AAA Not Eligible For Inquiries. This will work for any payer.                                                                                  |
| 00005  | This is a canned response that contains non-printable characters which we need to make sure we can parse. This will work for any payer.                                               |
| 00006  | A system error from the Payer.&nbsp; AAA segment in the 2000A Information Source Loop with AAA01 = Y, AAA03 = 42 and AAA04 = R.                                                       |
| 00007  | This is a canned response that returns a single coverage plan with unused fields. This will work for any payer.                                                                       |
| 000008 | This is a canned response that returns a 271 that contains data in deprecated fields. It is used to test our parser's handling of data in these fields. This will work for any payer. |
| 00009  | This returns a canned 271 response where the patient is a dependent.                                                                                                                  |
| 00036  | Florida Medicaid: Sample response.                                                                                                                                                    |
| 000039 | Different Deductible at 30 and other STC.                                                                                                                                             |
| 000040 | EB 1 with no benefits (Active Coverage) and EB I (Non Covered).                                                                                                                       |
| 000041 | Test EB 6 (Inactive) and EB W (Other Source of Data).                                                                                                                                 |
| 000042 | EB R — other additional payer. Sample use case for standard Medicaid benefit.                                                                                                         |
| 000043 | EB W response (other source of Data).                                                                                                                                                 |
| 000044 | High Out-of-Pocket Remaining but no deductible in response.                                                                                                                           |
| 000045 | Low Deductible High Premium — many different copayments.                                                                                                                              |
| 000046 | Low Deductible High Premium with no coinsurance.                                                                                                                                      |
| 000047 | Low Deductible High Premium.                                                                                                                                                          |
| 000048 | Low Deductible with no copayment.                                                                                                                                                     |
| 000049 | Multiple Services.                                                                                                                                                                    |
| 000050 | No Deductible, High Out-of-Pocket Remaining, only co-pay and co-insurance.                                                                                                            |
| 000051 | No Deductible, only copay for 33,98, UC.                                                                                                                                              |
| 000052 | No Deductible, No copayment.                                                                                                                                                          |
| 000053 | Plan with active coverage but no patient responsibility.                                                                                                                              |
| 000054 | Response with AD time period 25.                                                                                                                                                      |
| 000055 | Too many deductibles at service levels.                                                                                                                                               |
| 000056 | Uniquely formatted EB segment.                                                                                                                                                        |
| 000067 | Sample use case from PAA.                                                                                                                                                             |
| 000068 | Sample use case 2 from PAA.                                                                                                                                                           |
| 000069 | Sample Use case for EB V (Cannot Process).                                                                                                                                            |
| 000070 | Sample Use case for EB U (contact Following Entity for Eligibility or Benefit Information).                                                                                           |
| 000074 | Sample Use case for Connecticut Medicaid.                                                                                                                                             |
| 000081 | Sample response for WellCare.                                                                                                                                                         |
| 000082 | Sample response for Blue Cross Blue Shield Georgia.                                                                                                                                   |
| 000083 | Sample response for Humana.                                                                                                                                                           |
| ABHFL  | Sample use case for Aetna Better Health of Florida.                                                                                                                                   |
| ABHKY  | Sample use case for Aetna Better Health of Kentucky.                                                                                                                                  |
| ABHLA  | Sample use case for Aetna Better Health of Louisiana.                                                                                                                                 |
| ABHMO  | Sample use case for Aetna Better Health of Missouri.                                                                                                                                  |
| AETNX  | Sample response for AETNA.                                                                                                                                                            |
| BCCTC  | Sample use case for Blue Cross Blue Shield Connecticut.                                                                                                                               |
| BCNJC  | Sample response for BCBS of New Jersey (Horizon).                                                                                                                                     |
| CIGNA  | A sample response for CIGNA for dependent.                                                                                                                                            |
| CNTCR  | Sample use case for Connecticare Inc.                                                                                                                                                 |
| COVON  | Sample response for Coventry.                                                                                                                                                         |
| CT     | Sample use case for Connecticut Medicaid.                                                                                                                                             |
| DENTAL | Sample response for benefits from Dental Payer.                                                                                                                                       |
| HUM    | Sample response for Humana.                                                                                                                                                           |
| ILMSA  | Sample use case for Aetna Better Health of Illinois.                                                                                                                                  |
| ISCAM  | Sample response for Medi-CAL Portal connection.                                                                                                                                       |
| MA/MB  | Sample response for Medicare Part A/Medicare Part B.                                                                                                                                  |
| MEDX   | Sample response for MEDEX.                                                                                                                                                            |
| MMSI   | Sample use case for Mayo.                                                                                                                                                             |
| TRICE  | Sample response for Tricare.                                                                                                                                                          |
| TX     | Sample response for Texas Medicaid.                                                                                                                                                   |
| TXBCBS | Sample response for Blue Advantage HMO.                                                                                                                                               |
| UHC    | Sample response for United Healthcare.                                                                                                                                                |

### Notes

- `trailerLoopIdentifierCode` and `headerLoopIdentifierCode` is noise since there are two 2120 ([C - Subscriber Benefit Related Entity Name Loop](https://www.stedi.com/app/guides/view/hipaa/health-care-eligibility-benefit-response-x279a1/01GS66YHZPB37ABF34DBPSR213#properties.detail.properties.information_source_level_HL_loop.items.properties.information_receiver_level_HL_loop.items.properties.subscriber_level_HL_loop.items.properties.subscriber_name_NM1_loop.properties.subscriber_eligibility_or_benefit_information_EB_loop.items.properties.subscriber_benefit_related_entity_name_NM1_loop) / [D - Dependent Benefit Related Entity Name Loop](https://www.stedi.com/app/guides/view/hipaa/health-care-eligibility-benefit-response-x279a1/01GS66YHZPB37ABF34DBPSR213#properties.detail.properties.information_source_level_HL_loop.items.properties.information_receiver_level_HL_loop.items.properties.subscriber_level_HL_loop.items.properties.dependent_level_HL_loop.items.properties.dependent_name_NM1_loop.properties.dependent_eligibility_or_benefit_information_EB_loop.items.properties.dependent_benefit_related_entity_name_NM1_loop)), but Change Healthcare's API doesn't specify which 2120 loop it is.

Can improve with:

1.  Commits -- Should've started with this! Almost feels sacrilegious in hindsight - hah
2.  Zod schema for integrity of consistent data type and formatting
3.  Incorporate database
4.  Consistent capitalization of keys
5.  Testing framework such as Jest
6.  Within much of the parsing function can be DRY'd
7.  Further type-checking

What I've learned while doing this project:

1.  Even with the unparsed leftover as an internal validator, it's not perfect - such as the name being "Other or Additional Payor" and not accounting for multitudes of it (e.g. Med A, Med B). Or its additional information.
2.  Recently read a post about 10 software engineering golden rules, and the one I resonated with most regarding this project is this: `"There are no universal solutions. Evaluate tradeoffs for each context".`
3.  Going off from (2), there are so many variations of what a benefit input looks like and its type. It would be excruciating long to organize that.

Authored by:
Dave Lindqvist
