export default class ShipmentTracking {
  constructor(
    trackingNumber,
    shipper,
    shipperId,
    documentedDate,
    promiseDate,
    serviceName,
    contact,
    originPostalCode,
    originCity,
    originCountry,
    destinationPostalCode,
    destinationCity,
    destinationCountry,

    trackingLabels,
    trackingReports
  ) {
    this.trackingNumber = trackingNumber;
    this.shipper = shipper;
    this.shipperId = shipperId;
    this.documentedDate = documentedDate;
    this.promiseDate = promiseDate;
    this.serviceName = serviceName;
    this.contact = contact;
    this.originPostalCode = originPostalCode;
    this.originCity = originCity;
    this.originCountry = originCountry;
    this.destinationPostalCode = destinationPostalCode;
    this.destinationCity = destinationCity;
    this.destinationCountry = destinationCountry;

    this.trackingLabels = trackingLabels;
    this.trackingReports = trackingReports;
  }

  static fromJson(obj) {
    return new ShipmentTracking(
      obj["TrackingNumber"],
      obj["Shipper"],
      obj["IdShipper"],
      obj["FechaDoc"],
      obj["FechaPromesa"],
      obj["NombreServicio"],
      obj["ContactoO"],
      obj["CPO"],
      obj["CiudadO"],
      obj["PaisO"],
      obj["CPD"],
      obj["CiudadD"],
      obj["PaisD"],

      obj["TrackingLabels"].map((item) => Labels.fromJson(item)),
      obj["Reports"].map((item) => Reports.fromJson(item))
    );
  }
}

class Labels {
  constructor(imgUrl, descriptionState, isOn) {
    this.imgUrl = imgUrl;
    this.descriptionState = descriptionState;
    this.isOn = isOn;
  }

  static fromJson(obj) {
    return new Labels(obj["UrlImg"], obj["Namestate"], obj["On"]);
  }
}

class Reports {
  constructor(date, time, location, status, statusCode) {
    this.date = date;
    this.time = time;
    this.location = location;
    this.status = status;
    this.statusCode = statusCode;
  }

  static fromJson(obj) {
    return new Reports(
      obj["date"],
      obj["time"],
      obj["location"],
      obj["status"],
      obj["statusCode"]
    );
  }
}
