//This is to store the semester units, points and gpa.
let currentTotalUnits = 0;
let currentTotalPoints = 0;
let currentGPA = 0;

const storeCourse = [];
const storeSemester = [];

const showResult = document.querySelector('.js-result');

const getCourse = document.querySelector('.js-course-code');
const getUnit = document.querySelector('.js-course-unit');
const getScore = document.querySelector('.js-score');

const semesterName = document.querySelector('.js-semester-name');

const addCoursebtn = document.querySelector('.js-add-course');
addCoursebtn.addEventListener('click', addCourse);

const calculateGPAbtn = document.querySelector('.js-calculate-gpa');
calculateGPAbtn.addEventListener('click', calculateGPA);

const saveSemesterbtn = document.querySelector('.js-save-semester');
saveSemesterbtn.addEventListener('click', saveSemester);

const calculateCGPAbtn = document.querySelector('.js-calculate-cgpa');
calculateCGPAbtn.addEventListener('click', calculateCGPA);

const resetAllbtn = document.querySelector('.js-reset-all');
resetAllbtn.addEventListener('click', resetAll);

function addCourse() {
  const courseCode = getCourse.value.trim();
  const unit = Number(getUnit.value);
  const score = Number(getScore.value);

  const rawScore = getScore.value;
  const courseUnit = getUnit.value;

  showResult.innerHTML = '';

 //This is for Validation. 
  if(courseCode === '' || courseUnit === '' || unit < 0 || rawScore === '' || score < 0 || score > 100) {
    showResult.innerHTML = 'Please enter valid Inputs';
    return;
  }

//This determines the grade and point.
  let grade = "";
  let point = 0;
  if(score >= 70) {
    grade = "A";
    point = 5;
  } else if(score >= 60) {
    grade = "B";
    point = 4;
  } else if(score >= 50) {
    grade = "C";
    point = 3;
  } else if(score >= 45) {
    grade = "D";
    point = 2;
  } else if(score >= 40) {
    grade = "E";
    point = 1;
  } else if(score >= 0) {
    grade = "F";
    point = 0;
  }

  //Add course record to the empty storage.
  storeCourse.push({
    code: courseCode,
    unit: unit,
    score: score,
    grade: grade,
    point: point
  });

  //Final result
  //showResult.innerHTML = `Course code: ${courseCode} | Unit: ${courseUnit} | Score: ${score} | Grade: ${grade} | Point: ${point}`;

  let tableHTML = `
  <table border = "1">
  <thead>
  <tr>
  <th>Course code</th>
  <th>Unit</th>
  <th>Score</th>
  <th>Grade</th>
  <th>Point</th>
  </tr>
  </thead>`;

  storeCourse.forEach((course) => {
    tableHTML += `
    <tbody>
    <tr>
    <td>${course.code}</td>
    <td>${course.unit}</td>
    <td>${course.score}</td>
    <td>${course.grade}</td>
    <td>${course.point}</td>
    </tr>
    </tbody>`;
  });

  tableHTML += `</table>`;

  showResult.innerHTML = tableHTML;

//This is to clear the inputs
getCourse.value = '';
getUnit.value = '';
getScore.value = '';
}

function calculateGPA() {
  //Validation for no course added and want to calculate GPA.
  if(storeCourse.length === 0) {
    alert("Please add some course");
    return;
  }

  let totalUnits = 0;
  let totalPoints = 0;

  //Calculating the totalunits and totalPoints using the stored courses.Loop through each stored course
  storeCourse.forEach((course) => {
    totalUnits += course.unit;
    totalPoints += course.unit * course.point;
  });

  //Calculating GPA
  const gpa = totalPoints / totalUnits
  //showResult.innerHTML = `GPA: ${gpa.toFixed(2)}`;

  //This is to update the semester memory
  currentTotalUnits = totalUnits;
  currentTotalPoints = totalPoints;
  currentGPA = gpa;

  //Final result
  showResult.innerHTML = `Total Units: ${totalUnits} | Total Points: ${totalPoints} | GPA: ${gpa.toFixed(2)}`;
}

//Storing the semester total units and total points after calculating the GPA
function saveSemester() {
const name = semesterName.value.trim();

//This is to validate if GPA exist and if semestername is empty.
if(currentTotalUnits === 0 || name === '') {
  //alert("Please enter semester name before saving");
  return;
}

//Save semester
storeSemester.push({
  name: name,
  courses: [...storeCourse],//this copies all the courses added
  totalUnits: currentTotalUnits,
  totalPoints: currentTotalPoints,
  gpa: currentGPA
});

//Display the result
//showResult.innerHTML = `Semester: ${name} | Total Units: ${currentTotalUnits} | Total Points: ${currentTotalPoints} | GPA: ${currentGPA.toFixed(2)}`;

let tableHTML = '';
storeSemester.forEach((semester) => {
 tableHTML += `<h4>${semester.name}</h4>`;
tableHTML += `
  <table border = "1">
  <thead>
  <tr>
  <th>Course code</th>
  <th>Unit</th>
  <th>Score</th>
  <th>Grade</th>
  <th>Point</th>
  </tr>
  </thead>
  <tbody>`;

  semester.courses.forEach((course) => {
    tableHTML += `
    <tr>
    <td>${course.code}</td>
    <td>${course.unit}</td>
    <td>${course.score}</td>
    <td>${course.grade}</td>
    <td>${course.point}</td>
    </tr>
    `;
  });

  tableHTML += `
  </tbody>
  </table>
  <div class="semester-summary">
      <p><strong>Total Units:</strong> ${semester.totalUnits}</p>
      <p><strong>Total Points:</strong> ${semester.totalPoints}</p>
      <p><strong>GPA:</strong> ${semester.gpa.toFixed(2)}</p>
    </div>
    <hr>`;
  });
    showResult.innerHTML = tableHTML;

//This is to reset the saved semester for next semester.
storeCourse.length = 0; //This clear the courses.
currentTotalUnits = 0;
currentTotalPoints = 0;
currentGPA = 0;

//Clear inputs
semesterName.value = '';
//displaySavedSemesters();
}

//This displays the savedsemesters.
/*function displaySavedSemesters() {
  showResult.innerHTML = '';

  storeSemester.forEach((semester, index) => {
  showResult.innerHTML += `
  ${index + 1}.Semester: ${semester.name} | GPA: ${semester.gpa.toFixed(2)} <br> <br>`;
  });
 }*/

function calculateCGPA() {
  //Validation if the student didnot save any semester before calculating the CGPA.
  if(storeSemester.length === 0) {
    alert("No saved semester");
    return;
  }

  let totalPoints = 0;
  let totalUnits = 0;

  //Loop through semesters saved.
  storeSemester.forEach((semester) => {
   totalUnits += semester.totalUnits;
   totalPoints += semester.totalPoints;
  });

  //Calculate CGPA
  const cgpa = totalPoints / totalUnits;

  //Result
  //showResult.innerHTML = `Total Units: ${totalUnits} | Total Points: ${totalPoints} | CGPA: ${cgpa.toFixed(2)}`;

  showResult.innerHTML = `CGPA: ${cgpa.toFixed(2)} <br> <br>`

  storeSemester.forEach((semester) => {
  showResult.innerHTML += `
  Semester: ${semester.name} | GPA: ${semester.gpa.toFixed(2)} <br> <br>`;
  });

//This is to reset the saved semester for next semester.
storeCourse.length = 0; //This clear the courses.
currentTotalUnits = 0;
currentTotalPoints = 0;
currentGPA = 0;
}

function resetAll() {
  // Clear stored data
  storeCourse.length = 0;
  storeSemester.length = 0;

  // Reset current semester memory
  currentTotalUnits = 0;
  currentTotalPoints = 0;
  currentGPA = 0;

  // Clear result
  showResult.innerHTML = 'All data has been reset.';

  // Clear inputs
  getCourse.value = '';
  getUnit.value = '';
  getScore.value = '';
  semesterName.value = '';
}
