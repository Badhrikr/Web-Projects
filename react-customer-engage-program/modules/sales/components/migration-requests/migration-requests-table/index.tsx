import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { chevron_right, user_circle } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import { MigrationRequestsTableProps } from "./model";

function MigrationRequestsTable({
  migrationRequests,
}: MigrationRequestsTableProps) {
  const router = useRouter();

  return (
    <table className="w-full" cellPadding={15}>
      <thead className="text-left text-sm h-[50px]">
        <tr>
          <th className="font-medium text-theme-secondary-600">Organization</th>
          <th className="font-medium text-theme-secondary-600">Engagement</th>
          <th className="font-medium text-theme-secondary-600">
            Source Technology
          </th>
          <th className="font-medium text-theme-secondary-600">
            Target Technology
          </th>
          <th className="font-medium text-theme-secondary-600">Status</th>
          <th className="font-medium text-theme-secondary-600">Sales SPOC</th>
          <th className="font-medium text-theme-secondary-600">
            PreSales SPOC
          </th>
        </tr>
      </thead>

      <tbody>
        {migrationRequests.map(
          (
            {
              id,
              sourceTech,
              targetTech,
              personalInfo,
              engagement,
              salesPerson,
              preSalesPerson,
              status,
              address,
              organisationLogo,
            },
            i
          ) => (
            <tr
              className={`text-theme-secondary text-base ${
                i % 2 === 0 ? "bg-theme-zebra-table" : ""
              }`}
            >
              <td>
                <div className="text-left flex gap-4 items-center">
                  {organisationLogo ? (
                    <Image
                      src={organisationLogo ?? ""}
                      alt="logo"
                      fill
                      priority
                    />
                  ) : (
                    <Icon
                      icon={user_circle}
                      size="xl"
                      theme="secondary"
                      iconType="solid"
                    />
                  )}

                  <div className="">
                    <h4 className="font-medium">
                      {personalInfo?.organisationName}
                    </h4>
                    <h4 className="text-xs">
                      {address?.state},&nbsp;{address?.country}
                    </h4>
                  </div>
                </div>
              </td>
              <td>{engagement}</td>
              <td className="text-sm">
                {Object.keys(sourceTech ?? {})
                  .map(
                    (tech) =>
                      sourceTech?.[tech as keyof typeof sourceTech]?.trim() +
                        "/" ?? ""
                  )
                  .join("")}
              </td>
              <td className="text-sm">
                {Object.keys(targetTech ?? {})
                  .map(
                    (tech) =>
                      targetTech?.[tech as keyof typeof targetTech]?.trim() +
                        "/" ?? ""
                  )
                  .join("")}
              </td>
              <td>
                <div className="flex gap-1 items-center">
                  <span className="px-2 py-1 rounded-full bg-[rgba(69,142,255,0.15)] text-[rgba(69,142,255,1)] font-semibold text-sm lowercase first-letter:capitalize inline-block">
                    {status}
                  </span>
                </div>
              </td>
              <td>{salesPerson}</td>
              <td>{preSalesPerson}</td>
              <td>
                <IconButton
                  onClick={() =>
                    // TOCHANGE
                    router.push({
                      pathname:
                        "/customer/[customerid]/workspace/migration-requests/[migrationrequestid]/workspace/files",
                      query: {
                        customerid: router.query.customerid,
                        migrationrequestid: id,
                      },
                    })
                  }
                  size="sm"
                  theme="secondary"
                  buttonThemeStyle="ghost"
                >
                  <Icon size="sm" theme="secondary" icon={chevron_right} />
                </IconButton>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default MigrationRequestsTable;
