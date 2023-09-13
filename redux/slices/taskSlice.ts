import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskType } from "../../common.type";

interface AppState {
  tasks: taskType;
  completedTask: taskType;
  tasksId: string[];
}

const initialState: AppState = {
  tasks: [],
  completedTask: [],
  tasksId: [],
};

const taskSlice = createSlice({
  name: "tasksReducer",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<taskType>) => {
      const newTask = action.payload;
      state.tasks.unshift(...newTask);
    },
    toggleTaskCompletion: (state, action) => {
      const { taskId } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      const completedTaskIndex = state.completedTask.findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        const toggledTask = state.tasks[taskIndex];
        state.tasks.splice(taskIndex, 1);
        state.completedTask.unshift(toggledTask);
        state.tasksId.unshift(toggledTask.id);
      } else if (completedTaskIndex !== -1) {
        const toggledTask = state.completedTask[completedTaskIndex];
        state.completedTask.splice(completedTaskIndex, 1);
        state.tasks.unshift(toggledTask);
        state.tasksId = state.tasksId.filter((id) => id !== toggledTask.id);
      }
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(
        (item) => item.id === updatedTask.id
      );
      const completedTaskIndex = state.completedTask.findIndex(
        (item) => item.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      } else if (completedTaskIndex !== -1) {
        state.completedTask[completedTaskIndex] = updatedTask;
      }
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter((item) => item.id !== taskId);
      state.completedTask = state.completedTask.filter(
        (item) => item.id !== taskId
      );
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
