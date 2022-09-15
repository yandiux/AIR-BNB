const reservationControllers = require('./reservations.controllers')

const postReservation = (req, res) => {
    const userId = req.user.id
    const data = req.body
    const accomodationId = req.params.id
    reservationControllers.createReservation(data, userId, accomodationId)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json({status: 400, message: err.message})
        })
}

const getAll = (req, res) => {
    reservationControllers.getAllReservations()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const getById = (req, res) => {
    reservationControllers.getMyReservation(id)
    const id = req.params.id
    reservationControllers
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `La reservacion con el id ${id} no existe` });
    });
}


module.exports = {
    postReservation,
    getAll,
    getById
}