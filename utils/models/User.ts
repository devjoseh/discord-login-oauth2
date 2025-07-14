import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    discordId: string;
    username: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

const UserSchema: Schema<IUser> = new Schema({
    discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Number, required: true },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;