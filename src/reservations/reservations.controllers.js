const uuid = require('uuid')
const Reservation = require('../models/reservations.model')

const getAllReservations = async () => {
    const data = await Reservation.findAll()
    return data
}

const  getMyReservation = async (id) => {
    const data = await Reservations.findOne({
       where: {
        id: id
       },
       include: {
        model: Accommodations
       }

    
    
    })
    return data
}


const createReservation = async(data, userId, accommodationId) => {
    console.log( "accommodation"  + accommodationId)
    const {isFinished, isCanceled, ...restOfData} = data
    const newReservation = await Reservation.create({
        ...restOfData,
        id: uuid.v4(),
        userId: userId,
        accommodationId: accommodationId,
    })
  
    return newReservation
}


module.exports = {
    createReservation,
    getAllReservations,
    getMyReservation
}
