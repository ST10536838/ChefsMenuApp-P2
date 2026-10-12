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