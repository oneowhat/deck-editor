function FormField({
  name, label, value, onChange, type = 'text', selectOptions, disabled = false, provideEmptySelectOption = true
}) {
  const renderField = () => {
    if (type === 'select') {
      return (
        <select
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {provideEmptySelectOption ? <option value="" /> : null}
          {selectOptions.map((so) => <option key={so.id} value={so.id}>{so.name}</option>)}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          rows={8}
        />
      );
    }

    return (
      <input
        type={type}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={name}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      />
    );
  };

  return (
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        {type === 'checkbox'
          ? (
            <label class="md:w-2/3 block text-gray-500 font-bold" htmlFor={name}>
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={onChange}
                disabled={disabled}></input>
              <span class="text-sm">
                {label}
              </span>
            </label>
          )
          : (
            <>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
                {label}
              </label>
              {renderField()}
            </>
          )
        }
      </div>
    </div>
  );
}

export default FormField;