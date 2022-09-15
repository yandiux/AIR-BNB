const accomodationMiddleware = (req, res, next) => {
    req.currentAccomodation = await AccomodationController.getAccomodationById(req.params.id)
    next()
}