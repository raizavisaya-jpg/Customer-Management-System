export default function SalesDetailModal({ transaction, onClose }) {
  // transaction.items holds the line items: product description, qty, unit price
  const items = transaction.items || [];

  // Calculates the total amount for a single line item
  const lineTotal = (qty, price) => (qty * price).toFixed(2);

  // Sums up all line items to get the transaction total
  const grandTotal = items
    .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    .toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Transaction #{transaction.transNo}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {transaction.salesDate} · Emp {transaction.empNo}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No line items found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-medium text-gray-600">Product</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-600">Qty</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-600">Unit Price</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-700">{item.description}</td>
                    <td className="px-3 py-2 text-gray-600 text-right">{item.quantity}</td>
                    <td className="px-3 py-2 text-gray-600 text-right">
                      ₱{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-gray-700 font-medium text-right">
                      ₱{lineTotal(item.quantity, item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Grand total row */}
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td colSpan={3} className="px-3 py-3 text-right font-semibold text-gray-700">
                    Grand Total
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-gray-800">
                    ₱{grandTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}