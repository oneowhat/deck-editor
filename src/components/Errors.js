function Errors({ errors }) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div role="alert">
      <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        The following errors were found:
      </div>
      <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Errors;