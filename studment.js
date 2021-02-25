const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const cors = require("cors");
app.use(cors());

let port = process.env.PORT || 8080;
//student list readFile
var studentlist = JSON.parse(
  fs.readFileSync("student.json", "utf-8", (err, data) => {
    console.log(data);
  })
);
//mentor list readFile
var mentorlist = JSON.parse(
  fs.readFileSync("mentor.json", "utf-8", (err, data) => {
    console.log(data);
  })
);
//students assigned to a mentor
var studment = JSON.parse(
  fs.readFileSync("student&mentor.json", "utf-8", (err, data) => {
    console.log(data);
  })
);

//display all students
app.get("/students", (req, res) => {
  res.json(studentlist);
});

//display all mentors
app.get("/mentors", (req, res) => {
  res.json(mentorlist);
});

//display assgning details
app.get("/students/mentors", (req, res) => {
  res.json(studment);
});

//add a student
app.post("/student", (req, res) => {
  try {
    var addstud = {
      name: req.body.name,
      rollno: req.body.rollno,
      standard: req.body.standard,
    };
    studentlist.push(addstud);
    fs.writeFileSync("student.json", JSON.stringify(studentlist));
    res.json({
      message: "student added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "cannot able to add student",
    });
  }
});

//add a mentor
app.post("/mentor", (req, res) => {
  try {
    var addmentor = {
      name: req.body.name,
      staffid: req.body.staffid,
      students: req.body.students,
    };
    mentorlist.push(addmentor);
    fs.writeFileSync("mentor.json", JSON.stringify(mentorlist));
    mentorsstud = [];
    res.json({
      message: "mentor added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "cannot able to add mentor",
    });
  }
});

//assigning students with mentor
app.post("/student/mentor", (req, res) => {
  try {
    studment = [];
    for (var i in mentorlist) {
      for (var j in studentlist) {
        for (var k in mentorlist[i].students) {
          if (mentorlist[i].students[k] == studentlist[j].rollno) {
            var a = studentlist[j].name;
            var b = studentlist[j].rollno;
            var c = mentorlist[i].name;
            var d = mentorlist[i].staffid;
            var adddata = {
              stud_name: a,
              stud_rollno: b,
              mentor_name: c,
              mentor_staffid: d,
            };
            studment.push(adddata);
            console.log(a, b);
          }
        }
      }
    }
    fs.writeFileSync("student&mentor.json", JSON.stringify(studment));
    res.json({
      message: "added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "something wrong",
    });
  }
});

//run server
app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
