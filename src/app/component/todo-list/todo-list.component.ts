import { Component, Input, OnInit } from '@angular/core';
import { constant } from 'src/app/models/constant';
import { defaultEditItem, Item } from 'src/app/models/todomodel';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input()
  reload;
  todoList = [];
  displayStyle: "none" | "block" = "none";
  defaultEditItem = defaultEditItem;
  editItem = defaultEditItem;
  filterList = constant.filterList;
  filter = this.filterList[0];
  categoryList = constant.categoryList;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getAllList();
  }

  get filteredList() {
    if (this.filter === 'all') {
      return this.todoList;
    }
    return this.todoList.filter((item) => this.filter === 'done' ? item.done :
      this.filter === 'active' ? !item.done : this.filter === item.category);
  }

  openPopup(item: Item) {
    this.editItem = item
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  submitForm(item: Item) {
    item.id === null ? this.addTodo(item) : this.editTodo(item)
  }

  addTodo(item: Item) {
    this.todoService.addToDoList(item).subscribe((res) => {
      this.getAllList();
      this.closePopup()
    })
  }
  editTodo(item: Item) {
    this.todoService.editTodoList(item.id, item).subscribe((response) => {
      let itemIndex = this.todoList.findIndex(ind => ind.id == item.id);
      this.todoList[itemIndex] = item;
      this.closePopup()
    })
  }
  deleteTodoItem(item: Item, index: any) {
    this.todoService.deleteTodo(item.id).subscribe((response) => {
      this.todoList.splice(index, 1)
    })
  }
  ChangeSelection(e) {
    this.filter = e.target.value;
  }



  getAllList() {
    this.todoService.getTodoList().subscribe((response: []) => {
      this.todoList = response;
      this.filter = 'all'
    })
  }

  MarkTodo(e, item: Item) {
    if (e.target.checked) {
      item.done = true;
    } else {
      item.done = false;
    }
    this.editTodo(item)
  }
}
