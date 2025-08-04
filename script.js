// Data
const dishNames = ['Pizza', 'Sushi', 'Tacos', 'Burger', 'Pasta', 'Salad', 'Steak'];
const imageFiles = ['IMG-20250801-WA0015.jpg', 'IMG-20250709-WA0002.jpg'];

const dishes = dishNames.map((name, index) => ({
    id: index + 1,
    name: name,
    image: `images/${imageFiles[index % imageFiles.length]}`
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
        card.style.backgroundImage = `url('${dishes[index].image}')`;
    } else {
        dishName.textContent = "No more dishes!";
        card.style.backgroundImage = 'none';
    }
}

let isDragging = false;
let startX = 0;
let currentX = 0;

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
        likedDishes.push(dishes[currentDishIndex]);
        currentDishIndex++;
        loadDish(currentDishIndex);
    } else if (currentX < -100) { // Swiped left
        currentDishIndex++;
        loadDish(currentDishIndex);
    }
    
    card.style.transform = 'translateX(0) rotate(0deg)';
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
