import { classEvent } from "../util/classEvent";
import { Firebase } from './../util/fireBase'

export class User extends classEvent{

    //ref para manipulação de usuarios
    static getRef(){

        return Firebase.db().collection('/users')
    }

    static findByEmail(email){

        return User.getRef().doc(email)

    }

}