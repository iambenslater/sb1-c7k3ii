import React from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

export function StaffNameInput({ onSubmit }: Props) {
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
          <p className="text-gray-600">Please enter your name to begin stock-taking</p>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-emerald-600 text-white p-4 rounded-lg text-lg font-medium 
                   hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Start Stock-Taking
        </button>
      </form>
    </div>
  );
}