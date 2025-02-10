import mongoose, {Schema, Document} from "mongoose";

export interface IRequestCounter extends Document{
    userId: string;
    counts: {
        GET: number;
        POST: number;
        PUT: number;
        DELETE: number;
    };
}

const requestCounterSchema: Schema = new Schema({
    userId: { type: String, required: true, unique: true },
    counts: {
      GET: { type: Number, default: 0 },
      POST: { type: Number, default: 0 },
      PUT: { type: Number, default: 0 },
      DELETE: { type: Number, default: 0 }
    }
  });
  

  const RequestCounter = mongoose.model<IRequestCounter>("RequestCounter", requestCounterSchema);
  
  export default RequestCounter;