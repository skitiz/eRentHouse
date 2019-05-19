package com.aku.cogent.controllers;

import com.aku.cogent.components.EmailServiceImpl;
import com.aku.cogent.model.RealEstate;
import com.aku.cogent.model.User;
import com.aku.cogent.services.RealEstateService;
import com.aku.cogent.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


/*TODO: Normalize the states in front end.
* */


@RestController
@RequestMapping("/api")
public class RealEstateAPI {

    @Autowired
    private EmailServiceImpl emailService;

    @Autowired
    private UserService homeOwnerRepository;

    @Autowired
    private RealEstateService realEstateService;


    /*
    * Get all houses.
    * */
    @GetMapping("/homes/")
    public ResponseEntity<List> findAll() {
        return ResponseEntity.ok(realEstateService.findAll());
    }


    /*
    * Get house with a specific id.
    * */
    @GetMapping("/homes/{postId}")
    public Set<RealEstate> getHouses(@PathVariable Long postId) {
        return this.homeOwnerRepository.findById(postId).map
                (User::getRealEstate).orElseThrow(
                        () -> new ResourceNotFoundException("The homeowner does not have a house."));
    }


    // Create a new real estate entity.
    @PostMapping("/homes/{id}")
    public RealEstate createHouse(@RequestBody @Valid RealEstate realEstate, @PathVariable Long id) {

        realEstateService.createHome(realEstate);
        int a = 0;
        ArrayList<String> temp = new ArrayList<>();
        temp.add(realEstate.getId() + "_" + a);
        realEstate.setImages(temp);


        User user = new User();
        this.homeOwnerRepository.findById(id).map((home) -> {
            user.setId(home.getId());
            user.setEmail(home.getEmail());
            user.setName(home.getName());
            user.setPassword(home.getPassword());
            user.setRealEstate(home.getRealEstate());
            user.setType(home.getType());
            realEstate.setHomeOwner(user);
            return realEstateService.createHome(realEstate);
        });
        return new RealEstate();
    }


    // Associate the house with a user.
    @PostMapping("/{id}/homes/{homeId}")
    public Set<RealEstate> addHouse(@PathVariable(value = "id") Long id ,
                                      @PathVariable(value = "homeId") Long homeId) {
        RealEstate realEstate = this.realEstateService.findHomeById(homeId).orElseThrow(
                () -> new ResourceNotFoundException("The id doesnt exist.")
        );

        return this.homeOwnerRepository.findById(id).map((home) -> {
            home.getRealEstate().add(realEstate);
            return this.homeOwnerRepository.save(home).getRealEstate();
        }).orElseThrow(ResourceNotFoundException::new);
    }

    // Adds images to the real estate.
    @PostMapping("/homes/images/{id}")
    public ResponseEntity<RealEstate> addImage(@PathVariable Long id) {
        RealEstate realEstate = realEstateService.findHomeById(id).get();
        ArrayList<String> temp = realEstate.getImages();
        String image = temp.get(temp.size() - 1);
        String[] arr = image.split("_");
        int index = Integer.parseInt(arr[1]);
        temp.add(arr[0] + "_" + index + 1);
        realEstate.setImages(temp);
        realEstateService.createHome(realEstate);
        return ResponseEntity.ok(realEstate);
    }

    // Find houses by city name.
    @GetMapping("/homes/city/{city}")
    public ResponseEntity<List<RealEstate>> getCities(@PathVariable String city) {
        List<RealEstate> realEstates = realEstateService.findAll().stream()
                .filter(house -> house.getCity().equalsIgnoreCase(city))
                .collect(Collectors.toList());
        return ResponseEntity.ok(realEstates);
    }

    // Get houses by price.
    @GetMapping("/homes/price/{price}")
    public ResponseEntity<List<RealEstate>> getPrice(@PathVariable Long price) {
        List<RealEstate> realEstates = realEstateService.findAll().stream()
                .filter(house -> house.getPrice().equals(price))
                .collect(Collectors.toList());
        return ResponseEntity.ok(realEstates);
    }

    // Get houses by state.
    @GetMapping("/homes/price/{state}")
    public ResponseEntity<List<RealEstate>> getStates(@PathVariable String state) {
        List<RealEstate> realEstates = realEstateService.findAll().stream()
                .filter(house -> house.getState().equalsIgnoreCase(state))
                .collect(Collectors.toList());
        return ResponseEntity.ok(realEstates);
    }

    //Delete a house from a user.
    @DeleteMapping("/{id}/homes/{houseId}")
    public void deleteHouse(@PathVariable Long id, @PathVariable Long houseId) {
        this.homeOwnerRepository.findById(id).map((home) -> {
            return home.getRealEstate().removeIf(e -> e.getId().equals(houseId));
        }).orElseThrow(() -> new ResourceNotFoundException("Deleted house."));
    }

}
