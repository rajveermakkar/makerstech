document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            const navbar = document.querySelector('.navbar');
            const body = document.body;
            const pageType = body.getAttribute('data-page');
            const navbarToggler = document.querySelector('.navbar-toggler');

            const handleScroll = () => {
                const heroHeight = pageType === "categories" ? 50 : document.querySelector('.hero').offsetHeight;
                if (window.scrollY > heroHeight) {
                    navbar.classList.remove('navbar-transparent');
                    navbar.classList.add('navbar-white');
                } else {
                    navbar.classList.remove('navbar-white');
                    navbar.classList.add('navbar-transparent');
                }
            };

            if (pageType === "transparent" || pageType === "categories") {
                window.addEventListener('scroll', handleScroll);
                // Initial check
                handleScroll();
            } else {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-white');
            }

            // Event listener for the navbar toggler button
            navbarToggler.addEventListener('click', function() {
                if (!navbar.classList.contains('navbar-white')) {
                    navbar.classList.add('navbar-white');
                    navbar.classList.remove('navbar-transparent');
                }
            });

            // Ensure navbar stays white when the menu is expanded
            const navmenu = document.getElementById('navmenu');
            navmenu.addEventListener('show.bs.collapse', function () {
                navbar.classList.add('navbar-white');
                navbar.classList.remove('navbar-transparent');
            });
            navmenu.addEventListener('hide.bs.collapse', function () {
                if (window.scrollY <= (pageType === "categories" ? 50 : document.querySelector('.hero').offsetHeight)) {
                    navbar.classList.remove('navbar-white');
                    navbar.classList.add('navbar-transparent');
                }
            });
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });
});
