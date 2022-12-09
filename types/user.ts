export interface InitialUser {
  firstname: string;
  lastname: string;
  email: string;
  personalnumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface DbUser extends InitialUser {
  _id: string;
}

export interface User extends DbUser {
  lat: number;
  lng: number;
}
