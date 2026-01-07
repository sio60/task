package com.test.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "counter")
public class Counter {

    @Id
    private Long id;

    @Column(nullable = false)
    private int value;

    protected Counter() {
    }

    public Counter(Long id, int value) {
        this.id = id;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
