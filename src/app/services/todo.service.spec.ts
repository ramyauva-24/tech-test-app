import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TodoService]
    });
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
  it('should have addToDoList function', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service.addToDoList).toBeTruthy();
   });

});
