import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SalesHistoryPanel from '../components/ui/SalesHistoryPanel';

export default function CustomerDetailPage({
  customers = [],
  sales = [],
  loading = false,
}) {
  // useParams grabs the custno from the URL e.g. /customers/C001
  const { custno } = useParams();
  const navigate = useNavigate();

  const customer = customers.find((c) => c.custno === custno);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading customer…
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-gray-400 text-sm">Customer not found.</p>
        <button
          onClick={() => navigate('/customers')}
          className="text-blue-600 hover:underline text-sm"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/customers')}
        className="flex items-center gap-1 text-sm text-blue-600 hover:underline w-fit"
      >
        ← Back to Customers
      </button>

      {/* Customer info card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{customer.custname}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Customer No</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{customer.custno}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Address</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{customer.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Pay Term</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{customer.payterm}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Status</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {customer.record_status || 'ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Sales history panel for this customer */}
      <SalesHistoryPanel sales={sales} />
    </div>
  );
}