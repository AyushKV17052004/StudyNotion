import Dashboard from "./Dashboard";
import TopBar from "../../Core/Home/TopBar";
import NavBar from "../../Core/Home/NavBar";
import Student_PurchaseHistory from "./Student_PurchaseHistory";

function Student_PurchaseHistoryPage() {
  return (
    <div className="w-full bg-[rgb(3,1,29)]">
      <div className="w-full flex justify-center items-center">
        <NavBar />
      </div>
      <TopBar />
      <div className="min-h-screen pt-12 w-full flex flex-row z-10">
        <div className="md:w-[250px] w-1/4">
          <Dashboard />
        </div>
        <div className="flex-1 py-6">
          <Student_PurchaseHistory />
        </div>
      </div>
    </div>
  );
}

export default Student_PurchaseHistoryPage;
