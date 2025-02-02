import mongoose, {Schema, Document} from "mongoose";

export interface ITodo extends Document {
    userId : string,
    todo: string,
    selected: boolean
} 


const TodoSchema = new Schema<ITodo>({
    userId: { type: String, ref: "User", required: true },
    todo: {type : String, required: true},
    selected: { type: Boolean, default: false }
});

export default mongoose.model<ITodo>("Todo", TodoSchema);