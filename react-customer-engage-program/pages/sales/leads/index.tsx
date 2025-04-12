import { Context } from "vm";
import SalesLayout from "../../../layouts/sales-layout";
import LeadsContainer from "../../../modules/sales/components/leads/leads-container";
import { LeadsFilterProps } from "../../../modules/sales/model";

function LeadsPage({ query }: { query: LeadsFilterProps }) {
  return (
    <div className="max-h-auto font-primary flex flex-col gap-5">
      <div>
        <LeadsContainer query={query} />
      </div>
    </div>
  );
}

LeadsPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return { query };
};

LeadsPage.PageLayout = SalesLayout;
export default LeadsPage;
