fetch("routine.json")
.then(res => res.json())
.then(data => {

const today = new Date().toLocaleString('en-US', { weekday: 'long' });
const now = new Date();

document.getElementById("day").innerText = today;

const todayClasses = data[today] || [];

let nextClass = null;
let currentClass = null;

const scheduleDiv = document.getElementById("schedule");

if(todayClasses.length === 0){
    scheduleDiv.innerHTML = "🎉 No classes today";
    return;
}

todayClasses.forEach(c => {

    const start = new Date();
    const end = new Date();

    const [sh, sm] = c.start.split(":");
    const [eh, em] = c.end.split(":");

    start.setHours(sh, sm, 0);
    end.setHours(eh, em, 0);

    let classBox = document.createElement("div");
    classBox.classList.add("class");

    classBox.innerHTML = `
        <strong>${c.course}</strong><br>
        ${c.start} - ${c.end}<br>
        Room: ${c.room}
    `;

    if(now >= start && now <= end){
        classBox.classList.add("current");
        currentClass = c;
    }

    if(start > now && !nextClass){
        nextClass = c;
    }

    scheduleDiv.appendChild(classBox);

});

if(currentClass){
    document.getElementById("current").innerText =
    "🟢 Current Class: " + currentClass.course + " (" + currentClass.start + "-" + currentClass.end + ")";
}

if(nextClass){
    document.getElementById("next").innerText =
    "⏰ Next Class: " + nextClass.course + " at " + nextClass.start;
}
else{
    document.getElementById("next").innerText =
    "🎉 No more classes today";
}

});
