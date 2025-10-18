// import React from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// // import { updateProjectPaymentStatus } from "../../features/projects/projectsSlice";

// const FinanceProjectTable = ({ projects }) => {
//   const dispatch = useDispatch();

//   const handleStatusChange = (id, newStatus) => {
//     dispatch(updateProjectPaymentStatus({ id, paymentStatus: newStatus }))
//       .unwrap()
//       .then(() => toast.success("Payment status updated"))
//       .catch(() => toast.error("Failed to update status"));
//   };

//   return (
//     <table
//       style={{
//         width: "100%",
//         backgroundColor: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         borderCollapse: "collapse",
//         overflow: "hidden",
//       }}
//     >
//       <thead style={{ backgroundColor: "#2196F3", color: "white" }}>
//         <tr>
//           <th style={thStyle}>Project Name</th>
//           <th style={thStyle}>Client</th>
//           <th style={thStyle}>Budget</th>
//           <th style={thStyle}>Expenses</th>
//           <th style={thStyle}>Remaining</th>
//           <th style={thStyle}>Payment Status</th>
//           <th style={thStyle}>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {projects && projects.length > 0 ? (
//           projects.map((proj) => (
//             <tr key={proj.id}>
//               <td style={tdStyle}>{proj.name}</td>
//               <td style={tdStyle}>{proj.clientName}</td>
//               <td style={tdStyle}>₹{proj.budget}</td>
//               <td style={tdStyle}>₹{proj.expenses || 0}</td>
//               <td style={tdStyle}>₹{(proj.budget || 0) - (proj.expenses || 0)}</td>
//               <td style={tdStyle}>{proj.paymentStatus || "Pending"}</td>
//               <td style={tdStyle}>
//                 <button
//                   style={{
//                     ...btnStyle,
//                     backgroundColor: "#4CAF50",
//                     marginRight: "10px",
//                   }}
//                   onClick={() => handleStatusChange(proj.id, "Completed")}
//                 >
//                   Mark Paid
//                 </button>
//                 <button
//                   style={{ ...btnStyle, backgroundColor: "#f44336" }}
//                   onClick={() => handleStatusChange(proj.id, "Pending")}
//                 >
//                   Mark Pending
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
//               No projects found.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// const thStyle = {
//   padding: "12px",
//   textAlign: "left",
//   fontWeight: "bold",
//   borderBottom: "2px solid #ddd",
// };

// const tdStyle = {
//   padding: "12px",
//   borderBottom: "1px solid #eee",
// };

// const btnStyle = {
//   border: "none",
//   color: "white",
//   padding: "6px 12px",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default FinanceProjectTable;
