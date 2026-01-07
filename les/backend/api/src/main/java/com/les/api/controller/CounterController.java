package com.les.api.controller;

import org.springframework.web.bind.annotation.*;

import com.les.api.service.CounterService;

import java.util.Map;

@RestController
@RequestMapping("/api/counter")
@CrossOrigin(origins = "http://localhost:5173") // 프론트 개발서버 허용
public class CounterController {

    private final CounterService service;

    public CounterController(CounterService service) {
        this.service = service;
    }

    // DB에 저장된 현재 값 조회
    @GetMapping
    public Map<String, Long> get() {
        return Map.of("value", service.get());
    }

    // +1 하고 DB 저장
    @PostMapping("/inc")
    public Map<String, Long> inc() {
        return Map.of("value", service.inc());
    }

    // -1 하고 DB 저장
    @PostMapping("/dec")
    public Map<String, Long> dec() {
        return Map.of("value", service.dec());
    }
}