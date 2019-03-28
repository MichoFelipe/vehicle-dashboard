package com.example.vehicledashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.vehicledashboard.model.Vehicle;
import com.example.vehicledashboard.repository.VehicleRepository;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class VehicleController {

    @Autowired
    VehicleRepository vehicleRepository;

    @GetMapping("/vehicles")
    public List<Vehicle> getAllvehicles() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> getEmployeeById(@PathVariable(value = "id") Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findOne(vehicleId);
        if(vehicle == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(vehicle);
    }

    @PostMapping("/vehicle")
    public Vehicle createEmployee(@Valid @RequestBody Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @PutMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> updateEmployee(@PathVariable(value = "id") Long vehicleId,
                                               @Valid @RequestBody Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findOne(vehicleId);
        if(vehicle == null) {
            return ResponseEntity.notFound().build();
        }
        vehicle.setName(vehicleDetails.getName());
        vehicle.setPhoneNumber(vehicleDetails.getPhoneNumber()); 
        vehicle.setCarModel(vehicleDetails.getCarModel());

        Vehicle updatedEmployee = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> deleteEmployee(@PathVariable(value = "id") Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findOne(vehicleId);
        if(vehicle == null) {
            return ResponseEntity.notFound().build();
        }

        vehicleRepository.delete(vehicle);
        return ResponseEntity.ok().build();
    }
}
