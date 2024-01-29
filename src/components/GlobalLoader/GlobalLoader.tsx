import { ButtonLoaderIcon } from "../../assets/icons";

const GlobalLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-brand-primary-regular">
      <ButtonLoaderIcon className="animate-spin w-6 h-6" />
    </div>
  );
};

export default GlobalLoader;
