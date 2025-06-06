# Frontend Mentor - Interactive Card Details Form Solution

This is my solution to the [Interactive Card Details Form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). 

## Overview

### The Challenge

Users should be able to:
- Fill in the form and see card details update in real-time
- Receive error messages for:
  - Empty input fields
  - Incorrect formatting (card number, expiry date, CVC)
- View optimal layout across different screen sizes
- See hover, active, and focus states for interactive elements


### Links

- [Live Site URL](https://HossamElrawy.github.io/interactive-card-details-form/)

## My Process

### Built With

- JavaScript
- CSS Modules
- Flexbox & Grid
- Mobile-first workflow
- Form validation
- Regular expressions for input formatting

### Key Features Implemented

1. **Real-time Card Updates**:
   - As users type, the card preview updates instantly
   - Special formatting for card numbers (spaces every 4 digits)

2. **Form Validation**:
   - Field-specific error messages
   - Visual feedback for invalid inputs
   - Prevent form submission until all fields are valid

3. **Responsive Design**:
   - Optimized layout for mobile and desktop
   - Card flips on mobile to show CVC when focused
