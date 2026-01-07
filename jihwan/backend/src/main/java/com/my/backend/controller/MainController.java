package com.my.backend.controller;

import com.my.backend.entity.FR_Count;
import com.my.backend.repository.FR_CountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/count")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    private final FR_CountRepository repository;

    @GetMapping
    public int getCount() {
        return getFirstOrCreate().getCount();
    }

    @PostMapping("/increment")
    public int increment() {
        FR_Count frCount = getFirstOrCreate();
        frCount.setCount(frCount.getCount() + 1);
        repository.save(frCount);
        return frCount.getCount();
    }

    @PostMapping("/decrement")
    public int decrement() {
        FR_Count frCount = getFirstOrCreate();
        frCount.setCount(frCount.getCount() - 1);
        repository.save(frCount);
        return frCount.getCount();
    }

    private FR_Count getFirstOrCreate() {
        List<FR_Count> list = repository.findAll();
        if (list.isEmpty()) {
            FR_Count newCount = new FR_Count();
            newCount.setCount(0);
            return repository.save(newCount);
        }
        return list.get(0);
    }
}
