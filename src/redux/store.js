import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import clientsReducer from '../features/clients/clientsSlice';
import employeesReducer from '../features/employees/employeesSlice';
import leavesReducer from '../features/Leaves/LeavesSlice';
import allocationsReducer from "../features/allocation/allocationsSlice";
 
export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    clients: clientsReducer,
    employees: employeesReducer,
    leaves: leavesReducer,
    allocations: allocationsReducer,
  },
});