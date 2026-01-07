package com.les.api.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.les.api.entity.Counter;
import com.les.api.repository.CounterRepository;

@Service
public class CounterService {
    private final CounterRepository repo;
    private static final Long SINGLETON_ID = 1L;

    public CounterService(CounterRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Long get() {
        return repo.findById(SINGLETON_ID)
                .orElseGet(() -> repo.save(new Counter(SINGLETON_ID, 0L)))
                .getValue();
    }

    @Transactional
    public Long inc() {
        Counter c = repo.findById(SINGLETON_ID)
                .orElseGet(() -> repo.save(new Counter(SINGLETON_ID, 0L)));
        c.setValue(c.getValue() + 1);
        return c.getValue();
    }

    @Transactional
    public Long dec() {
        Counter c = repo.findById(SINGLETON_ID)
                .orElseGet(() -> repo.save(new Counter(SINGLETON_ID, 0L)));
        c.setValue(c.getValue() - 1);
        return c.getValue();
    }
}