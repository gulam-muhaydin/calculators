document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdownButtons = document.querySelectorAll('.nav-button');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Automatically open the Calculators dropdown when menu is opened
        if (navMenu.classList.contains('active')) {
            const calculatorsDropdown = document.querySelector('.dropdown-content');
            if (calculatorsDropdown) {
                calculatorsDropdown.classList.add('active');
            }
        }
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        // Close all dropdowns
        dropdownContents.forEach(content => content.classList.remove('active'));
    });

    // Handle dropdown toggles
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const content = this.nextElementSibling;
                // Close other dropdowns
                dropdownContents.forEach(item => {
                    if (item !== content) {
                        item.classList.remove('active');
                    }
                });
                content.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Close all dropdowns
            dropdownContents.forEach(content => content.classList.remove('active'));
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Close all dropdowns
            dropdownContents.forEach(content => content.classList.remove('active'));
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Close all dropdowns
            dropdownContents.forEach(content => content.classList.remove('active'));
        }
    });
}); 