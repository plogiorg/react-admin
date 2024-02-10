import { useGetUsers, UserType } from "../../api";
import {  useState } from "react";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";
import Input from "@mui/joy/Input";
import { Tag } from "primereact/tag";


const Users = () => {
  const {data:users, isLoading} = useGetUsers();
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    active: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const getType = (type: string) => {
    switch (type) {
      case UserType.USER:
        return "danger";

      case UserType.ADMIN:
        return "success";

      case UserType.PROVIDER:
        return "warning";

      default:
        return "info";
    }
  };

  const typeBodyTemplate = (rowData: any) => {
    return <Tag value={rowData.type} severity={getType(rowData.type)} />;
  };
  const verifiedBodyTemplate = (rowData: any) => {
    return <i className={classNames("pi", {
      "true-icon pi-check-circle": rowData.active,
      "false-icon pi-times-circle": !rowData.active,
    })}></i>;
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <Input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
      </div>
    );
  };

  const verifiedRowFilterTemplate = (options: any) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  const header = renderHeader();


  return (
    <div className="py-2">
      <Container>
        <Typography variant="solid" alignContent="center" gutterBottom>
          Users
        </Typography>
        <div className={"card"}>
          <DataTable value={users?.users} paginator rows={10} dataKey="name" filters={filters} filterDisplay="row"
                     loading={isLoading}
                     header={header}
                     selectionMode="single"
                     globalFilterFields={["email", "description"]}
                     emptyMessage="No users found.">
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
            <Column field="type" header="Type" filter filterPlaceholder="Search by type" style={{ minWidth: "12rem" }} body={typeBodyTemplate} />
            <Column field="email" header="Email" filter filterPlaceholder="Search by email"
                    style={{ minWidth: "12rem" }} />
            <Column field="country" header="Country" filter style={{ minWidth: "12rem" }} />
            <Column field="active" header="Active" dataType="boolean" style={{ minWidth: "6rem" }}
                    body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
          </DataTable>
        </div>
      </Container>
    </div>
  );
};

export default Users;
