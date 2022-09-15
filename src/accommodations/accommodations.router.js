const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/role.middleware')
const accommodationServices = require('./accommodations.http')
const reservationServices = require('../reservations/reservation.http')
const { session } = require('passport')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(accommodationServices.getAll)


router.route('/reservations')
    .get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,  reservationServices.getAll)

    router.route('/reservations/me')
    .get(passport.authenticate('jwt', {session: false}), reservationServices.getById)
    

    router.route('/reservations/:id')
.get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, reservationServices.getById)



router.route('/:id/make-reservation')
    .post(passport.authenticate('jwt', {session: false}), reservationServices.postReservation)

router.route('/:id')
    .get(accommodationServices.getById)
    .put(passport.authenticate('jwt', {session: false}), accommodationServices.edit)


 



module.exports= {
    router
}
