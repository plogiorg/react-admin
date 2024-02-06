import { useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Dropdown } from "primereact/dropdown";
import { useGetServices } from "../../api";
import { PlusIcon } from "primereact/icons/plus";

export const ServiceComponent = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const {data, isLoading} = useGetServices()
  const [newServiceName, setNewServiceName] = useState('');


  const handleAddService = () => {
    // const newService = {
    //   id: services?.length + 1,
    //   name: newServiceName
    // };
    // setServices([...services, newService]);
    setNewServiceName('');
  };

  const verifiedBodyTemplate = (rowData: any) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
  };


  const countryBodyTemplate = (rowData:any) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
        <span>{rowData.country.name}</span>
      </div>
    );
  };


  const getSeverity = (status:string) => {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }

  const verifiedRowFilterTemplate = (options:any) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  const statusItemTemplate = (option:any) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  const statusBodyTemplate = (rowData: any) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };
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

  const onGlobalFilterChange = (e:any) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <Input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
      </div>
    );
  };


  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
  };

  const header = renderHeader();

  return (
    <Container>
      <Typography variant="solid" alignContent="center" gutterBottom>
        Services
      </Typography>
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid  md margin={1}>
          <Input
            fullWidth
            size="sm"
            startDecorator={<PlusIcon />}
            placeholder="Service Name"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
        </Grid>
        <Grid xs>
          <Button variant="solid" color="primary" onClick={handleAddService}>Add Service</Button>
        </Grid>
      </Grid>
      <div className={"card"}>
        <DataTable value={data?.services} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={isLoading}
                   globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
          <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
          <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
          <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
          <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
        </DataTable>
      </div>
    </Container>
  );
};
