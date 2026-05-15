export default function InputField({
  label, id, type = 'text', value, onChange,
  placeholder, error, required = false, autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id} name={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-150 outline-none
          ${error
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }`}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}