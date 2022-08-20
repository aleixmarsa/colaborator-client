import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "formik";

function CustomErrorMessage(props) {
  const { type, errors } = props;
  return (
    <div className="absolute -bottom-6 left-0 w-fit">
      {errors  && (
        <ExclamationCircleIcon
          className="h-4 w-4 text-red-500 inline"
          aria-hidden="true"
        />
      )}
      <ErrorMessage
        component="div"
        name={type}
        className=" ml-1 transform text-xs text-red-600 inline"
      />
    </div>
  );
}

export default CustomErrorMessage;
