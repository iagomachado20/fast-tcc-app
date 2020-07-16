import { HttpHeaders } from '@angular/common/http';

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