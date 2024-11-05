import { Plus } from 'lucide-react';
import React from 'react';
import { AREAS, PLANT_TYPES, POT_SIZES, StockEntry } from '../types';

interface Props {
  onSubmit: (entry: Omit<StockEntry, 'id' | 'timestamp'>) => void;
  staffName: string;
}

export function StockForm({ onSubmit, staffName }: Props) {
  const [area, setArea] = React.useState(AREAS[0]);
  const [plantType, setPlantType] = React.useState(PLANT_TYPES[0]);
  const [size, setSize] = React.useState(POT_SIZES[0]);
  const [quantity, setQuantity] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity) return;

    onSubmit({
      plantType,
      size,
      quantity: parseInt(quantity),
      notes: notes.trim(),
      area,
      staffName,
    });

    setQuantity('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Plant Type</label>
        <select
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {PLANT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {POT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows={2}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 text-white p-4 rounded-lg text-lg font-medium
                 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50
                 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Save and Add Another
      </button>
    </form>
  );
}