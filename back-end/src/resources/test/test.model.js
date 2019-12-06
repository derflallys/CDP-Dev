import { getSeq } from '../../utils/counter.model'
const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task',
      required: true
    },
    testId: {
      type: Number
    },
    nom: {
      type: String,
      required: true,
      maxlength: 250
    },
    type: {
      type: String,
      required: true,
      maxlength: 250
    },
    resultat_attendu: {
      type: String,
      required: true,
      maxlength: 250
    }
  },
  { timestamps: true }
)

TestSchema.pre('save', async function(next) {
  console.log('pre save')
  const st = this
  const seq = getSeq('Test', st.projectId)
  const res = await seq
  st.testId = res
  next()
})

export const Test = mongoose.model('Test', TestSchema)
