import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para contenido
export interface IContent extends Document {
  creatorId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'photo' | 'video';
  fileUrl: string;
  thumbnailUrl?: string;
  isFree: boolean;
  price?: number;
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de contenido
const ContentSchema = new Schema<IContent>({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  isFree: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    min: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Índices
ContentSchema.index({ creatorId: 1, createdAt: -1 });
ContentSchema.index({ tags: 1 });
ContentSchema.index({ isFree: 1 });

export const Content = mongoose.model<IContent>('Content', ContentSchema);
