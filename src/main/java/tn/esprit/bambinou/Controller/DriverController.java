package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Driver;
import tn.esprit.bambinou.Service.IDriverService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private IDriverService driverService;

    @GetMapping("/retrieve-all-drivers")
    public List<Driver> getDrivers() {
        return driverService.retrieveAllDrivers();
    }

    @GetMapping("/retrieve-driver/{driver-id}")
    public Driver retrieveDriver(@PathVariable("driver-id") Long driverId) {
        return driverService.retrieveDriver(driverId);
    }

    @PostMapping("/add-driver")
    public Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

    @DeleteMapping("/remove-driver/{driver-id}")
    public void removeDriver(@PathVariable("driver-id") Long driverId) {
        driverService.removeDriver(driverId);
    }

    @PutMapping("/modify-driver/{driver-id}")
    public Driver modifyDriver(@RequestBody Driver driver, @PathVariable("driver-id") Long driverId) {
        driver.setIdDriver(driverId); // Ensure the ID is set
        return driverService.modifyDriver(driver);
    }
}
