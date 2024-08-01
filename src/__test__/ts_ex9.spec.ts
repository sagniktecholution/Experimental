import {
  getTaskById,
  listTasks,
  Task,
  tasks,
  TaskStatus,
  updateTask,
} from '../utils/ts_ex9'; // Assuming the code is in tasks.ts

describe('Task Management', () => {
  it('should list all tasks', () => {
    expect(listTasks()).toEqual(tasks);
  });
  it('should get a task by ID', () => {
    expect(getTaskById(1)).toEqual(tasks[0]);
  });
  it('should update a task by ID', () => {
    const updatedTask: Task = {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      status: TaskStatus.Completed,
    };
    expect(updateTask(1, { status: TaskStatus.Completed })).toEqual(
      updatedTask,
    );
  });
  it('should return undefined for non-existent task', () => {
    expect(getTaskById(999)).toBeUndefined();
  });
  it('should return undefined when updating non-existent task', () => {
    expect(updateTask(999, { status: TaskStatus.Completed })).toBeUndefined();
  });
});
