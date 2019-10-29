export const getOne = model => async (req, res) => {
  res.send(await model.findById(req.params.id).exec())
}

export const getMany = model => async (req, res) => {
  res.send(await model.find({}).exec())
}

export const createOne = model => async (req, res) => {
  res.send(await model.create(req.body))
}

export const updateOne = model => async (req, res) => {
  res.send(
    model.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
  )
}

export const removeOne = model => async (req, res) => {
  res.send(model.findByIdAndRemove(req.params.id).exec())
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
