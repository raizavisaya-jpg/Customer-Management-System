import { useState } from 'react';
import AddCustomerModal from '../components/ui/AddCustomerModal';
import EditCustomerModal from '../components/ui/EditCustomerModal';
import SoftDeleteConfirmDialog from '../components/ui/SoftDeleteConfirmDialog';

export default function CustomerListPage({
  customers = [],
  onAdd,
  onEdit,
  onDelete,
  rights = {},
  userType = 'USER',
  loading = false,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [paytermFilter, setPaytermFilter] = useState('');

  // Filter customers by name search and payterm dropdown
  const filtered = customers.filter((c) => {
    const matchesName = c.custname.toLowerCase().includes(search.toLowerCase());
    const matchesPayterm = paytermFilter ? c.payterm === paytermFilter : true;
    return matchesName && matchesPayterm;
  });

  // Get unique payterms from the customer list for the filter dropdown
  const uniquePayterms = [...new Set(customers.map((c) => c.payterm))];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        {rights.CUST_ADD && (
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Add Customer
          </button>
        )}
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <select
          value={paytermFilter}
          onChange={(e) => setPaytermFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
        >
          <option value="">All Pay Terms</option>
          {uniquePayterms.map((pt) => (
            <option key={pt} value={pt}>{pt}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Loading customers…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            No customers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Cust No</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Address</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Pay Term</th>
                  {/* Stamp column is hidden for regular USER type */}
                  {userType !== 'USER' && (
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Stamp</th>
                  )}
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.custno} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-mono">{c.custno}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {/* Clicking the name navigates to that customer's detail page */}
                      <button
                        onClick={() => window.location.href = `/customers/${c.custno}`}
                        className="text-blue-600 hover:underline"
                      >
                        {c.custname}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.address}</td>
                    <td className="px-4 py-3 text-gray-600">{c.payterm}</td>
                    {userType !== 'USER' && (
                      <td className="px-4 py-3 text-gray-500 text-xs">{c.stamp}</td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {rights.CUST_EDIT && (
                          <button
                            onClick={() => setEditTarget(c)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                        )}
                        {/* Delete is only visible to SUPERADMIN via CUST_DEL right */}
                        {rights.CUST_DEL && (
                          <button
                            onClick={() => setDeleteTarget(c)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && (
        <AddCustomerModal
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => { onAdd?.(data); setShowAdd(false); }}
        />
      )}
      {editTarget && (
        <EditCustomerModal
          customer={editTarget}
          onClose={() => setEditTarget(null)}
          onSubmit={(data) => { onEdit?.(data); setEditTarget(null); }}
        />
      )}
      {deleteTarget && (
        <SoftDeleteConfirmDialog
          customer={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => { onDelete?.(deleteTarget.custno); setDeleteTarget(null); }}
        />
      )}
    </div>
  );
}