import { Schema, model, models, Types, HydratedDocument } from 'mongoose'

export interface IInteraction {
  user: Types.ObjectId
  action: string
  actionId: Types.ObjectId
  actionType: 'question' | 'answer'
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true }, //question , //answer , user id
    actionType: { type: String, enum: ['question', 'answer'], required: true },
  },

  {
    timestamps: true,
  }
)

// InteractionSchema.index(
//   { provider: 1, providerAccountId: 1 },
//   { unique: true }
// )

// InteractionSchema.index({ userId: 1, provider: 1 }, { unique: true })

const Interaction =
  models.Interaction || model<IInteraction>('Interaction', InteractionSchema)

export default Interaction
