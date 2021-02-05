import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserQuest = new Schema(
  {
    accountId: { type: String, ref: 'Account', required: true },
    questId: { type: String, ref: 'Quest', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default UserQuest
