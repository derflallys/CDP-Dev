const mongoose = require('mongoose')

var UserRoleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  role: {
    type: String,
    enum: ['DEV', 'PO'],
    required: true
  }
})

const ProjectSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    users: {
      type: [UserRoleSchema]
    },
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 2500
    },
    repositoryURL: {
      type: String,
      maxlength: 150
    },
    duration: {
      type: Number,
      min: 1,
      max: 1825
    },
    specificationsFilePath: {
      type: String,
      maxlength: 150
    }
  },
  { timestamps: true }
)

ProjectSchema.path('repositoryURL').validate(function(value) {
  // Match URLs that end with ".git"
  const URL_REGEX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})\/?([\w .-]*)*(\.git)$/g
  return value.match(URL_REGEX)
}, 'Given repository URL is not a valid URL.')

export const Project = mongoose.model('Project', ProjectSchema)
