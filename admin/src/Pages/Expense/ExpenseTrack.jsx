// import { ExpenseProvider } from "../../Context/ExpenseContext";
// import AddTransaction from "../../ExpenseTrackerComp/AddTransaction";
// import Balance from "../../ExpenseTrackerComp/Balance";
// import IncomeExpenses from "../../ExpenseTrackerComp/IncomeExpenses";
// import ProfitGraph from "../../ExpenseTrackerComp/ProfitGraph";

// export default function ExpenseTrack() {
//   return (
//     <ExpenseProvider>
//       <div className="container mx-auto p-6">
//         <Balance />
//         <IncomeExpenses />
//         <AddTransaction />
//         <ProfitGraph />
//       </div>
//     </ExpenseProvider>
//   );
// }

import { ExpenseProvider } from "../../Context/ExpenseContext";
import AddTransaction from "../../ExpenseTrackerComp/AddTransaction";
import Balance from "../../ExpenseTrackerComp/Balance";
import IncomeExpenses from "../../ExpenseTrackerComp/IncomeExpenses";

export default function ExpenseTrack() {
  return (
    <ExpenseProvider>
      <div
        className="min-h-screen p-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')", // Add background image
        }}
      >
        <div className="max-w-6xl mx-auto p-6 rounded-lg">
          <Balance />
          <IncomeExpenses />
          <AddTransaction />
        </div>
      </div>
    </ExpenseProvider>
  );
}
