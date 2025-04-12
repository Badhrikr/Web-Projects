import SalesLayout from "../../../layouts/sales-layout";
import CalendarContainer from "../../../modules/sales/components/calendar";

function CustomersPage() {
  return (
    <div className="max-h-auto font-primary flex flex-col gap-5">
      <CalendarContainer />
    </div>
  );
}

CustomersPage.PageLayout = SalesLayout;
export default CustomersPage;
