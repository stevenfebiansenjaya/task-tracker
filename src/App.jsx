import { useState } from 'react';

export default function App() {
  // 1. State untuk menampung list task
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Belajar konsep useState React', completed: true },
    { id: 2, text: 'Bikin mini project Task Tracker', completed: false },
  ]);

  // 2. State untuk menampung input text baru
  const [text, setText] = useState('');

  // Fungsi untuk menambah task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setText(''); // Reset input
  };

  // Fungsi untuk toggle selesai/belum
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Fungsi untuk menghapus task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-400">
          Task Tracker 🚀
        </h1>

        {/* Form Input */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Tambah task baru..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Tambah
          </button>
        </form>

        {/* List Tasks */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-4">
              Belum ada task. Yuk tambah satu!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span
                    className={`text-sm ${
                      task.completed
                        ? 'line-through text-slate-500'
                        : 'text-slate-200'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-400 text-xs font-semibold px-2 py-1 rounded transition-colors"
                >
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>

        {/* Counter */}
        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between text-xs text-slate-400">
          <span>Total: {tasks.length} task</span>
          <span>
            Selesai: {tasks.filter((t) => t.completed).length} / {tasks.length}
          </span>
        </div>
      </div>
    </div>
  );
}