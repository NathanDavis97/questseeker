import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const UserQuest = new Schema(
  {
    AccountId: { type: ObjectId, ref: 'Account', required: true },
    questId: { type: ObjectId, ref: 'Quest', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default UserQuest
