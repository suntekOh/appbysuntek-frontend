import React from 'react';

export interface AuthInfoFromLocalDto {
    userName: string,
    expiryTime: number
}

export interface IAuthInfoFromLocalService {
    set: (userName: string) => void;
    getDestination: () => string;
    getAuthenticatedUserNameFromLocal: () => string | null;
    clear: () => void;
}

export class AuthInfoFromLocalService implements IAuthInfoFromLocalService {
    private readonly user_name_tag = "auth-user-name";
    private readonly time_to_expire_tag = "auth-time-to-expire";

    set(userName: string) {
        let now = new Date();
        let timeToExpire = now.setMinutes(now.getMinutes() + 30) / 1000

        localStorage.setItem(this.user_name_tag, userName);
        localStorage.setItem(this.time_to_expire_tag, timeToExpire.toString());
    }

    clear() {
        localStorage.removeItem(this.user_name_tag);
        localStorage.removeItem(this.time_to_expire_tag);

    }

    getDestination() {
        return this.isAuthValid() ? "/root" : "/";
    }

    getAuthenticatedUserNameFromLocal() {
        return this.isAuthValid() ? this.get()?.userName ?? "" : null;
    }

    private get() {
        let userName = localStorage.getItem(this.user_name_tag);
        let timeToExpire = localStorage.getItem(this.time_to_expire_tag);

        if (!userName) {
            return null;
        } else {
            return {
                userName: userName,
                expiryTime: Number(timeToExpire)
            };
        }

    }

    private isAuthValid() {
        const auth_info = this.get();
        let valid = false;
        if (auth_info != null) {
            const now = new Date();
            const time_number_in_millisec = now.setMinutes(now.getMinutes()) / 1000;
            if (time_number_in_millisec <= auth_info.expiryTime) {
                valid = true;
            }
        }

        return valid;
    }

}
