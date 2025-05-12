document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // If we're on the gallery page
    if (galleryContainer) {
        loadGallery();
    }

    // Handle any smooth scrolling or other animations
    animateOnScroll();
    
    // Set up modal functionality
    setupModal();
});

// Set up the modal functionality
function setupModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close the modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Close the modal when clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close the modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Generate the gallery grid
function loadGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Create an array with numbers 1-52
    const imageNumbers = Array.from({ length: 52 }, (_, i) => i + 1);
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = imageNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
    }
    
    // Generate items for all 52 images in random order
    imageNumbers.forEach(imageNumber => {
        // Create a gallery item
        const item = document.createElement('div');
        
        // Determine size class (make some images larger or wider/taller)
        // This creates an interesting asymmetrical grid
        if (imageNumber % 12 === 0) {
            item.className = 'gallery-item large'; // Extra large (spans 2x2)
        } else if (imageNumber % 7 === 0) {
            item.className = 'gallery-item wide'; // Wide (spans 2x1)
        } else if (imageNumber % 5 === 0) {
            item.className = 'gallery-item tall'; // Tall (spans 1x2)
        } else {
            item.className = 'gallery-item'; // Regular size
        }
        
        // Add a random aspect ratio variation for more visual interest
        const aspectRatios = ['3/4', '4/5', '1/1', '4/3'];
        const randomRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
        item.style.setProperty('--aspect-ratio', randomRatio);
        
        // Create the image
        const img = document.createElement('img');
        img.loading = 'lazy'; // Use lazy loading for better performance
        img.src = `images/alo-${imageNumber}.jpg`;
        img.alt = `Photo ${imageNumber}`;
        
        // Make image clickable to open fullscreen view
        item.addEventListener('click', () => {
            openFullScreenImage(`alo-${imageNumber}.jpg`);
        });
        
        // Add the image to the item
        item.appendChild(img);
        
        // Add the item to the gallery
        galleryContainer.appendChild(item);
    });
}

// Open the image in fullscreen modal with download button
function openFullScreenImage(imageName) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Set image source
    modalImage.src = `images/${imageName}`;
    modalImage.alt = imageName;
    
    // Set up download button
    downloadBtn.href = `images/${imageName}`;
    downloadBtn.download = imageName;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Add some animation for elements as they scroll into view
function animateOnScroll() {
    // Simple fade-in animation for gallery items as they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Apply animation to gallery items with a slight delay for each
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            // Set initial state (will be animated in by the observer)
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.05}s`;
            
            // Observe the item
            observer.observe(item);
        });
    }, 100);
}

// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 