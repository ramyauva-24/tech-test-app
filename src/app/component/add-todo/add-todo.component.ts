import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { constant } from 'src/app/models/constant';
import { defaultEditItem } from 'src/app/models/todomodel';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Input()
  inputData = defaultEditItem;
  @Output()
  sendData = new EventEmitter();
  categoryList = constant.categoryList
  todoForm;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm () {
    this.todoForm = this.formBuilder.group({
      id: [this.inputData.id ],
      label: [this.inputData.label, [Validators.required]],
      description: [this.inputData.description],
      category: [this.inputData.category, [Validators.required]],
      done: [false]
    });
  }
  get todoFormControl() {
    return this.todoForm.controls;
  }

  resetForm() {
    this.todoForm = {}
  }
  onSubmit() {
    this.sendData.emit(this.todoForm.value);
    this.resetForm();
  }
}
