// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Fetch all employees
// export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
//   const response = await axios.get("http://localhost:5000/employees");
//   return response.data;
// });

// // ✅ Add new employee
// export const addEmployee = createAsyncThunk("employees/add", async (employee) => {
//   const response = await axios.post("http://localhost:5000/employees", employee);
//   return response.data;
// });

// // ✅ Update employee (for example: updating leave data)
// export const updateEmployee = createAsyncThunk("employees/update", async (employee) => {
//   const response = await axios.put(`http://localhost:5000/employees/${employee.id}`, employee);
//   return response.data;
// });

// const employeesSlice = createSlice({
//   name: "employees",
//   initialState: {
//     list: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ Fetch employees
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.list = action.payload;
//         state.status = "succeeded";
//       })

//       // ✅ Add employee
//       .addCase(addEmployee.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // ✅ Update employee
//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         const index = state.list.findIndex((emp) => emp.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       });
//   },
// });

// // export default employeesSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Fetch all employees
// export const fetchEmployees = createAsyncThunk(
//   "employees/fetchEmployees",
//   async () => {
//     const response = await axios.get("http://localhost:5000/employees");
//     return response.data;
//   }
// );

// // ✅ Add a new employee
// export const addEmployee = createAsyncThunk(
//   "employees/addEmployee",
//   async (employee) => {
//     const response = await axios.post("http://localhost:5000/employees", employee);
//     return response.data;
//   }
// );

// // ✅ Update an employee (general purpose)
// export const updateEmployee = createAsyncThunk(
//   "employees/updateEmployee",
//   async (employee) => {
//     const response = await axios.put(
//       `http://localhost:5000/employees/${employee.id}`,
//       employee
//     );
//     return response.data;
//   }
// );

// // ✅ Update leave balance specifically (used by HR)
// export const updateLeaveBalance = createAsyncThunk(
//   "employees/updateLeaveBalance",
//   async ({ id, leavesTaken, leavesPending }) => {
//     // Get the current employee data
//     const current = await axios.get(`http://localhost:5000/employees/${id}`);

//     // Merge updated leave info
//     const updatedEmployee = {
//       ...current.data,
//       leavesTaken,
//       leavesPending,
//     };

//     // Save it back to the JSON server
//     const response = await axios.put(
//       `http://localhost:5000/employees/${id}`,
//       updatedEmployee
//     );
//     return response.data;
//   }
// );

// // ✅ Initial State
// const initialState = {
//   list: [],
//   status: "idle",
//   error: null,
// };

// // ✅ Slice Definition
// const employeesSlice = createSlice({
//   name: "employees",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch employees
//       .addCase(fetchEmployees.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.list = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//       // Add employee
//       .addCase(addEmployee.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // Update employee
//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         const index = state.list.findIndex((emp) => emp.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })

//       // Update leave balance
//       .addCase(updateLeaveBalance.fulfilled, (state, action) => {
//         const index = state.list.findIndex((emp) => emp.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       });
//   },
// });

// export default employeesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async () => {
    const response = await axios.get("http://localhost:5000/employees");
    return response.data;
  }
);

// Add a new employee
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee) => {
    const response = await axios.post("http://localhost:5000/employees", employee);
    return response.data;
  }
);

// Update leave balance for an employee
export const updateEmployeeLeave = createAsyncThunk(
  "employees/updateLeave",
  async ({ id, leavesTaken, leavesPending }) => {
    const response = await axios.patch(`http://localhost:5000/employees/${id}`, {
      leavesTaken,
      leavesPending,
    });
    return response.data;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // Update Leave
      .addCase(updateEmployeeLeave.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) state.employees[index] = action.payload;
      });
  },
});

export default employeesSlice.reducer;
// export {  fetchEmployees, updateEmployeeLeave };
// npx json-server --watch db.json --port 5000
// npx json-server --watch data/projects.json --port 5002
// npx json-server --watch data/clients.json --port 5001