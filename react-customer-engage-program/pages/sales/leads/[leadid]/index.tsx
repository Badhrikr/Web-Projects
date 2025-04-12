import SalesLayout from "../../../../layouts/sales-layout";
import LeadTrackerDetailsContainer from "../../../../modules/sales/components/leads/lead-tracker-details-container";

function LeadTrackerPage() {
  return (
    <div className="w-full">
      <LeadTrackerDetailsContainer />
    </div>
  );
}

LeadTrackerPage.PageLayout = SalesLayout;
export default LeadTrackerPage;
