package com.aku.cogent.repository;

import com.aku.cogent.model.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealEstateRepository extends JpaRepository<RealEstate, Long> {
    List<RealEstate> findByCityOrState(String city, String state);

    List<RealEstate> findByPriceBetween(Long min, Long max);
}
