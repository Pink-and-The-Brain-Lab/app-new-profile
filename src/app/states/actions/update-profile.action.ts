import { IProfile } from "../models/profile.interface";

export class UpdateProfileAction {
    static readonly type = '[Profile] UpdateProfile';
    constructor (public profile: IProfile) {}
}