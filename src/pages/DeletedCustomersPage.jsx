export default function DeletedCustomersPage({
  deletedCustomers = [],
  onRecover,
  loading = false,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Deleted Customers</h1>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          ADMIN / SUPERADMIN only
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Loading deleted customers…
          </div>
        ) : deletedCustomers.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            No deleted customers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Cust No</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  {/* Stamp shows the audit trail of who soft-deleted this record */}
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Stamp</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deletedCustomers.map((c) => (
                  <tr key={c.custno} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-mono">{c.custno}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{c.custname}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{c.stamp || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
                        INACTIVE
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onRecover?.(c.custno)}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                      >
                        Recover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}