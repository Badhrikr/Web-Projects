import SalesLayout from "../../../../layouts/sales-layout";
import CustomerTrackerDetailsContainer from "../../../../modules/sales/components/customers/customer-tracker-details-container";

function CustomerTrackerPage() {
  return (
    <div className="w-full">
      <CustomerTrackerDetailsContainer />
    </div>
  );
}

CustomerTrackerPage.PageLayout = SalesLayout;
export default CustomerTrackerPage;
