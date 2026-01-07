package com.les.api.entity;

import jakarta.persistence.*;

@Entity
public class Counter {
    @Id
    private Long id;

    private Long value;

    protected Counter() {
    }

    public Counter(Long id, Long value) {
        this.id = id;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}