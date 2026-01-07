import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchCount() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/counter`);
    const data = await res.json();
    setCount(data.value);
    setLoading(false);
  }

  async function inc() {
    const res = await fetch(`${API_BASE}/api/counter/inc`, { method: "POST" });
    const data = await res.json();
    setCount(data.value);
  }

  async function dec() {
    const res = await fetch(`${API_BASE}/api/counter/dec`, { method: "POST" });
    const data = await res.json();
    setCount(data.value);
  }

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>Counter</h2>

      <div style={{ fontSize: 32, margin: "16px 0" }}>
        {loading ? "Loading..." : count}
      </div>

      <button onClick={dec} style={{ marginRight: 8 }}>-</button>
      <button onClick={inc}>+</button>

      <div style={{ marginTop: 16 }}>
        <button onClick={fetchCount}>DB에서 다시 불러오기</button>
      </div>
    </div>
  );
}