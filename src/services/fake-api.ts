/*import { matchSorter } from "match-sorter";*/
import * as localForage from "localforage";
import { productCategories } from "./fake-api-data";
/*import { UserDto } from "../model/userDto";*/

export interface ProductCategories {
    categoryId: number;
    name: string;
}

export interface IFakeApi {
    getAllProductCategories: (categoryId: number) => Promise<Array<ProductCategories>>
}

export class FakeApi implements IFakeApi {
    private initialized = false;

    async getAllProductCategories(categoryId: number): Promise<Array<ProductCategories>> {
        if (this.initialized === false) {
            await this.initialize();
        }

        const categories = await localForage.getItem("productCategories") as Array<ProductCategories>;
        return categoryId === -1 ? categories : categories.filter(p => p.categoryId === categoryId);
    } 

    private async initialize() {
        await localForage.setItem("productCategories", productCategories);
        this.initialized = true;
    }
}

//export async function getUsers(query?: string): Promise<UserDto[]> {
//    await fakeNetwork();
//    let users = await localforage.getItem("users") as UserDto[];
//    if (!users) users = [];
//    //if (query) {
//    //    users = matchSorter(users, query, { keys: ["userId", "last"] });
//    //}
//    return users;
//}

//export async function createUser(userDto: UserDto): Promise<UserDto> {
//    await fakeNetwork();
//    let user = { userId: userDto.userId, password: userDto.password, email: userDto.email };
//    let users = await getUsers();
//    users.unshift(user);
//    await set(users);
//    return user;
//}

//export async function getUser(userDto: UserDto): Promise<UserDto | undefined> {
//    await fakeNetwork();
//    let users = await getUsers() as Array<UserDto>;
//    let user = users.filter(user => user.userId === userDto.userId && user.password === userDto.password).shift();
//    return user;
//}

//export async function signInUser(userDto: UserDto): Promise<UserDto | undefined> {
//    await fakeNetwork();
//    let users = await getUsers() as Array<UserDto>;
//    let user = users.filter(user => user.userId === userDto.userId && user.password === userDto.password).shift();
//    if (user) {
//        localforage.setItem("authenticated-user", user);
//    }
//    return user;
//}

//export async function IsAuthenticated() {
//    await fakeNetwork();
//    let authenticatedUser = await localforage.getItem("authenticated-user");
//    return authenticatedUser != null;
//}


//export async function getUser(id) {
//    await fakeNetwork();
//    let users = await localforage.getItem("users");
//    let user = users.find(user => user.userId === id);
//    return user ?? null;
//}



//export async function updateContact(id, updates) {
//    await fakeNetwork();
//    let contacts = await localforage.getItem("contacts");
//    let contact = contacts.find(contact => contact.id === id);
//    if (!contact) throw new Error("No contact found for", id);
//    Object.assign(contact, updates);
//    await set(contacts);
//    return contact;
//}

//export async function deleteContact(id) {
//    let contacts = await localforage.getItem("contacts");
//    let index = contacts.findIndex(contact => contact.id === id);
//    if (index > -1) {
//        contacts.splice(index, 1);
//        await set(contacts);
//        return true;
//    }
//    return false;
//}

//function set(users: UserDto[]) {
//    return localForage.setItem("users", users);
//}

// fake a cache so we don't slow down stuff we've already seen
//let fakeCache = {};

//async function fakeNetwork() {
//    if (!key) {
//        fakeCache = {};
//    }

//    if (fakeCache[key]) {
//        return;
//    }

//    fakeCache[key] = true;
//    return new Promise(res => {
//        setTimeout(res, Math.random() * 800);
//    });
//}