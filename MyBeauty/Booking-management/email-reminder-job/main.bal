import ballerina/io;
import ballerina/http;
import ballerina/log;
import ballerina/time;

import wso2/choreo.sendemail as ChoreoEmail;

configurable string appointmentApiUrl = ?;

type Appointment record {
    string appointmentDate;
    string email;
    int id;
    string name;
    string phoneNumber;
    string 'service;
};

public function main() returns error? {
    io:println("Appointment URL: " + appointmentApiUrl);
    http:Client appointmentApiEndpoint = check new (appointmentApiUrl);

    Appointment[] appointments = check appointmentApiEndpoint->/appointments(upcoming = "true");

    foreach Appointment appointment in appointments {
        check sendEmail(appointment);
    }
}

function sendEmail(Appointment appointment) returns error? {

    string formattedAppointmentDate = check getIstTimeString(appointment.appointmentDate);

    string serviceName = convertAndCapitalize(appointment.'service);

    string finalContent = string `
    Dear ${appointment.name},

    This is a reminder that you have an appointment scheduled for ${serviceName} at ${formattedAppointmentDate}.

    Thank you for choosing MyBeauty for make beautify you. We are here to assist you and giver better service at every step of your beauty journey.

    Warm regards,
    The MyBeauty Team

    ---

    CareConnect - Your Partner in Health

    Website: https://www.myBeauty.com
    Support: support@myBeauty.com
    Phone: +1 (800) 123-4567

    Follow us on:
    - Facebook: https://www.facebook.com/myBeauty
    - Twitter: https://twitter.com/myBeauty

    Privacy Policy | Terms of Use | Unsubscribe

    This message is intended only for the addressee and may contain confidential information. If you are not the intended recipient, you are hereby notified that any use, dissemination, copying, or storage of this message or its attachments is strictly prohibited.
    `;
    
    ChoreoEmail:Client emailClient = check new ();
    string sendEmailResponse = check emailClient->sendEmail(appointment.email, "Upcoming Appointment Reminder", finalContent);
    log:printInfo("Email sent successfully to: " + appointment.email + " with response: " + sendEmailResponse);
}

function getIstTimeString(string utcTimeString) returns string|error {
    time:Utc utcTime = check time:utcFromString(utcTimeString);

    time:TimeZone zone = check new ("Asia/Colombo");
    time:Civil istTime = zone.utcToCivil(utcTime);

    string emailFormattedString = check time:civilToEmailString(istTime, time:PREFER_TIME_ABBREV);
    return emailFormattedString;

}

function convertAndCapitalize(string input) returns string {
    string:RegExp r = re `-`;

    string[] parts = r.split(input);
    string result = "";
    foreach var word in parts {
        string capitalizedWord = word.substring(0,1).toUpperAscii() + word.substring(1).toLowerAscii();
        if(result.length() > 0 ){
            result = result + " " + capitalizedWord;
        }else {
            result = capitalizedWord;
        }
    }

    return result;
}
