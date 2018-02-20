export class Mother {
  public caseId:string;
  public householdMemberId:string;
  public orgUnit:string;
  public name:string;
  public age: number;
  public photoPath:string;
  public registrationDate: Date;
  public registrationLocation: string;
  public registeredBy: string; // care provider id
  // general pregnancy details
  public lmp: Date;
  public edd: string;
  public isHighRisk:boolean;
  public riskFactors:boolean;

  //anc visits
  public anc1_date: Date;
  public anc2_date: Date;
  public anc3_date: Date;
  public anc4_date: Date;
  public anc_visit_number: number;

  //anc_visit_or_followup_details





}

