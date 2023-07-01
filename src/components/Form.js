import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Errors from './Errors';
import FormField from './FormField';

function Form({
  fields = [], onSave, recordType, onSubmit = null, onSuccess = null,
  initialValues = null, submitButtonText = null
}) {
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      setValues({ ...initialValues });
    } else if (fields.length > 0) {
      const newValues = {};
      fields.forEach((f) => {
        newValues[f.name] = '';
      });
      setValues(newValues);
    }
  }, [fields, initialValues]);

  const handleChange = (event) => {
    const newValues = { ...values };
    if (event.target.type === 'checkbox') {
      newValues[event.target.name] = event.target.checked;
    } else {
      newValues[event.target.name] = event.target.value;
    }
    setValues(newValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(values, setErrors);
    } else {
      onSave(values).then((result) => {
        switch (result.type) {
          case 'success':
            if (onSuccess) {
              onSuccess(result.payload);
            } else {
              navigate('..');
            }
            break;
          case 'invalid':
            setErrors(result.messages);
            break;
          default:
            // eslint-disable-next-line no-console
            console.log(`Unexpected result type: ${result.type}`);
        }
      });
    }
  };

  if (!values) {
    return null;
  }

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>

      <Errors errors={errors} />

      {fields.map((f) => (f.renderElement ? f.renderElement(values[f.name], handleChange) : (
        <FormField
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type}
          selectOptions={f.selectOptions}
          value={values[f.name]}
          onChange={handleChange}
        />
      )))}

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            {' '}
            {submitButtonText || (initialValues ? 'Update' : 'Add')}
            {' '}
            {recordType}
          </button>
          <Link to="/" className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="submit">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;