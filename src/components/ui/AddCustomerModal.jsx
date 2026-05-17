import { useState } from 'react';
import InputField from './InputField';

export default function AddCustomerModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    custno: '', custname: '', address: '', payterm: '',
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.custno.trim()) e.custno = 'Customer number is required.';
    if (!form.custname.trim()) e.custname = 'Customer name is required.';
    if (!form.address.trim()) e.address = 'Address is required.';
    if (!form.payterm) e.payterm = 'Pay term is required.';
    return e;
  }

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Add Customer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <InputField label="Customer No" id="custno" value={form.custno}
            onChange={handleChange('custno')} placeholder="e.g. C001"
            error={errors.custno} required />
          <InputField label="Customer Name" id="custname" value={form.custname}
            onChange={handleChange('custname')} placeholder="Full name"
            error={errors.custname} required />
          <InputField label="Address" id="address" value={form.address}
            onChange={handleChange('address')} placeholder="Street, City"
            error={errors.address} required />

          {/* Payterm is a fixed dropdown — only COD, 30D, or 45D are valid options */}
          <div className="flex flex-col gap-1">
            <label htmlFor="payterm" className="text-sm font-medium text-gray-700">
              Pay Term <span className="text-red-500">*</span>
            </label>
            <select
              id="payterm"
              value={form.payterm}
              onChange={handleChange('payterm')}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors duration-150 bg-white
                ${errors.payterm
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
            >
              <option value="">Select pay term</option>
              <option value="COD">COD</option>
              <option value="30D">30D</option>
              <option value="45D">45D</option>
            </select>
            {errors.payterm && <p className="text-xs text-red-500 mt-0.5">{errors.payterm}</p>}
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}