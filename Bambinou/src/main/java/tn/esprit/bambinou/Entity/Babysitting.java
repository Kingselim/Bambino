package tn.esprit.bambinou.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Babysitting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBabysitting;
    private Long idUser;
    //private List<User> userList;
    private Date StartDate;
    private Date EndDate;
    private Long Duration;
    private Float Salary;
    private String Status;

    public Long getIdBabysitting() {
        return idBabysitting;
    }

    public void setIdBabysitting(Long idBabysitting) {
        this.idBabysitting = idBabysitting;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Date getStartDate() {
        return StartDate;
    }

    public void setStartDate(Date startDate) {
        StartDate = startDate;
    }

    public Date getEndDate() {
        return EndDate;
    }

    public void setEndDate(Date endDate) {
        EndDate = endDate;
    }

    public Long getDuration() {
        return Duration;
    }

    public void setDuration(Long duration) {
        Duration = duration;
    }

    public Float getSalary() {
        return Salary;
    }

    public void setSalary(Float salary) {
        Salary = salary;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }
}
