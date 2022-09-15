
const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Users = require("../models/user.model");

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    include: [
        {
            model: Places,
            
        },
        {
          model: Users,
          as: 'user'
        },
    ],
    // attributes: {
    //   exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
    // },
  });

  // const data = await Users.findAll({
  //     include: {
  //         model: Accommodations,
  //         include: {
  //             model: Places,
  //             attributes:{
  //                 exclude: ['createdAt', 'updatedAt']
  //             }
  //         }
  //     }
  // })
  return data;
};

const getAccommodationById = async (id) => {
  const data = await Accommodations.findOne({
    where: {
      id,
    },
    include:[ {
      model: Places,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },{
      model: Users,
      as: 'user',
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
    },
  });
  return data;
};

const createAccommodation = async(userId) => {
  const newAccommodation = await Accommodations.create({
      id: UUID.v4(),
      title: data.title,
      description: data.description,
      guest: data.guest,
      rooms: data.rooms,
      beds: data.beds,
      bathrooms: data.bathrooms,
      price: data.price,
      hostId: userId,
      score: data.score,
      placesId: data.placesId,
      commision: data.commision
      
  }
  )
  return newAccommodation
}


const editAccommodations = async(roleId, data, userId, accommodationId) => {
  const {id, placesId, hostId, ...restOfProperties } = data;
  if ('97006fe0-4a35-47f4-bfbf-fc962e5fe500' === roleId && userId === hostId) {
    const response = await Accommodations.update(
      {...restOfProperties },
      {
        where: {
          id: accommodationId
        }
      }
    )
    return response
  }
}

const deleteAccommodations = async (roleId, userId) => {
  if ('97006fe0-4a35-47f4-bfbf-fc962e5fe500' === roleId){
    const response = Accommodations.destroy({
      where: {
        id: userId
      }
    })
    return response
  }
 
}

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  editAccommodations,
  deleteAccommodations
};
