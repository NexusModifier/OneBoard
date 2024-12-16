// Array of random messages
const messages = [
    "What's on your mind?",
    "Something for later?",
    "Come on... it'll only take a second...",
    "I know all your dirty secrets",
    "ADHD much?",
    "Thing's are getting sticky around here",
    "Oh... I see you're back ;)"
];

// Function to display a random message with typing effect
function displayRandomMessage() {
    const messageElement = document.getElementById('stickyMessage');
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = ''; // Clear previous text content

    let i = 0;

    // Typing animation
    const typingInterval = setInterval(function() {
        messageElement.textContent += randomMessage[i];
        i++;
        if (i === randomMessage.length) {
            clearInterval(typingInterval); // Stop once the message is fully typed
        }
    }, 75); // Adjust typing speed (in milliseconds)
}

// Function to toggle the visibility of the sticky notes container with slide effect
function toggleStickyNotes() {
    const stickyNotesContainer = document.getElementById('stickyNotesContainer');

    // Toggle visibility by changing the right position for the sliding effect
    if (stickyNotesContainer.style.display === 'block') {
        stickyNotesContainer.style.right = '-25%'; // Slide out
        setTimeout(() => {
            stickyNotesContainer.style.display = 'none'; // Hide after animation
        }, 500); // Wait for the animation duration to complete
    } else {
        stickyNotesContainer.style.display = 'block'; // Show the container
        setTimeout(() => {
            stickyNotesContainer.style.right = '0'; // Slide in
            displayRandomMessage(); // Show a new random message when opening
        }, 10); // Small delay to trigger the transition
    }
}

// Close sticky notes when clicking outside the container
document.addEventListener('click', function(event) {
    const stickyNotesContainer = document.getElementById('stickyNotesContainer');
    const sidebar = document.querySelector('.sidebar');

    // Check if the click was outside the sticky notes container and sidebar
    if (!stickyNotesContainer.contains(event.target) && !sidebar.contains(event.target)) {
        // If true, close the sticky notes container
        stickyNotesContainer.style.right = '-25%'; // Slide out
        setTimeout(() => {
            stickyNotesContainer.style.display = 'none'; // Hide after animation
        }, 500);
    }
});

// Function to load pages into the content container
function loadPage(page) {
    const content = document.getElementById('content');

    switch (page) {
        case 'home':
            content.innerHTML = '';
            break;
        case 'groups':
            content.innerHTML = `
                <div class="groups-container">
                        <img src="waiting.gif" alt="UNO Logo" class="funnygif">
                        <h2>Groups</h2>
                        <p>This content is unavailable. We assure you groups will be up and running soon!</p>
                </div>
            `;
            break;
        case 'todo':
            content.innerHTML = `
                <div class="todo-container">
                    <div class="todo-item">
                        <h1>Incomplete</h1>
                                <button class="plus-button" onclick="openTodoModal()">+</button>
        <div class="lists-container" id="todoListsContainer">
            <!-- Grid for Todo Lists -->
        </div>
                    </div>
                    <div class="todo-item">
                        <h1>In Progress</h1>
                    </div>
                    <div class="todo-item">
                        <h1>Complete</h1>
                    </div>
                </div>
            `;
            break;
        case 'projects':
            content.innerHTML = `
                <div class="task-container">
                    <div class="task-item">
                        <h1>Incomplete</h1>
                                                    <button class="plus-button" onclick="openProjectModal()">+</button>
                            <div class="projects-container" id="taskProjectsContainer">
                                <!-- Grid for Projects -->
                            </div>
                    </div>
                    <div class="task-item">
                        <h1>In Progress</h1>
                    </div>
                    <div class="task-item">
                        <h1>Complete</h1>
                    </div>
                </div>
            `;
            break;
        case 'calendar':
            content.innerHTML = `
                    <div class="calendar">
        <div class="calendar-header">
            <button id="prevMonth">&#9664;</button>
            <h2 id="monthYear">Month Year</h2>
            <button id="nextMonth">&#9654;</button>
        </div>
        <div class="calendar-body">
            <div class="days" id="days"></div>
        </div>
    </div>

    <!-- Modal for adding events -->
    <div class="modal" id="eventModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Event</h3>
                <button class="close-btn" id="closeModal">X</button>
            </div>
            <div class="modal-body">
                <label for="eventTitle">Event Title:</label>
                <input type="text" id="eventTitle" placeholder="Enter event title" style="width: 100%;">
                <label for="eventReminder">Set Reminder (optional):</label>
                <input type="datetime-local" id="eventReminder" style="width: 100%;">
            </div>
            <div class="modal-footer">
                <button class="save-btn" id="saveEvent">Save</button>
            </div>
        </div>
    </div>
            `;
            break;
        case 'timer':
            content.innerHTML = `
                <div class="timer-container">
                    <div class="timer-one">
                        <h1>Stopwatch</h1>
                    </div>
                    <div class="timer-two">
                        <h1>Pomodoro Clock</h1>
                    </div>
                </div>
            `;
            break;
        default:
            content.innerHTML = '<h2>Welcome to UNO</h2><p>Select an option from the sidebar to get started.</p>';
    }
}


// Function to toggle between light and dark mode (existing code)
function toggleMode() {
    const body = document.body;
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');
    const sticky = document.querySelector('.sticky-notes-container')
    const logo = document.querySelector('.logo');
    const modeButton = document.getElementById('modeButton');

    // Toggle dark mode class
    body.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode');
    content.classList.toggle('dark-mode'); // If you want the content to adapt too
    sticky.classList.toggle('dark-mode'); // If you want the content to adapt too

    // Toggle logo image between light and dark mode
    if (body.classList.contains('dark-mode')) {
        logo.classList.add('dark-logo'); // Set the logo to "uno3.jpg"
    } else {
        logo.classList.remove('dark-logo'); // Set the logo back to default
    }

    // Optionally, change the icon in the Mode button
    if (body.classList.contains('dark-mode')) {
        modeButton.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'; // Change to light mode icon
    } else {
        modeButton.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode'; // Change to dark mode icon
    }
}

// Automatically load the home page when the script is loaded (existing code)
window.onload = function() {
    loadPage('home');
};


   // Function to open the Todo Modal
   function openTodoModal() {
    document.getElementById('todoModal').style.display = 'flex';
}

// Function to close the Todo Modal
function closeTodoModal() {
    document.getElementById('todoModal').style.display = 'none';
}

// Function to add a Todo list
function addTodoList() {
    const todoListsContainer = document.getElementById('todoListsContainer');
    const selectedList = Array.from(document.querySelectorAll('#todoModal input[type="checkbox"]:checked')).map(input => input.id);
    
    selectedList.forEach(list => {
        const card = document.createElement('div');
        card.classList.add('list-card');
        card.textContent = list.charAt(0).toUpperCase() + list.slice(1);
        todoListsContainer.appendChild(card);
    });

    closeTodoModal();
}

// Function to open the Project Modal
function openProjectModal() {
    document.getElementById('projectModal').style.display = 'flex';
}

// Function to close the Project Modal
function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Function to add a Project
function addProject() {
    const taskProjectsContainer = document.getElementById('taskProjectsContainer');
    const selectedProject = Array.from(document.querySelectorAll('#projectModal input[type="checkbox"]:checked')).map(input => input.id);
    
    selectedProject.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.textContent = project.charAt(0).toUpperCase() + project.slice(1);
        taskProjectsContainer.appendChild(card);
    });

    closeProjectModal();
}

// Close modal if clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('todoModal')) {
        closeTodoModal();
    } else if (event.target === document.getElementById('projectModal')) {
        closeProjectModal();
    }
});