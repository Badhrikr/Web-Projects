import { Context } from "vm";
import SalesLayout from "../../../layouts/sales-layout";
import CustomersContainer from "../../../modules/sales/components/customers/customers-container";
import { CustomersFilterProps } from "../../../modules/sales/model";

function CustomersPage({ query }: { query: CustomersFilterProps }) {
  return (
    <div className="max-h-auto font-primary flex flex-col gap-5">
      <CustomersContainer query={query} />
    </div>
  );
}

CustomersPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return { query };
};

CustomersPage.PageLayout = SalesLayout;
export default CustomersPage;
