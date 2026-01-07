package com.test.backend.controller;

import com.test.backend.service.CounterService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/counter")
@CrossOrigin(origins = "http://localhost:5173")
public class CounterController {

    private final CounterService service;

    public CounterController(CounterService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Integer> get() {
        return Map.of("value", service.getValue());
    }

    @PostMapping("/inc")
    public Map<String, Integer> inc() {
        return Map.of("value", service.inc());
    }

    @PostMapping("/dec")
    public Map<String, Integer> dec() {
        return Map.of("value", service.dec());
    }
}
