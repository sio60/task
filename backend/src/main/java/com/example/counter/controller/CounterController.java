package com.example.counter.controller;

import com.example.counter.service.CounterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/counter")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CounterController {

    private final CounterService counterService;

    /**
     * 현재 카운터 값 조회
     * GET /api/counter
     */
    @GetMapping
    public ResponseEntity<Map<String, Integer>> getCounter() {
        Integer value = counterService.getCounterValue();
        return ResponseEntity.ok(Map.of("value", value));
    }

    /**
     * 카운터 증가
     * POST /api/counter/increment
     */
    @PostMapping("/increment")
    public ResponseEntity<Map<String, Integer>> incrementCounter() {
        Integer value = counterService.incrementCounter();
        return ResponseEntity.ok(Map.of("value", value));
    }

    /**
     * 카운터 감소
     * POST /api/counter/decrement
     */
    @PostMapping("/decrement")
    public ResponseEntity<Map<String, Integer>> decrementCounter() {
        Integer value = counterService.decrementCounter();
        return ResponseEntity.ok(Map.of("value", value));
    }
}
