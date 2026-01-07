import { useEffect, useState, useCallback } from "react";

// ✅ Vite 환경변수 있으면 그걸 쓰고, 없으면 localhost 기본값
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/counter";

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false); // ✅ 버튼 연타 방지용

  const fetchCount = useCallback(async () => {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`Failed to fetch counter: ${res.status}`);
    const data = await res.json(); // { value: number }
    setCount(data.value ?? 0);
  }, []);

  const inc = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/inc`, { method: "POST" });
      if (!res.ok) throw new Error(`Failed to increment: ${res.status}`);
      const data = await res.json();
      setCount(data.value ?? 0);
    } catch (e) {
      console.error(e);
      alert("증가 요청 실패 (백엔드/DB 확인)");
    } finally {
      setBusy(false);
    }
  }, [busy]);

  const dec = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/dec`, { method: "POST" });
      if (!res.ok) throw new Error(`Failed to decrement: ${res.status}`);
      const data = await res.json();
      setCount(data.value ?? 0);
    } catch (e) {
      console.error(e);
      alert("감소 요청 실패 (백엔드/DB 확인)");
    } finally {
      setBusy(false);
    }
  }, [busy]);

  useEffect(() => {
    setLoading(true);
    fetchCount()
      .catch((e) => {
        console.error(e);
        alert("백엔드 연결 실패: 8080 서버/API 확인");
      })
      .finally(() => setLoading(false));
  }, [fetchCount]);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 24,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Counter (Backend Connected)</h2>

      {/* 카운트 라벨 */}
      <div style={{ fontSize: 48, margin: "16px 0" }}>
        {loading ? "..." : count}
      </div>

      {/* 버튼 영역 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <button
          onClick={dec}
          style={{ width: 120, padding: "12px 0", fontSize: 16 }}
          disabled={loading || busy}
        >
          − 감소
        </button>

        <button
          onClick={inc}
          style={{ width: 120, padding: "12px 0", fontSize: 16 }}
          disabled={loading || busy}
        >
          + 증가
        </button>
      </div>

      {/* (선택) 디버그용: API 주소 표시 */}
      <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
        API: {API_BASE}
      </div>
    </div>
  );
}
