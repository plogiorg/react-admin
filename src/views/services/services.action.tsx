import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import CreateServiceTypeForm from './services.create.tsx';
import Button from "@mui/joy/Button";
import { ServiceType, useCreateServiceType } from "../../api";

interface Props {
  visible: boolean;
  onHide: () => void;
}

const CreateServiceTypeModal: React.FC<Props> = ({ visible, onHide }) => {
  const [submitted, setSubmitted] = useState(false);
  const {mutateAsync:create, isLoading} = useCreateServiceType()

  const handleSubmit = async (values: ServiceType) => {
    console.log('Submitted values:', values);
    setSubmitted(true);
    try {
      await create(values)
    } catch (e) {
      console.log({ e });
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
      <CreateServiceTypeForm onSubmit={handleSubmit} loading={isLoading} />
      {submitted && <div>Form submitted successfully!</div>}
    </Dialog>
  );
};

export default CreateServiceTypeModal;
