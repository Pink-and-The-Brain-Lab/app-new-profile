import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { IProfile } from "../models/profile.interface";
import { UpdateProfileAction } from '../actions/update-profile.action';
import { Theme } from 'millez-web-components/dist/components';

const STATE_TOKEN = new StateToken<IProfile>('profile');

@State<IProfile>({
    name: STATE_TOKEN,
    defaults: {
        email: '',
        phoneNumber: '',
        phoneNumberValidated: false,
        image: '',
        color: '',
        userName: '',
        profileName: '',
        profileType: '',
        profilePolicy: '',
        theme: Theme.DARK,
    }
})
@Injectable()
export class ProfileState {

    constructor () {}

    @Action(UpdateProfileAction)
    updateProfile(ctx: StateContext<IProfile>, action: UpdateProfileAction): void {
        ctx.setState({
            ...action.profile
        });
    }

    @Selector()
    static profile(state: IProfile): IProfile {
        return state;
    }
}