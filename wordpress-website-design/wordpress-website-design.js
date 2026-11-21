(function () {
    "use strict";

    const visual = document.querySelector(".visual-window");
    const hero = document.querySelector(".service-hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".navbar-collapse a.nav-link, .navbar-collapse .dropdown-item").forEach(function (link) {
        link.addEventListener("click", function () {
            const menu = document.querySelector(".navbar-collapse.show");
            if (!menu || typeof bootstrap === "undefined") return;
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        });
    });

    const revealItems = document.querySelectorAll(
        ".service-eyebrow, .service-hero h1, .service-hero-text, .service-hero-actions, " +
        ".service-hero-note, .service-hero-visual, .section-kicker, .section-heading h2, " +
        ".section-heading p, .audience-item, .offering-item, .why-list > div, .service-cta-inner"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && !reducedMotion) {
        const observer = new IntersectionObserver(function (entries, instance) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                instance.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    if (visual && hero && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
        hero.addEventListener("mousemove", function (event) {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            visual.style.transform =
                "rotateY(" + (-7 + x * 5).toFixed(2) + "deg) rotateX(" + (2 - y * 4).toFixed(2) + "deg)";
        });

        hero.addEventListener("mouseleave", function () {
            visual.style.transform = "rotateY(-7deg) rotateX(2deg)";
        });
    }
})();
