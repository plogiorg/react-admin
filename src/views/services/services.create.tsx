import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Input from '@mui/joy/Input';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import { PlusIcon } from "primereact/icons/plus";
import { ServiceType } from "../../api";

// Define the toast property on the Window object
declare global {
  interface Window {
    toast: Toast | null;
  }
}


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image URL is required'),
  isActive: Yup.boolean().required('Please specify if the service type is active'),
});

const initialValues: ServiceType = {
  title: '',
  description: '',
  image: '',
  isActive: false,
};

interface Props {
  onSubmit: (values: ServiceType) => void;
  serviceType?:ServiceType,
  loading:boolean
}

const CreateServiceTypeForm: React.FC<Props> = ({ onSubmit, loading, serviceType }) => {
  const handleSubmit = (values: ServiceType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Toast ref={(el) => (window.toast = el)} />
      <h1>Create Service Type</h1>
      <Formik
        initialValues={serviceType || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" as={Input} />
                <ErrorMessage name="title" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="description">Description</label>
                <Field id="description" name="description" as={Input} />
                <ErrorMessage name="description" component="div" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="image">Image URL</label>
                <Field id="image" name="image" as={Input} />
                <ErrorMessage name="image" component="div" className="p-error" />
              </div>

              <div className="my-2">
                <label className={"mx-2"} htmlFor="isActive">Active</label>
                <Field id="isActive" name="isActive" as={Checkbox} />
                <ErrorMessage name="isActive" component="div" className="p-error" />
              </div>
              <Button variant="solid" color="primary" loading={loading} startDecorator={<PlusIcon />} disabled={isSubmitting} type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateServiceTypeForm;
