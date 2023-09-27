import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nest/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable({})
export class AuthService {
    signup() {
        return {msg: 'sign up is working well'}
    }

    signin() {
        return {msg: 'sign in is running perfectly'}
    }
}