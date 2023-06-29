import { Schema, model } from 'mongoose';

const BugSchema = new Schema(
   {
      id: {
         type: Number,
         required: true
      },
      project: {
         type: Schema.Types.ObjectId,
         ref: 'Project',
         required: true
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      description: {
         type: String,
         maxlength: 100,
         required: true
      },
      creationDate: {
         type: Date,
         default: Date.now,
         required: true
      }
   }
);

export default model('Bug', BugSchema);
