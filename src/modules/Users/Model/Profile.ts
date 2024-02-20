interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  pesel: string;
  birthDate: Date;
  sex: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
  citizenship: Citizenship;
  studentNumber: string;
  photoUrl: string;
  addresses: Address[];
}

interface Citizenship {
  countryCode: string;
}

interface Address {
  type: string;
  value: string;
}

export default Profile;
