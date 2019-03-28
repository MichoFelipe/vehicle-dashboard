package com.example.vehicledashboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vehicle")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"created_date"},
        allowGetters = true)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String phone_number;

    @NotBlank
    private String car_model;
    
    @NotBlank
    private String current_location;
    
    @NotBlank
    private String special_requirement;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date created_date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() { return name; }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phone_number;
    }

    public void setPhoneNumber(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getCarModel() { return car_model; }

    public void setCarModel(String car_model) {
        this.car_model = car_model;
    }

    public Date getCreatedDate() { return created_date; }

    public void setCreatedDate(Date created_date) {
        this.created_date = created_date;
    }

	public String getCurrentLocation() {
		return current_location;
	}

	public void setCurrentLocation(String current_location) {
		this.current_location = current_location;
	}

	public String getSpecialRequirement() {
		return special_requirement;
	}

	public void setSpecialRequirement(String special_requirement) {
		this.special_requirement = special_requirement;
	}
}
