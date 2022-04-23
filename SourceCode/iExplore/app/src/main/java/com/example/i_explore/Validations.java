package com.example.i_explore;

import android.widget.EditText;

import java.util.regex.Pattern;

public class Validations {

    private String regex = "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)$"
            + "|^(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))$"
            + "|^(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))$"
            + "|^(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))$";

    public boolean areFieldsValid(EditText edtActivityName, EditText edtHeldDate, EditText edtReporterName) {

        String heldDate = edtHeldDate.getText().toString().trim();

        if (edtActivityName.length() == 0) {
            edtActivityName.setError("This field is required");
            return false;
        }

        if (edtHeldDate.length() == 0) {
            edtHeldDate.setError("This is field is required");
            return false;
        }

        if (edtHeldDate.length() > 0 && !Pattern.matches(regex, heldDate)) {
            edtHeldDate.setError("Pattern required: year-month-day");
            return false;
        }

        if (edtReporterName.length() == 0) {
            edtReporterName.setError("This field is required");
            return false;
        }
        return true;
    }
}
