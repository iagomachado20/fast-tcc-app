import * as axios from 'axios';
import api from '../config/enviroments/enviroments';
import { UserAccess } from '../models/auth.model';

export class AuthService {

    public submitedLogin(credentials: UserAccess) {
        return axios.post('/login', crendentials);
    }

}