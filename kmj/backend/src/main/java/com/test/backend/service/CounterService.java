package com.test.backend.service;

import com.test.backend.entity.Counter;
import com.test.backend.repo.CounterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CounterService {

    private final CounterRepository repo;
    private static final long SINGLETON_ID = 1L;

    public CounterService(CounterRepository repo) {
        this.repo = repo;
    }

    private Counter getOrCreate() {
        return repo.findById(SINGLETON_ID)
                .orElseGet(() -> repo.save(new Counter(SINGLETON_ID, 0)));
    }

    @Transactional(readOnly = true)
    public int getValue() {
        return repo.findById(SINGLETON_ID)
                .map(Counter::getValue)
                .orElse(0);
    }

    @Transactional
    public int inc() {
        Counter c = getOrCreate();
        c.setValue(c.getValue() + 1);
        return c.getValue();
    }

    @Transactional
    public int dec() {
        Counter c = getOrCreate();
        c.setValue(c.getValue() - 1);
        return c.getValue();
    }
}
