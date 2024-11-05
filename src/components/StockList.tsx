import { Download } from 'lucide-react';
import React from 'react';
import { StockEntry } from '../types';

interface Props {
  entries: StockEntry[];
}

export function StockList({ entries }: Props) {
  const downloadCsv = () => {
    const headers = ['Timestamp', 'Staff Name', 'Area', 'Plant Type', 'Size', 'Quantity', 'Notes'];
    const rows = entries.map((entry) => [
      new Date(entry.timestamp).toLocaleString(),
      entry.staffName,
      entry.area,
      entry.plantType,
      entry.size,
      entry.quantity,
      entry.notes || '',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-take-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Recent Entries</h2>
        <button
          onClick={downloadCsv}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg
                   hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="space-y-2">
        {entries.slice(-5).reverse().map((entry) => (
          <div
            key={entry.id}
            className="bg-white p-4 rounded-lg border shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
              <span>{entry.area}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{entry.plantType}</h3>
                <p className="text-sm text-gray-600">{entry.size}</p>
              </div>
              <span className="text-lg font-semibold">{entry.quantity}</span>
            </div>
            {entry.notes && (
              <p className="text-sm text-gray-600 border-t pt-2">{entry.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}