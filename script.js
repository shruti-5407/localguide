document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonial-carousel');
    let isHovered = false;

    // Pause animation on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            isHovered = true;
            carousel.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('mouseleave', () => {
            isHovered = false;
            carousel.style.animationPlayState = 'running';
    });
}


    // Lazy loading for images with .lazy class
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src; // If using data-src, otherwise just load
                img.classList.add('loaded');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Generic form validation for .theme-form
    document.querySelectorAll('.theme-form').forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }

            if (!isValid) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    });

    // Category search/filter functionality
    const searchInput = document.getElementById('shopSearch');
    if (searchInput) {
        const shopBoxes = document.querySelectorAll('.category-box');
        searchInput.addEventListener('keyup', function () {
            const query = this.value.toLowerCase();
            shopBoxes.forEach(box => {
                const text = box.textContent.toLowerCase();
                box.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
});

// for send notification messege to shop owner


// Functionality for Notification Section
const notificationForm = document.getElementById('notificationForm');
if (notificationForm) {
    notificationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get input values
        const userName = document.getElementById('userName').value.trim();
        const userQuery = document.getElementById('userQuery').value.trim();

        // Validate inputs
        if (!userName || !userQuery) {
            alert('Please fill out both fields before sending the notification.');
            return;
        }

        // Display success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.textContent = `Notification sent successfully by ${userName}!`;

            // Clear the form inputs
            document.getElementById('userName').value = '';
            document.getElementById('userQuery').value = '';

            // Hide the success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// Functionality for Reviews & Ratings Section
const submitReviewBtn = document.getElementById('submitReview');
if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', function () {
        // Get input values
        const userName = document.getElementById('userName').value.trim();
        const userReview = document.getElementById('userReview').value.trim();
        const userRating = document.getElementById('userRating').value;

        // Validate inputs
        // if (!userName || !userReview || !userRating) {
        //     alert('Please fill out all fields before submitting your review.');
        //     return;
        // }

        // Create a new review element dynamically
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <p><strong>${userName}:</strong> ${userReview}</p>
            <span class="rating">Rating: ${'⭐'.repeat(Number(userRating))}</span>
        `;

        // Append the new review above the form
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsList) {
            reviewsList.appendChild(reviewElement);

            // Scroll to the newly added review
            reviewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Clear the form inputs
            document.getElementById('userName').value = '';
            document.getElementById('userReview').value = '';
            document.getElementById('userRating').value = '5'; // Reset to default rating
        }
    });
}



