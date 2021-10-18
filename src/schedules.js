function getSchedules() {

  // Get sheets from Drive
  var fiji_responses = SpreadsheetApp.openById("17ZDB3vrFVaLkeoTml6v4TuXxMWTLV8tJqfI0ZgR1suE"); // todo: update URL as needed
  var fiji_schedules = SpreadsheetApp.openById("1zlXWY6CWoshmBUp8wXp9mx6_P-0ruo1Qw0TRty6NL30");

  // Get specific tabs
  var responses_sheet = fiji_responses.getSheetByName("FORM_RESPONSES");
  var responses_utils_sheet = fiji_responses.getSheetByName("UTILS");

  var overview_sheet = fiji_schedules.getSheetByName("OVERVIEW");
  var formatted_sheet = fiji_schedules.getSheetByName("SCHEDULES");
  var schedules_utils_sheet = fiji_schedules.getSheetByName("UTILS");

  // Get last row of form sheet
  var num_responses = responses_sheet.getLastRow();
  var last_transferred = responses_utils_sheet.getRange(1,2).getValue();

  // Get last row of schedules sheet
  var schedules_last_filled = formatted_sheet.getLastRow();
  schedules_last_filled++;

  for (var i = last_transferred + 1; i <= num_responses; i++) {
    // Set new last_transferred

    // var date = responses_sheet.getRange(i,1).getValue();
    var name = responses_sheet.getRange(i,103).getValue();
    var pc = responses_sheet.getRange(i,104).getValue().toString();
    var faculty = responses_sheet.getRange(i,105).getValue();
    var num_courses = responses_sheet.getRange(i,2).getValue();

    // Regex interlude

    pc = pc.replace(/\D/g,'');

    // todo: add year of school
    formatted_sheet.getRange(schedules_last_filled,1).setValue(name);
    formatted_sheet.getRange(schedules_last_filled,2).setValue(pc);
    formatted_sheet.getRange(schedules_last_filled,3).setValue(faculty);
    formatted_sheet.getRange(schedules_last_filled,4).setValue(num_courses);

    var courses = [];

    var j = 0;

    switch(num_courses) {
      case 3:
        j = 3;
        break;
      case 4:
        j = 15;
        break;
      case 5:
        j = 31;
        break;
      case 6:
        j = 51;
        break;
      case 7:
        j = 75;
        break;
      default:
        j = 3;
    }

    for (var k = 0; k < num_courses; k++) {
      var course_name = responses_sheet.getRange(i,j).getValue().substring(0,8);

      var course_lab = responses_sheet.getRange(i,j+1).getValue().toString();
      if (course_lab.length >= 12) {
        course_lab = course_lab.substring(0,12);
      }

      var course_tutorial = responses_sheet.getRange(i,j+2).getValue().toString();
      if (course_tutorial.length >= 12) {
        course_tutorial = course_tutorial.substring(0,12);
      }

      var course_discussion = responses_sheet.getRange(i,j+3).getValue().toString();
      if (course_discussion.length >= 12) {
        course_discussion = course_discussion.substring(0,12);
      }

      var course = {
        name: course_name,
        lab: course_lab,
        tutorial: course_tutorial,
        discussion: course_discussion,
      };

      courses.push(course);

      j += 4;
    }

    Logger.log(courses);

    var shift = 5;

    for (var u = 0; u < num_courses; u++) {
      formatted_sheet.getRange(schedules_last_filled, u*4 + shift).setValue(courses[u].name);
      formatted_sheet.getRange(schedules_last_filled, u*4 + shift + 1).setValue(courses[u].lab);
      formatted_sheet.getRange(schedules_last_filled, u*4 + shift + 2).setValue(courses[u].tutorial);
      formatted_sheet.getRange(schedules_last_filled, u*4 + shift + 3).setValue(courses[u].discussion);
    }
    schedules_last_filled++;
  }
  last_transferred = responses_utils_sheet.getRange(1,2).setValue(num_responses);
  Logger.log("Complete");
}

// Rows IDs

// 1 Timestamp
// 2 How many courses are you taking this semester?

// 103 Name
// 104 Pledge Class
// 105 What's your faculty?

// 3 Course 1
// 4 Course 1 Lab
// 5 Course 1 Tutorial
// 6 Course 1 Discussion
// 7 Course 2
// 8 Course 2 Lab
// 9 Course 2 Tutorial
// 10 Course 2 Discussion
// 11 Course 3
// 12 Course 3 Lab
// 13 Course 3 Tutorial
// 14 Course 3 Discussion

// 15 Course 1
// 16 Course 1 Lab
// 17 Course 1 Tutorial
// 18 Course 1 Discussion
// 19 Course 2
// 20 Course 2 Lab
// 21 Course 2 Tutorial
// 22 Course 2 Discussion
// 23 Course 3
// 24 Course 3 Lab
// 25 Course 3 Tutorial
// 26 Course 3 Discussion
// 27 Course 4
// 28 Course 4 Lab
// 29 Course 4 Tutorial
// 30 Course 4 Discussion

// 31 Course 1
// 32 Course 1 Lab
// 33 Course 1 Tutorial
// 34 Course 1 Discussion
// 35 Course 2
// 36 Course 2 Lab
// 37 Course 2 Tutorial
// 38 Course 2 Discussion
// 39 Course 3
// 40 Course 3 Lab
// 41 Course 3 Tutorial
// 42 Course 3 Discussion
// 43 Course 4
// 44 Course 4 Lab
// 45 Course 4 Tutorial
// 46 Course 4 Discussion
// 47 Course 5
// 48 Course 5 Lab
// 49 Course 5 Tutorial
// 50 Course 5 Discussion

// 51 Course 1
// 52 Course 1 Lab
// 53 Course 1 Tutorial
// 54 Course 1 Discussion
// 55 Course 2
// 56 Course 2 Lab
// 57 Course 2 Tutorial
// 58 Course 2 Discussion
// 59 Course 3
// 60 Course 3 Lab
// 61 Course 3 Tutorial
// 62 Course 3 Discussion
// 63 Course 4
// 64 Course 4 Lab
// 65 Course 4 Tutorial
// 66 Course 4 Discussion
// 67 Course 5
// 68 Course 5 Lab
// 69 Course 5 Tutorial
// 70 Course 5 Discussion
// 71 Course 6
// 72 Course 6 Lab
// 73 Course 6 Tutorial
// 74 Course 6 Discussion

// 75 Course 1
// 76 Course 1 Lab
// 77 Course 1 Tutorial
// 78 Course 1 Discussion
// 79 Course 2
// 80 Course 2 Lab
// 81 Course 2 Tutorial
// 82 Course 2 Discussion
// 83 Course 3
// 84 Course 3 Lab
// 85 Course 3 Tutorial
// 86 Course 3 Discussion
// 87 Course 4
// 88 Course 4 Lab
// 89 Course 4 Tutorial
// 90 Course 4 Discussion
// 91 Course 5
// 92 Course 5 Lab
// 93 Course 5 Tutorial
// 94 Course 5 Discussion
// 95 Course 6
// 96 Course 6 Lab
// 97 Course 6 Tutorial
// 98 Course 6 Discussion
// 99 Course 7
// 100 Course 7 Lab
// 101 Course 7 Tutorial
// 102 Course 7 Discussion
