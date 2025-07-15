import { ExpenseProvider } from "../../Context/ExpenseContext";
import ProfitGraph from "../../ExpenseTrackerComp/ProfitGraph";

const Report = () => {
  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <ExpenseProvider>
        <ProfitGraph />
      </ExpenseProvider>
    </div>
  );
};

export default Report;
