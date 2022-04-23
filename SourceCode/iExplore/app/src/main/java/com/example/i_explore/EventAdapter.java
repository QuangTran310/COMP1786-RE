package com.example.i_explore;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.List;

public class EventAdapter extends BaseAdapter {
    private MainActivity mContext;

    private List<Event> mEvent;

    private int layout;

    public EventAdapter(MainActivity mContext, List<Event> mEvent, int layout) {
        this.mContext = mContext;
        this.mEvent = mEvent;
        this.layout = layout;
    }

    @Override
    public int getCount() {
        return mEvent.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(layout, null);

        TextView activityName = (TextView) convertView.findViewById(R.id.tv_activity_name);
        TextView location = (TextView) convertView.findViewById(R.id.tv_location);
        TextView heldDate = (TextView) convertView.findViewById(R.id.tv_held_date);
        TextView attendingTime = (TextView) convertView.findViewById(R.id.tv_attending_time);
        TextView reporterName = (TextView) convertView.findViewById(R.id.tv_reporter_name);
        ImageButton deleteImg = (ImageButton) convertView.findViewById(R.id.img_delete);
        ImageButton updateImg = (ImageButton) convertView.findViewById(R.id.img_update);


        final Event event = mEvent.get(position);
        activityName.setText(event.getActivityName());
        location.setText(event.getLocation());
        heldDate.setText(event.getHeldDate());
        attendingTime.setText(event.getAttendingTime());
        reporterName.setText(event.getReporterName());

        updateImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mContext.updateEvent(position);
            }
        });

        deleteImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mContext.deleteEvent(position);
            }
        });

        return convertView;
    }
}
