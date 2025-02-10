import mongoose, {Schema, Document} from "mongoose";

export interface ITodo extends Document {
    _id: mongoose.Types.ObjectId;
    userId : string;
    todo: string;
    selected: boolean;
    createdAt?: Date;
    updatedAt?: Date;
} 


const TodoSchema = new Schema<ITodo>(
    {
    userId: { type: String, ref: "User", required: true },
    todo: {type : String, required: true},
    selected: { type: Boolean, default: false }
    },
    {timestamps: true}
);

export default mongoose.model<ITodo>("Todo", TodoSchema);