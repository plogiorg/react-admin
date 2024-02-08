import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import CreateServiceTypeForm from './services.create.tsx';
import Button from "@mui/joy/Button";
import { ServiceType, useCreateServiceType, useUpdateServiceType } from "../../api";

interface Props {
  visible: boolean;
  onHide: () => void;
  serviceType?:ServiceType
}

const CreateServiceTypeModal: React.FC<Props> = ({ visible, onHide, serviceType }) => {
  const [submitted, setSubmitted] = useState(false);
  const {mutateAsync:create, isLoading:isCreating} = useCreateServiceType()
  const {mutateAsync:update, isLoading:isUpdating} = useUpdateServiceType()

  const handleSubmit = async (values: ServiceType) => {
    console.log('Submitted values:', values);
    setSubmitted(true);
    try {
      if(serviceType?.id){
        await update(values)
      }else {
        await create(values)
      }
    } catch (e) {
      console.error({ e });
    }
  };

  const handleHide = () => {
    setSubmitted(false);
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      header="Create Service Type"
      modal
      style={{ width: '50vw' }}
      footer={
        <div>
          <Button variant="outlined" color="danger" onClick={handleHide}>Cancel</Button>
        </div>
      }
    >
      <CreateServiceTypeForm onSubmit={handleSubmit} serviceType={serviceType} loading={isCreating || isUpdating} />
      {submitted && <div>Form submitted successfully!</div>}
    </Dialog>
  );
};

export default CreateServiceTypeModal;
