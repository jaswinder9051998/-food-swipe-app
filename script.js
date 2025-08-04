// Data
const imageFiles = ["IMG-20241219-WA0010.jpg", "IMG-20241219-WA0011.jpg", "IMG-20241222-WA0000.jpg", "IMG-20241222-WA0001.jpg", "IMG-20241223-WA0010.jpg", "IMG-20241224-WA0000.jpg", "IMG-20241224-WA0001.jpg", "IMG-20241225-WA0019.jpg", "IMG-20241225-WA0020.jpg", "IMG-20250103-WA0013.jpg", "IMG-20250103-WA0014.jpg", "IMG-20250106-WA0009.jpg", "IMG-20250108-WA0001.jpg", "IMG-20250108-WA0003.jpg", "IMG-20250109-WA0008.jpg", "IMG-20250111-WA0012.jpg", "IMG-20250111-WA0014.jpg", "IMG-20250112-WA0022.jpg", "IMG-20250112-WA0023.jpg", "IMG-20250112-WA0024.jpg", "IMG-20250112-WA0025.jpg", "IMG-20250112-WA0026.jpg", "IMG-20250114-WA0006.jpg", "IMG-20250115-WA0000.jpg", "IMG-20250119-WA0004.jpg", "IMG-20250120-WA0001.jpg", "IMG-20250121-WA0006.jpg", "IMG-20250121-WA0007.jpg", "IMG-20250123-WA0001.jpg", "IMG-20250126-WA0001.jpg", "IMG-20250202-WA0000.jpg", "IMG-20250203-WA0011.jpg", "IMG-20250205-WA0000.jpg", "IMG-20250209-WA0001.jpg", "IMG-20250209-WA0002.jpg", "IMG-20250210-WA0003.jpg", "IMG-20250210-WA0009.jpg", "IMG-20250213-WA0013.jpg", "IMG-20250216-WA0002.jpg", "IMG-20250220-WA0007.jpg", "IMG-20250221-WA0003.jpg", "IMG-20250223-WA0001.jpg", "IMG-20250224-WA0008.jpg", "IMG-20250227-WA0000.jpg", "IMG-20250228-WA0000.jpg", "IMG-20250302-WA0008.jpg", "IMG-20250304-WA0005.jpg", "IMG-20250321-WA0003.jpg", "IMG-20250326-WA0026.jpeg", "IMG-20250330-WA0008.jpg", "IMG-20250330-WA0009.jpg", "IMG-20250330-WA0010.jpg", "IMG-20250401-WA0011.jpg", "IMG-20250402-WA0001.jpg", "IMG-20250404-WA0011.jpg", "IMG-20250404-WA0027.jpg", "IMG-20250407-WA0001.jpg", "IMG-20250416-WA0000.jpg", "IMG-20250424-WA0006.jpg", "IMG-20250507-WA0015.jpg", "IMG-20250508-WA0002.jpg", "IMG-20250509-WA0040.jpg", "IMG-20250512-WA0000.jpg", "IMG-20250515-WA0003.jpg", "IMG-20250516-WA0022.jpg", "IMG-20250522-WA0004.jpg", "IMG-20250523-WA0008.jpg", "IMG-20250523-WA0020.jpg", "IMG-20250524-WA0000.jpg", "IMG-20250530-WA0000.jpg", "IMG-20250530-WA0005.jpg", "IMG-20250531-WA0001.jpg", "IMG-20250531-WA0015.jpg", "IMG-20250602-WA0019.jpg", "IMG-20250604-WA0003.jpg", "IMG-20250605-WA0012.jpg", "IMG-20250606-WA0006.jpg", "IMG-20250606-WA0007.jpg", "IMG-20250615-WA0003.jpg", "IMG-20250615-WA0004.jpg", "IMG-20250618-WA0011.jpg", "IMG-20250619-WA0007.jpg", "IMG-20250620-WA0001.jpg", "IMG-20250620-WA0009.jpg", "IMG-20250621-WA0013.jpg", "IMG-20250624-WA0000.jpg", "IMG-20250624-WA0001.jpg", "IMG-20250624-WA0002.jpg", "IMG-20250625-WA0000.jpg", "IMG-20250626-WA0000.jpg", "IMG-20250627-WA0012.jpg", "IMG-20250628-WA0000.jpg", "IMG-20250629-WA0004.jpg", "IMG-20250629-WA0014.jpg", "IMG-20250630-WA0000.jpg", "IMG-20250630-WA0009.jpg", "IMG-20250702-WA0012.jpg", "IMG-20250708-WA0011.jpg", "IMG-20250709-WA0002.jpg", "IMG-20250715-WA0324.jpg", "IMG-20250719-WA0038.jpg", "IMG-20250722-WA0024.jpg", "IMG-20250725-WA0014.jpg", "IMG-20250727-WA0007.jpg", "IMG-20250728-WA0041.jpg", "IMG-20250730-WA0011.jpg", "IMG-20250801-WA0015.jpg"];

function prettifyFilename(file) {
    return file.replace(/\.[^.]+$/, "");
}

const dishes = imageFiles.map((file, index) => ({
    id: index + 1,
    name: prettifyFilename(file),
    image: `images/optimized/${file}`
}));

let likedDishes = [];
let currentDishIndex = 0;

// DOM Elements
const cardContainer = document.getElementById('card-container');
const dishName = document.getElementById('dish-name');
const card = document.getElementById('card');
const sortBtn = document.getElementById('sort');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const resultsContainer = document.getElementById('results-container');
const likedDishesContainer = document.getElementById('liked-dishes');

// Functions
function loadDish(index) {
    if (index < dishes.length) {
        dishName.textContent = dishes[index].name;
        
        // Reset card position and fade in new image
        card.style.transition = 'none';
        card.style.transform = 'translateX(0) rotate(0deg)';
        card.style.opacity = '0';
        
        // Load new image
        card.style.backgroundImage = `url('${dishes[index].image}')`;
        
        // Fade in with slight delay
        setTimeout(() => {
            card.style.transition = 'opacity 0.2s ease';
            card.style.opacity = '1';
        }, 50);
        
        preloadImages(index + 1, 3);
    } else {
        dishName.textContent = "No more dishes!";
        card.style.backgroundImage = 'none';
        card.style.opacity = '1';
    }
}

let isDragging = false;
let startX = 0;
let currentX = 0;

// Preload helper: quietly start downloading upcoming images so they are in cache
function preloadImages(startIndex, count) {
    for (let i = startIndex; i < startIndex + count && i < dishes.length; i++) {
        const img = new Image();
        img.src = dishes[i].image;
    }
}

function getPointerX(evt) {
    if (evt.touches && evt.touches.length) {
        return evt.touches[0].clientX;
    }
    if (evt.changedTouches && evt.changedTouches.length) {
        return evt.changedTouches[0].clientX;
    }
    return evt.clientX;
}

function handleSwipe(event) {
    isDragging = true;
    startX = getPointerX(event);
    // Prevent scrolling while swiping on touch devices
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    card.style.transition = 'none'; // Disable transition during drag
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
}

function drag(event) {
    if (!isDragging) return;
    currentX = getPointerX(event) - startX;
    if (event.type === 'touchmove') {
        event.preventDefault();
    }
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
}

function dragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', dragEnd);

    card.style.transition = 'transform 0.3s ease'; // Re-enable transition

    if (currentX > 100) { // Swiped right
        // Animate card flying off to the right
        card.style.transform = 'translateX(100vw) rotate(30deg)';
        likedDishes.push(dishes[currentDishIndex]);
        currentDishIndex++;
        setTimeout(() => loadDish(currentDishIndex), 300);
    } else if (currentX < -100) { // Swiped left
        // Animate card flying off to the left
        card.style.transform = 'translateX(-100vw) rotate(-30deg)';
        currentDishIndex++;
        setTimeout(() => loadDish(currentDishIndex), 300);
    } else {
        // Snap back to center
        card.style.transform = 'translateX(0) rotate(0deg)';
    }
    
    currentX = 0;
}

function stopSwiping() {
    cardContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    likedDishesContainer.innerHTML = '';
    likedDishes.forEach(dish => {
        const img = document.createElement('img');
        img.src = dish.image;
        img.alt = dish.name;
        img.className = 'liked-image';
        likedDishesContainer.appendChild(img);
    });
}

function resetApp() {
    likedDishes = [];
    currentDishIndex = 0;
    resultsContainer.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    loadDish(currentDishIndex);
}

function sortDishes() {
    dishes.sort(() => Math.random() - 0.5);
    currentDishIndex = 0;
    loadDish(currentDishIndex);
}

// Event Listeners
card.addEventListener('mousedown', handleSwipe);
card.addEventListener('touchstart', handleSwipe, { passive: false });

stopBtn.addEventListener('click', stopSwiping);
resetBtn.addEventListener('click', resetApp);
sortBtn.addEventListener('click', sortDishes);

// Initial Load
window.onload = () => {
    loadDish(currentDishIndex);
};
