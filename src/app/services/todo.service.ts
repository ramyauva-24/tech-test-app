import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseURL = environment.baseurl;

  constructor(public http: HttpClient) { }

  addToDoList = (data) => {
    return this.http.post(this.baseURL, data);
  }
  getTodoList = () => {
    return this.http.get(this.baseURL);
  }

  editTodoList = (id, data) => {
    return this.http.patch(this.baseURL + "/" + id, data);
  }

  deleteTodo = (id) => {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
