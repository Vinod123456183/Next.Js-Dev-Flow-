import { Schema, model, models, Types, HydratedDocument } from 'mongoose'

export interface IAccount {
  userId: Types.ObjectId
  name: string
  image?: string
  password?: string
  provider: string
  providerAccountId: string
  createdAt?: Date
  updatedAt?: Date
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      select: false,
    },

    provider: {
      type: String,
      //   enum: ['google', 'facebook', 'github', 'credentials'],
      required: true,
    },

    providerAccountId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// AccountSchema.index(
//   { provider: 1, providerAccountId: 1 },
//   { unique: true }
// )

// AccountSchema.index({ userId: 1, provider: 1 }, { unique: true })

const Account = models.Account || model<IAccount>('Account', AccountSchema)

export default Account
