const toPromise = (fn) => {
    return fn()
        .then(res => [null, res])
        .catch(err => [err, null])
}