const onError = (res, error) => () => res.send({ error })

module.exports = onError
