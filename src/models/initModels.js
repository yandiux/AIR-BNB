const Accommodation_images = require("./accommodation_images.model");
const Accommodations = require("./accommodations.model");
const Places = require("./places.model");
const Reservations = require("./reservations.model");
const Users = require("./user.model");
const Users_images = require("./users_images.model");
const Roles = require("./roles.model");

const initModels = () => {

  //? Users <- Roles
  Roles.hasMany(Users);
  Users.belongsTo(Roles);

  //? Users -> Users_images
  Users_images.belongsTo(Users);
  Users.hasMany(Users_images);

  //? Users <-> Accomodations
  // Users.belongsToMany(Accommodations, { through: Reservations, });
  // Accommodations.belongsToMany(Users, { through: Reservations,});

  Users.hasMany(Reservations)
  Reservations.belongsTo(Users)


   Accommodations.hasMany(Reservations)
   Reservations.belongsTo(Accommodations)

  //? Accomodations -> Acommodation_images
  Accommodation_images.belongsTo(Accommodations);
  Accommodations.hasMany(Accommodation_images);

  //? 
  Accommodations.belongsTo(Places);
  Places.hasMany(Accommodations);

  //? User -> Acommodations (Host)
  Users.hasMany(Accommodations)
  Accommodations.belongsTo(Users)
};

module.exports = initModels;
