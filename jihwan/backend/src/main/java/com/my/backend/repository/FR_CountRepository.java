package com.my.backend.repository;

import com.my.backend.entity.FR_Count;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FR_CountRepository extends JpaRepository<FR_Count, Long> {
}
