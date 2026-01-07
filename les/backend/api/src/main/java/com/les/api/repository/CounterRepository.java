package com.les.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.les.api.entity.Counter;

public interface CounterRepository extends JpaRepository<Counter, Long> {
}
