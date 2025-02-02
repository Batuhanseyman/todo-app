import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    userid: string
}

const UserSchema = new Schema<IUser>({
    userid: {type: String, required: true, unique: true}
});

export default mongoose.model<IUser>("User", UserSchema);

