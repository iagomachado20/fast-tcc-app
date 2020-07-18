import { HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

export interface ErrorPayload {
  message: string;
  success: boolean;
  type: string;
}

export interface ErrorRequest {

  error: ErrorPayload,
  headers: HttpHeaders,
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;

}

export interface SuccessRequest extends ErrorPayload {
  
}

export interface PayloadLogin {

  message:string;
  token: string;
  type: string;
  user: User;

}