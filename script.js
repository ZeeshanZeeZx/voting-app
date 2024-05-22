const adminCredentials = {
    name: "admin",
    password: "password123"
};

document.getElementById('registerButton').addEventListener('click', function() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
});

document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const number = document.getElementById('regNumber').value;

    let students = JSON.parse(localStorage.getItem('students')) || {};
    if (students[number]) {
        alert('Student number already registered.');
    } else {
        students[number] = { name, voted: false };
        localStorage.setItem('students', JSON.stringify(students));
        alert('Registration successful!');
        document.getElementById('registrationForm').reset();
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('loginName').value;
    const number = document.getElementById('loginNumber').value;

    let students = JSON.parse(localStorage.getItem('students')) || {};
    if (students[number] && students[number].name === name) {
        if (students[number].voted) {
            alert('You have already voted!');
        } else {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('voteForm').style.display = 'block';
            displayTopics();
        }
    } else {
        alert('Student not registered or invalid credentials.');
    }
});

document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedTopic = document.querySelector('input[name="topic"]:checked').value;
    const number = document.getElementById('loginNumber').value;

    let students = JSON.parse(localStorage.getItem('students')) || {};
    students[number].voted = true;
    localStorage.setItem('students', JSON.stringify(students));

    alert(`You voted for: ${selectedTopic}`);
    document.getElementById('voteForm').reset();
    document.getElementById('voteForm').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
});

document.getElementById('adminLoginLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('adminLoginForm').style.display = 'block';
});

document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const adminName = document.getElementById('adminName').value;
    const adminPassword = document.getElementById('adminPassword').value;

    if (adminName === adminCredentials.name && adminPassword === adminCredentials.password) {
        document.getElementById('adminLoginForm').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
    } else {
        alert('Invalid admin credentials!');
    }
});

document.getElementById('publishTopicForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTopic = document.getElementById('newTopic').value;

    let topics = JSON.parse(localStorage.getItem('topics')) || [];
    topics.push(newTopic);
    localStorage.setItem('topics', JSON.stringify(topics));

    alert('New topic published!');
    displayTopics();
    resetVotes();
    document.getElementById('publishTopicForm').reset();
});

document.getElementById('clearTopicsButton').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all topics?')) {
        localStorage.removeItem('topics');
        alert('All topics have been cleared!');
        displayTopics();
        resetVotes();
    }
});

function displayTopics() {
    const topicsDiv = document.getElementById('topics');
    topicsDiv.innerHTML = '';
    let topics = JSON.parse(localStorage.getItem('topics')) || [];
    topics.forEach(topic => {
        const topicHtml = `<label><input type="radio" name="topic" value="${topic}"> ${topic}</label>`;
        topicsDiv.innerHTML += topicHtml;
    });
}

function resetVotes() {
    let students = JSON.parse(localStorage.getItem('students')) || {};
    for (let number in students) {
        students[number].voted = false;
    }
    localStorage.setItem('students', JSON.stringify(students));
}
