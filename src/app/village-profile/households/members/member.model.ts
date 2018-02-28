export class Member {
    constructor(public id: string,
        public household_id: string,
        public first_name: string,
        public middle_name: string,
        public last_name: string,
        public sex: string,
        public date_of_birth: string,
        public vital_registration_number: string,
        public tin_number: string,
        public occupation: string,
        public educational_status: string,
        public marital_status: string,
        public phone: string,
        public email: string,
        public current_status: string,
        public photo: string){}
}