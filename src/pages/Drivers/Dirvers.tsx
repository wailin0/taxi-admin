import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { columns } from "../../components/drivers/column";
import { DataTable } from "../../components/tables/Data-table";
import { GET_ALL_DRIVERS } from "../../graphql/kiloTaxi";
import { PaginationClient } from "../../components/common/Pagination";
import EmployeeModal from "../../components/common/Modal";
import TableFrame from "../../components/common/TableFrame";
import { UserForm } from "../../components/drivers/user-form";
import { useBoolean } from "usehooks-ts";

export const Drivers = () => {
  const { data, loading } = useQuery(GET_ALL_DRIVERS, {
    fetchPolicy: "network-only",
  });

  const memorizedData = useMemo(() => data?.drivers || [], [data]);
  const { value, toggle } = useBoolean(false);

  const [currentTableData, setCurrentTableData] = useState(memorizedData);

  const updateTableData = (paginatedData: any) => {
    setCurrentTableData(paginatedData);
  };

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Drivers"
        modalTrue={() => {
          toggle();
        }}
        isWrite={false}
        subTitle={true}
      />
      <DataTable
        className="with-action-column"
        columns={columns}
        loading={loading}
        data={currentTableData || []}
      />
      <div className="flex items-start mt-[30px]">
        <PaginationClient
          data={memorizedData || []}
          onPageChange={updateTableData}
          itemsPerPage={8} // Set initial data size to 8 items
        />
      </div>
      <EmployeeModal
        title={"Add Driver"}
        modelRatio="w-[100svw] lg:w-[650px]"
        editMode={false}
        open={value}
        toggle={toggle}
        form={<UserForm editMode={false} toggle={toggle} />}
      />
    </div>
  );
};
