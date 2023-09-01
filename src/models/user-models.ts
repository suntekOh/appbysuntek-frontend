import { AppBarMenu, VisibleCondition } from "./enums";

export interface UserDto {
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface AuthenticatedUser {
    userName: string,
}

export interface AppBarMenuItem {
    key: number;
    name: string;
    path: string;
    visibleCondition: VisibleCondition;
    menu: AppBarMenu;
  }
   