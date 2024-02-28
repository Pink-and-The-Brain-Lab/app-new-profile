import { Theme } from "millez-web-components/dist/components";

export interface IProfile {
    email: string;
    phoneNumber: string;
    phoneNumberValidated: boolean;
    image: string;
    color: string;
    userName: string;
    profileName: string;
    profileType: string;
    profilePolicy: string;
    theme: Theme;
}
