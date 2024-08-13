export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
}
export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
type TaskUpdate = Partial<Omit<Task, 'id'>>;
export const tasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    status: TaskStatus.Pending,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    status: TaskStatus.InProgress,
  },
];
export const getTaskById = (id: number): Task | undefined => {
  return tasks.find((task) => task.id === id);
};
export const updateTask = (
  id: number,
  updates: TaskUpdate,
): Task | undefined => {
  const task = getTaskById(id);
  if (task) {
    Object.assign(task, updates);
    return task;
  }
  return undefined;
};
export const addTask = (newTask: Omit<Task, 'id'>): Task => {
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const task: Task = { id, ...newTask };
  tasks.push(task);
  return task;
};
export const listTasks = (status?: TaskStatus): Task[] => {
  return status ? tasks.filter((task) => task.status === status) : tasks;
};
// Testing the functions
console.log('All Tasks:', listTasks());
console.log('Pending Tasks:', listTasks(TaskStatus.Pending));
console.log('Get Task by ID (1):', getTaskById(1));
const updatedTask = updateTask(1, { status: TaskStatus.Completed });
console.log('Updated Task (1):', updatedTask);
const newTask = addTask({
  title: 'Task 3',
  description: 'Description for Task 3',
  status: TaskStatus.Pending,
});
console.log('Added Task:', newTask);
console.log('All Tasks after addition:', listTasks());
