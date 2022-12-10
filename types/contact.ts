export interface ContactPost {
  firstname: string;
  lastname: string;
  email: string;
  personalnumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface DbContact extends ContactPost {
  _id: string;
  __v: number;
}

export interface Contact extends DbContact {
  lat: number;
  lng: number;
}
