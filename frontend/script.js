document.addEventListener("DOMContentLoaded", () => {
    
    // --- Theme Management (Dark Mode) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('hospitalTheme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('hospitalTheme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // --- Sidebar Toggle ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggle');

    sidebarToggleBtn.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            // Mobile off-canvas menu toggle
            sidebar.classList.toggle('mobile-open');
        } else {
            // Desktop collapse
            sidebar.classList.toggle('collapsed');
        }
    });

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggleBtn.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
        }
    });

});

// --- Tab/Section Navigation ---
function switchTab(tabId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show target section
    const targetSection = document.getElementById(tabId);
    if(targetSection) {
        targetSection.classList.add('active');
    }

    // Update active state on sidebar links
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find the clicked li and add active class (based on onclick attribute mapping)
    event.currentTarget.classList.add('active');
    
    // Auto-close mobile sidebar after navigation
    const sidebar = document.getElementById('sidebar');
    if(window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
    }
}

// --- Patient Table Search Filter ---
function filterPatients() {
    const input = document.getElementById("patientSearch");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("patientTable");
    const tr = table.getElementsByTagName("tr");

    // Loop through all table rows, hide those who don't match the search query
    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip header row
        let td = tr[i].getElementsByTagName("td")[1]; // Target the 'Name' column (Index 1)
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

// --- Modal Controls ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal if user clicks on the dark overlay outside the modal box
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}