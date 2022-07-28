import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  serverURL = "http://localhost:3332/api"
  constructor(private http: HttpClient) {
  }
  getData() {
    return this.http.get(this.serverURL)
  }
  updateUserStatus(id: any) {

    return this.http.put(`${this.serverURL}/update-user-call-status`, {  id: id });
  }

  delData(id: any) {
    return this.http.delete(`${this.serverURL}/delete-Item?id=${id}`, { responseType: 'text' });
  }

  updateData(id: any, userId: any, status: any) {
    return this.http.put(`${this.serverURL}/update-call-status`, { data: { id: id, userId: userId, status: status } });
  }
}

