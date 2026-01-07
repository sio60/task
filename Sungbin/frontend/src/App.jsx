import React, { useState, useEffect } from 'react';
// import './App.css';  <-- 이거 지웠음 (CSS 안 씀)

function App() {
  const [count, setCount] = useState(0);

  // 1. 처음 로딩되면 DB에서 값 가져오기
  useEffect(() => {
    console.log('화면 켜짐');
    fetch('http://localhost:5000/api/count')
      .then(res => res.json())
      .then(data => {
        console.log('DB에서 받은 값:', data);
        setCount(data.count);
      });
  }, []);

  // 2. 증가 버튼 함수
  const clickPlus = () => {
    console.log('플러스 버튼 누름');
    fetch('http://localhost:5000/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'INC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
    });
  };

  // 3. 감소 버튼 함수 (복붙해서 따로 만듦)
  const clickMinus = () => {
    console.log('마이너스 버튼 누름');
    fetch('http://localhost:5000/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'DEC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
    });
  };

  return (
    // 디자인 다 빼고 쌩 태그만 사용
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>DB Counter</h1>
      
      {/* 숫자 나오는 곳 */}
      <h1>{count}</h1>

      {/* 버튼들 */}
      <div>
        <button onClick={clickPlus} style={{ marginRight: '10px' }}>
          증가 (+)
        </button>
        
        <button onClick={clickMinus}>
          감소 (-)
        </button>
      </div>
    </div>
  );
}

export default App;