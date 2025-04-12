import React from "react";
import { Context } from "vm";
import SalesLayout from "../../../layouts/sales-layout";
import RepositoryContainer from "../../../modules/sales/components/repository";

function Repository({ pathname }: { pathname: string }) {
  return (
    <div className="max-h-auto font-primary flex flex-col gap-5">
      <RepositoryContainer pathname={pathname} />
    </div>
  );
}

Repository.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    pathname: query.pathname,
  };
};

Repository.PageLayout = SalesLayout;
export default Repository;
