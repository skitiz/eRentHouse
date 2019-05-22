package com.aku.cogent.services;

import com.aku.cogent.model.RealEstate;
import com.aku.cogent.model.User;
import com.aku.cogent.repository.RealEstateRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RealEstateService {

    private final RealEstateRepository realEstateRepository;

    public RealEstateService(RealEstateRepository realEstateRepository) {
        this.realEstateRepository = realEstateRepository;
    }

    public List<RealEstate> findAll() {
        return realEstateRepository.findAll();
    }

    public Optional<RealEstate> findHomeById(Long id) {
        return realEstateRepository.findById(id);
    }

    public RealEstate createHome(final RealEstate realEstate) {
        return realEstateRepository.save(realEstate);
    }

    public List<RealEstate> getAllComments() {
        return realEstateRepository.findAll();
    }

    public void deleteById(Long id) {
        realEstateRepository.deleteById(id);
    }

    public List<RealEstate> findByStateOrCity(String city, String state) {
        return realEstateRepository.findByCityOrState(city, state);
    }

    public List<RealEstate> findByPriceBetween(Long min, Long max) {
        return realEstateRepository.findByPriceBetween(min, max);
    }

}
