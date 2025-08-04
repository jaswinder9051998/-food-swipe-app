# Food Swipe Website Plan

This document outlines the plan to create a food-swiping mobile website.

## 1. Project Setup

*   **`index.html`**: The main HTML file for the website structure.
*   **`style.css`**: The CSS file for styling the components.
*   **`script.js`**: The JavaScript file for all the interactive logic.
*   **`images/`**: A directory to store all the food images.

## 2. Data Structure

We will create a JavaScript array of objects to hold the data for each food card. Each object will represent a dish and have the following properties:

*   `id`: A unique identifier for the dish.
*   `name`: The name of the dish (e.g., "Pizza", "Sushi").
*   `image`: The path to the image file for the dish.

Example:

```javascript
const dishes = [
    { id: 1, name: 'Pizza', image: 'images/IMG-20250801-WA0015.jpg' },
    // ... more dish objects
];
```

## 3. HTML Structure (`index.html`)

The HTML will have the following main components:

*   A main container for the entire application.
*   A header with the title of the app.
*   A container for the swipeable cards.
*   A title element above the card to display the dish name.
*   Buttons for "Stop", "Reset", and "Sort".
*   A container to display the list of liked dishes, which will be hidden initially.

## 4. CSS Styling (`style.css`)

We will use CSS to:

*   Create a mobile-first, responsive layout.
*   Style the cards with a Tinder-like appearance (stacked, with shadows).
*   Style the buttons.
*   Animate the card swiping (left and right).
*   Style the final list of liked dishes.
*   Ensure the dish name is clearly visible above the card.

## 5. JavaScript Logic (`script.js`)

This will be the core of the application.

### 5.1. Card Swiping

*   Implement touch and mouse events for swiping.
*   When a card is swiped right:
    *   Add the dish to a `likedDishes` array.
    *   Animate the card moving off-screen to the right.
    *   Load the next card.
*   When a card is swiped left:
    *   Animate the card moving off-screen to the left.
    *   Load the next card.

### 5.2. Button Functionality

*   **"Stop" Button**:
    *   Hide the card swiping interface.
    *   Display the list of dishes from the `likedDishes` array.
*   **"Reset" Button**:
    *   Clear the `likedDishes` array.
    *   Show the card swiping interface again, starting from the beginning.
    *   Hide the liked dishes list.
*   **"Sort" Button**:
    *   Randomly shuffle the `dishes` array to change the order of the cards.
    *   Reload the cards in the new order.

### 5.3. Displaying Liked Dishes

*   When the "Stop" button is clicked, dynamically generate HTML to display each dish from the `likedDishes` array. This will likely be a list or a grid of the liked items.

## 6. Development Steps

1.  **~~Setup~~**: Create `index.html`, `style.css`, and `script.js` files. - **Completed**
2.  **~~HTML~~**: Implement the basic HTML structure. - **Completed**
3.  **~~Data~~**: Create the initial `dishes` array in `script.js`. - **Completed**
4.  **~~CSS~~**: Style the basic layout, cards, and buttons. - **Completed**
5.  **~~JS - Card Rendering~~**: Write JavaScript to render the first card on the page load. - **Completed**
6.  **~~JS - Swiping Logic~~**: Implement the core swiping functionality. - **Completed**
7.  **~~JS - Button Logic~~**: Implement the "Stop", "Reset", and "Sort" button actions. - **Completed**
8.  **~~CSS - Animations~~**: Add swipe animations. - **Completed**
9.  **~~JS - Liked List~~**: Implement the display of the liked dishes. - **Completed**
10. **Testing**: Thoroughly test all functionalities on different mobile screen sizes.

This plan provides a clear roadmap for building the food-swiping website.
