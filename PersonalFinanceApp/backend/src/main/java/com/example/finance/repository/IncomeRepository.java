package com.example.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.finance.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> { }
