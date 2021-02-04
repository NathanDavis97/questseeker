import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Objective = new Schema(
  {
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    questId: { type: String, required: true },
    body: { type: String, required: true },
    points: { type: Number },
    hints: { type: String },
    title: { type: String, required: true },
    creatorId: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Objective.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Objective
