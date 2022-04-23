package com.example.i_explore;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.android.material.bottomsheet.BottomSheetDialog;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private ListView lvEvent;

    private EditText edtActivityName, edtLocation, edtHeldDate, edtAttendingTime, edtReporterName;

    private Button addButton;

    private Event event;

    private List<Event> mEvent;

    private EventAdapter eventAdapter;

    private Validations validations;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        UI_SETUP();

        mEvent = new ArrayList<>();
        eventAdapter = new EventAdapter(MainActivity.this, mEvent, R.layout.custom_event);

        addButton.setOnClickListener(this);
    }

    private void UI_SETUP() {
        lvEvent = (ListView) findViewById(R.id.lvEvent);
        edtActivityName = (EditText) findViewById(R.id.edt_activity_name);
        edtLocation = (EditText) findViewById(R.id.edt_location);
        edtHeldDate = (EditText) findViewById(R.id.edt_held_date);
        edtAttendingTime = (EditText) findViewById(R.id.edt_attending_time);
        edtReporterName = (EditText) findViewById(R.id.edt_reporter_name);
        addButton = (Button) findViewById(R.id.add_button);
    }

    public void deleteEvent(final int position) {
        mEvent.remove(position);
        eventAdapter.notifyDataSetChanged();
        Toast.makeText(this, "Remove event successfully!", Toast.LENGTH_SHORT).show();
    }

    public void updateEvent(final int position) {
        final Event event = mEvent.get(position);
        View dialogSheetView = LayoutInflater.from(MainActivity.this).inflate(R.layout.edit_event, null);
        BottomSheetDialog dialog = new BottomSheetDialog(MainActivity.this);
        dialog.setContentView(dialogSheetView);

        EditText edtActivityName = (EditText) dialogSheetView.findViewById(R.id.edt_activity_name);
        EditText edtLocation = (EditText) dialogSheetView.findViewById(R.id.edt_location);
        EditText edtHeldDate = (EditText) dialogSheetView.findViewById(R.id.edt_held_date);
        EditText edtAttendingTime = (EditText) dialogSheetView.findViewById(R.id.edt_attending_time);
        EditText edtReporterName = (EditText) dialogSheetView.findViewById(R.id.edt_reporter_name);
        Button updateButton = (Button) dialogSheetView.findViewById(R.id.update_button);

        edtActivityName.setText(mEvent.get(position).getActivityName());
        edtLocation.setText(mEvent.get(position).getLocation());
        edtHeldDate.setText(mEvent.get(position).getHeldDate());
        edtAttendingTime.setText(mEvent.get(position).getAttendingTime());
        edtReporterName.setText(mEvent.get(position).getReporterName());

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String activityName = edtActivityName.getText().toString().trim();
                final String location = edtLocation.getText().toString().trim();
                final String heldDate = edtHeldDate.getText().toString().trim();
                final String attendingTime = edtAttendingTime.getText().toString().trim();
                final String reporterName = edtReporterName.getText().toString().trim();

                Boolean areFieldsValid = validations.areFieldsValid(edtActivityName, edtHeldDate, edtReporterName);

                if (areFieldsValid == false) {
                    Toast.makeText(MainActivity.this, "Update event failed!", Toast.LENGTH_SHORT).show();
                } else {
                    event.setActivityName(activityName);
                    event.setLocation(location);
                    event.setHeldDate(heldDate);
                    event.setAttendingTime(attendingTime);
                    event.setReporterName(reporterName);
                    eventAdapter.notifyDataSetChanged();
                    lvEvent.setAdapter(eventAdapter);
                    Toast.makeText(MainActivity.this, "Update event successfully!", Toast.LENGTH_SHORT).show();
                }
            }
        });

        dialog.show();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.add_button:
                final String activityName = edtActivityName.getText().toString().trim();
                final String location = edtLocation.getText().toString().trim();
                final String heldDate = edtHeldDate.getText().toString().trim();
                final String attendingTime = edtAttendingTime.getText().toString().trim();
                final String reporterName = edtReporterName.getText().toString().trim();

                validations = new Validations();
                Boolean areFieldsValid = validations.areFieldsValid(edtActivityName, edtHeldDate, edtReporterName);

                if(areFieldsValid == false) {
                    Toast.makeText(MainActivity.this, "Add new event failed!", Toast.LENGTH_SHORT).show();
                } else {
                    event = new Event(activityName, location, heldDate, attendingTime, reporterName);
                    mEvent.add(event);
                    lvEvent.setAdapter(eventAdapter);
                    eventAdapter.notifyDataSetChanged();
                    Toast.makeText(MainActivity.this, "Add new event successfully!", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
                break;
        }
    }
}