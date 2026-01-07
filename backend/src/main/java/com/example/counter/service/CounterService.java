package com.example.counter.service;

import com.example.counter.entity.CounterEntity;
import com.example.counter.repository.CounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CounterService {

    private final CounterRepository counterRepository;
    private static final Integer COUNTER_ID = 1;

    /**
     * 현재 카운터 값 조회
     */
    public Integer getCounterValue() {
        return counterRepository.findById(COUNTER_ID)
                .map(CounterEntity::getValue)
                .orElse(0);
    }

    /**
     * 카운터 증가
     */
    @Transactional
    public Integer incrementCounter() {
        CounterEntity counter = counterRepository.findById(COUNTER_ID)
                .orElseThrow(() -> new RuntimeException("Counter not found"));

        counter.setValue(counter.getValue() + 1);
        counterRepository.save(counter);

        return counter.getValue();
    }

    /**
     * 카운터 감소
     */
    @Transactional
    public Integer decrementCounter() {
        CounterEntity counter = counterRepository.findById(COUNTER_ID)
                .orElseThrow(() -> new RuntimeException("Counter not found"));

        counter.setValue(counter.getValue() - 1);
        counterRepository.save(counter);

        return counter.getValue();
    }
}
