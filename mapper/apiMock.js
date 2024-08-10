/* eslint-disable no-unused-vars */
/**
 * Las respuestas del backend suelen contener propiedades mal nombradas como "ciudadO, tokenXUsuario etc"
 * En su momento larry implementó estas clases "mappers para renombrar las respuestas del backend
 * También puede implementar su propio metodos como getFullName etc
 */
export const dataMock = [
  {
    ID: 1,
    nombr: "Juan",
    apellidO: "Perez",
    correO: "p5KQd@example.com",
    direcciones: [
      { calle: "calle 1", avenida: "avenida 1", ciudad: "ciudad 1" },
      { calle: "calle 2", avenida: "avenida 2", ciudad: "ciudad 2" },
    ],
    telefonos: ["123456789", "987654321"],
    fechaN: "1990-01-01",
    estado: "Activo",
    ciudadO: "ciudad 1",
  },
];

class Address {
  constructor(street, avenue, city) {
    this.street = street;
    this.avenue = avenue;
    this.city = city;
  }
  static fromJson(obj) {
    return new Address(obj["calle"], obj["avenida"], obj["ciudad"]);
  }
}

export class User {
  constructor(
    id,
    name,
    lastName,
    email,
    address,
    phone,
    dateOfBirth,
    state,
    originCity
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.state = state;
    this.originCity = originCity;
  }
  static fromJson(obj) {
    return new User(
      obj["ID"],
      obj["nombr"],
      obj["apellidO"],
      obj["correO"],
      obj["direcciones"].map((item) => Address.fromJson(item)),
      obj["telefonos"],
      obj["fechaN"],
      obj["estado"],
      obj["ciudadO"]
    );
  }
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}
