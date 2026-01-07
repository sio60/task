import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/count");
    const data = await res.json();
    setCount(data.value);
    setLoading(false);
  };

  const delta = async (d) => {
    const res = await fetch("/api/count/delta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delta: d })
    });
    const data = await res.json();
    setCount(data.value);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h2>Counter</h2>

      <div style={{ fontSize: 48, margin: "16px 0" }}>
        {loading ? "..." : count}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => delta(-1)} style={{ padding: "10px 16px" }}>-</button>
        <button onClick={() => delta(1)} style={{ padding: "10px 16px" }}>+</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={load} style={{ padding: "8px 12px" }}>DB에서 다시 불러오기</button>
      </div>
    </div>
  );
}
