import { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { classNames } from "primereact/utils";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { ServiceType, useGetServices } from "../../api";
import { PlusIcon } from "primereact/icons/plus";
import CreateServiceTypeModal from "./services.action.tsx";

export const ServiceComponent = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  // const [statuses] = useState(["unqualified", "qualified", "new", "negotiation", "renewal"]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { data, isLoading } = useGetServices();
  const [serviceType, setServiceType] = useState<ServiceType | undefined>();
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };


  console.log({ data });
  const verifiedBodyTemplate = (rowData: any) => {
    return <i className={classNames("pi", {
      "true-icon pi-check-circle": rowData.isActive,
      "false-icon pi-times-circle": !rowData.isActive,
    })}></i>;
  };


  // const countryBodyTemplate = (rowData: any) => {
  //   return (
  //     <div className="flex align-items-center gap-2">
  //       <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
  //            className={`flag flag-${rowData.country.code}`} style={{ width: "24px" }} />
  //       <span>{rowData.country.name}</span>
  //     </div>
  //   );
  // };



  const verifiedRowFilterTemplate = (options: any) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  // const statusItemTemplate = (option: any) => {
  //   return <Tag value={option} severity={getSeverity(option)} />;
  // };
  // const statusBodyTemplate = (rowData: any) => {
  //   return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  // };
  // const handleDeleteService = (id:number) => {
  //   const updatedServices = services.filter(service => service.id !== id);
  //   setServices(updatedServices);
  // };

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 100 },
  //   { field: 'name', headerName: 'Name', width: 250 },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     width: 150,
  //     renderCell: (params:any) => (
  //       <strong>
  //         <Button variant="outlined" color="primary" onClick={() => handleDeleteService(params.row.id)}>Delete</Button>
  //       </strong>
  //     ),
  //   },
  // ];

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
        <div>
          <Button variant="solid" color="primary" startDecorator={<PlusIcon />} onClick={handleToggleModal}>Add Type</Button>
        </div>
      </div>
    );
  };


  // const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  //   return (
  //     <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)}
  //               itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear
  //               style={{ minWidth: "12rem" }} />
  //   );
  // };

  const header = renderHeader();

  const onRowClick = (item: any) => {
    setServiceType(item.value);
    handleToggleModal();
  };

  return (
    <Container>
      <Typography variant="solid" alignContent="center" gutterBottom>
        Services
      </Typography>
      <div className={"card"}>
        <DataTable value={data?.types} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row"
                   loading={isLoading}
                   selectionMode="single" onSelectionChange={onRowClick}
                   globalFilterFields={["title", "description"]} header={header}
                   emptyMessage="No types found.">
          <Column field="title" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
          <Column field="description" header="Description" filter filterPlaceholder="Search by description"
                  style={{ minWidth: "12rem" }} />
          <Column field="createdAt" header="Created At" filter style={{ minWidth: "12rem" }}
                  body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
          {/*<Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate}*/}
          {/*        filter filterPlaceholder="Search by country" />*/}
          <Column field="isActive" header="Active" dataType="boolean" style={{ minWidth: "6rem" }}
                  body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
        </DataTable>
      </div>

      <div>
        <CreateServiceTypeModal serviceType={serviceType} visible={showModal} onHide={handleToggleModal} />
      </div>
    </Container>
  );
};
