// this data file Contains all select field values//

type SelectOption = {
  name: string;
  value: string;
};

// Loan Summary //
//1. What is your loan for?*

export const WhatLoan: SelectOption[] = [
  { name: "Car", value: "Car" },
  // { name: "Motorbike", value: "Motorbike" },
  // { name: "Boat", value: "Boat" },
  // { name: "Caravan", value: "Caravan" },
  // { name: "Other", value: "Other" },
  // { name: "Wedding", value: "Wedding" },
  // { name: "Renovation", value: "Renovation" },
  // { name: "Debt Consolidation", value: "Debt Consolidation" },
  // { name: "Travel", value: "Travel" },
];

//2.What information do you have?*

export const LoanInformation: SelectOption[] = [
  { name: "None - I'm still looking", value: "None - I'm still looking" },
  { name: "Registration", value: "Registration" },
  { name: "Trade Me Listing", value: "Trade Me Listing" },
  { name: "Make, Model, Year", value: "Make, Model, Year" },
  { name: "Auto Trader", value: "Auto Trader" },
  { name: "VIN", value: "VIN" },
];

//3.Payment frequency

export const PaymentFrequency: SelectOption[] = [
  { name: "Weekly", value: "Weekly" },
  { name: "Fortnightly", value: "Fortnightly" },
  { name: "Monthly", value: "Monthly" },
];

// Borrower's Details //
// 4.Contact Details

export const Title: SelectOption[] = [
  { name: "Mr", value: "Mr" },
  { name: "Mrs", value: "Mrs" },
  { name: "Ms", value: "Ms" },
  { name: "Miss", value: "Miss" },
];

// 5.Residency status
export const ResidencyStatus: SelectOption[] = [
  { name: "NZ Citizen", value: "NZ Citizen" },
  { name: "Permanent Resident", value: "Permanent Resident" },
  { name: "Valid Work Visa", value: "Valid Work Visa" },
  { name: "Student Visa", value: "Student Visa" },
  { name: "Holiday Visa", value: "Holiday Visa" },
  { name: "Other", value: "Other" },
  { name: "Australian Citizen", value: "Australian Citizen" },
];
// 6. Living Situiation

export const LivingSituation: SelectOption[] = [
  { name: "Rent", value: "Rent" },
  { name: "Board", value: "Board" },
  { name: "Own", value: "Own" },
  { name: "Parents", value: "Parents" },
  { name: "Other", value: "Other" },
];

//7. Driving Licensce

export const DriversLicence: SelectOption[] = [
  { name: "None", value: "None" },
  { name: "Learners", value: "Learners" },
  { name: "Restricted", value: "Restricted" },
  { name: "Full", value: "Full" },
  { name: "Overseas", value: "Overseas" },
  { name: "Provisional", value: "Provisional" },
];

//7. Relationship status*

export const RelationshipStatus: SelectOption[] = [
  { name: "Married", value: "Married" },
  { name: "Separated", value: "Separated" },
  { name: "Single", value: "Single" },
  { name: "DeFacto", value: "DeFacto" },
];
// 8.No. of dependents*
export const NOOfDependents: SelectOption[] = [
  { name: "0", value: "0" },
  { name: "1", value: "1" },
  { name: "2", value: "2" },
  { name: "3", value: "3" },
  { name: "4", value: "4" },
  { name: "5", value: "5" },
  { name: "6", value: "6" },
  { name: "7", value: "7" },
  { name: "8", value: "8" },
  { name: "9", value: "9" },
];
// 9.Employment Type*

export const EmploymentType: SelectOption[] = [
  { name: "Full time", value: "Full time" },
  { name: "Part time", value: "Part time" },
  { name: "Self employed", value: "Self employed" },
  { name: "Benefit", value: "Benefit" },
  { name: "Other", value: "Other" },
];

//10.Payment frequencey  additonal

export const AdditonalFrequency: SelectOption[] = [
  { name: "Weekly", value: "Weekly" },
  { name: "Fortnightly", value: "Fortnightly" },
  { name: "Monthly", value: "Monthly" },
  { name: "Quarterly", value: "Quarterly" },
  { name: "Annually", value: "Annually" },
];

// form status
export const FormStatus = [
  { value: "Pending", label: "Pending" },
  { value: "Assigned", label: "Assigned" },
  { value: "On Hold", label: "On Hold" },
  { value: "Ready To Submit", label: "Ready To Submit" },
  { value: "Submitted", label: "Submitted" },
  { value: "Approved", label: "Approved" },
  { value: "Documents Sent", label: "Documents Sent" },
  { value: "Submitted For Payout", label: "Submitted For Payout" },
  { value: "Closed", label: "Closed" },
];
