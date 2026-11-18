# Chef's Menu Manager (Part 2)

Chef's Menu Manager is a React Native mobile application built with **Expo** and **Expo Router**. It allows culinary professionals and restaurant owners to seamlessly manage, categorize, and organize their daily menu items across multiple dedicated screens.

## Features & Architecture

* **Multi-Screen Navigation (Expo Router):** Uses a file-based tab navigation architecture (`_layout.tsx`) separating the app into distinct views.
* **Home Dashboard (`index.tsx`):** Provides a high-level summary including total dishes, average pricing calculations, and course breakdown statistics.
* **Full Menu Catalog (`menu-list.tsx`):** Displays all added menu entries in a structured, scrollable list with options to clear the catalog.
* **Add Dish Form (`add-dish.tsx`):** Features rigorous client-side form validation, course selection pickers (Starter, Main Course, Dessert), and shared state propagation.
* **Custom UI Design:** Styled with a professional color palette (`#0F172A` primary dark theme and `#0891B2` cyan accents).

## Tech Stack

* **Framework:** React Native / Expo (SDK 57+)
* **Routing:** Expo Router
* **Components:** `@react-native-picker/picker`, React Native core components (`FlatList`, `SafeAreaView`, `ScrollView`, `KeyboardAvoidingView`)

## Project Directory Structure

```text
ChefsMenuApp/
└── src/
    └── app/
        ├── _layout.tsx      # Bottom tab navigation configuration
        ├── index.tsx        # Home dashboard and summary metrics
        ├── menu-list.tsx    # Dedicated full catalog list screen
        └── add-dish.tsx     # Form input screen and shared array state



        # Chef's Menu Manager — Final PoE (Part 3)

A professional React Native mobile application built with **Expo** and **Expo Router** for local restaurant owner Christoffel. The application streamlines menu management by allowing culinary professionals to add, view, update, delete, search, filter, and analyse menu items across multiple screens.

---

## Key Features & Functionality

### 1. Home Dashboard & Live Statistics (`index.tsx`)
- **Total Menu Items Count:** Instantly displays the aggregate number of dishes currently stored in the system.
- **Overall Average Price:** Automatically calculates the mean price of all menu entries combined.
- **Course-Specific Breakdowns:** Provides individual dish counts for Starters, Main Courses, and Desserts.
- **Per-Course Average Pricing:** Computes the average price point separately for each course category to help with menu pricing strategy.

### 2. Menu Catalog & Deletion Management (`menu-list.tsx`)
- **Comprehensive Catalog View:** Displays all active menu entries in a clean, scrollable card list with visual badges for course types.
- **Individual Delete Action:** Allows the chef to remove any specific dish from the catalog instantly, with immediate UI updates.
- **Bulk Clear / Reset Control:** Provides a reset utility to clear all entries when restarting test sessions.

### 3. Add Dish Form & Validation (`add-dish.tsx`)
- **Structured Inputs:** Captures dish names, descriptions, course classifications (Starter, Main Course, Dessert), and unit prices.
- **Strict Input Validation:** Validates that all mandatory text fields are completed and that prices are entered as valid positive numbers before saving.
- **Success & Error Feedback Banners:** Displays contextual feedback alerts confirming successful additions or highlighting validation errors.

---

## Project Directory Structure

```text
ChefsMenuApp/
├── README.md
└── src/
    ├── utils/
    │   └── menuStore.ts          # Centralized state management, CRUD logic, validation & statistics
    └── app/
        ├── _layout.tsx           # Expo Router bottom tab navigation layout
        ├── index.tsx             # Home dashboard & advanced menu analytics
        ├── menu-list.tsx         # Catalog view with delete controls
        └── add-dish.tsx          # Add dish form with input validation