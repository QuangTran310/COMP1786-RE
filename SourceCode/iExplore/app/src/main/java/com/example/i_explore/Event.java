package com.example.i_explore;

public class Event {
    private String activityName;

    private String location;

    private String heldDate;

    private String attendingTime;

    private String reporterName;

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHeldDate() {
        return heldDate;
    }

    public void setHeldDate(String heldDate) {
        this.heldDate = heldDate;
    }

    public String getAttendingTime() {
        return attendingTime;
    }

    public void setAttendingTime(String attendingTime) {
        this.attendingTime = attendingTime;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public Event(String activityName, String location, String heldDate, String attendingTime, String reporterName) {
        this.activityName = activityName;
        this.location = location;
        this.heldDate = heldDate;
        this.attendingTime = attendingTime;
        this.reporterName = reporterName;
    }

    public Event() {
    }
}
