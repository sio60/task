-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS counter_db;

-- 데이터베이스 사용
USE counter_db;

-- 카운터 테이블 생성
CREATE TABLE IF NOT EXISTS counter (
    id INT PRIMARY KEY AUTO_INCREMENT,
    value INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 초기 데이터 삽입 (단일 레코드만 유지)
INSERT INTO counter (id, value) VALUES (1, 0)
ON DUPLICATE KEY UPDATE value = value;
