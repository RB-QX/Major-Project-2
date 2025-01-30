package com.example.finance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.finance.model.Income;
import com.example.finance.repository.IncomeRepository;

@RestController
@RequestMapping("/income")
public class IncomeController {
    private final IncomeRepository incomeRepository;

    public IncomeController(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    @PostMapping("/add")
    public Income addIncome(@RequestBody Income income) {
        return incomeRepository.save(income);
    }

    @GetMapping("/all")
    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }
}
