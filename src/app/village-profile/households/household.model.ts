export class Household {
    constructor(public id: string,
        public hamlet_id: string,
        public registration_date: string,
        public household_number: string,
        public head_name: string,
        public phone: number,
        public photo: string,
        public current_status: number,
        public number_of_hh_members: number,
        public hamlet_name: string){}
}