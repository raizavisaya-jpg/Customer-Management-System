import { useState } from 'react';
import SalesDetailModal from './SalesDetailModal';

export default function SalesHistoryPanel({ sales = [] }) {
  // Tracks which transaction the user clicked to view its line items
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Sales History</h2>
      </div>

      {sales.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          No sales transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Trans No</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Sales Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Emp No</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((s) => (
                <tr key={s.transNo} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700 font-mono">{s.transNo}</td>
                  <td className="px-4 py-3 text-gray-600">{s.salesDate}</td>
                  <td className="px-4 py-3 text-gray-600">{s.empNo}</td>
                  <td className="px-4 py-3">
                    {/* Clicking View opens the modal with that transaction's line items */}
                    <button
                      onClick={() => setSelectedTransaction(s)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTransaction && (
        <SalesDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}