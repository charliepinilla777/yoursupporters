import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para suscripción
export interface ISubscription extends Document {
  fanId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de suscripción
const SubscriptionSchema = new Schema<ISubscription>({
  fanId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Índices únicos para evitar duplicados
SubscriptionSchema.index({ fanId: 1, creatorId: 1 }, { unique: true });
SubscriptionSchema.index({ status: 1 });
SubscriptionSchema.index({ creatorId: 1 });

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
