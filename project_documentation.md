# Project Documentation: Finsum

## Overview
Finsum is a stock AI insights application consisting of a Python Flask backend and a React Native (Expo) frontend. The project aims to provide users with stock search capabilities and AI-generated insights (currently mocked).

## Requirements

### Functional Requirements
1.  **Stock Search:**
    - Users must be able to search for stocks by symbol or name.
    - Search results should update in real-time or near real-time.
    - The search interface should handle loading states and empty results gracefully.
2.  **Stock Insights:**
    - Users should be able to view detailed insights for a selected stock.
    - Insights include a summary, bullish case, bearish case, and sentiment analysis.
3.  **Navigation:**
    - The app should have a main navigation structure with tabs for "Home" and "Updates" (formerly Favorites).
    - Users should be able to navigate to a detailed stock view from search results.

### Technical Requirements
-   **Backend:**
    -   Python 3.x
    -   Flask framework
    -   `flask-cors` for handling Cross-Origin Resource Sharing
-   **Frontend:**
    -   React Native with Expo
    -   TypeScript
    -   `expo-router` for navigation
    -   `nativewind` (Tailwind CSS) for styling

## Design Decisions

### Backend Architecture
-   **Framework Choice:** Flask was chosen for its lightweight nature and ease of setting up simple API endpoints.
-   **Mock Data:** Currently, the backend uses in-memory mock data (`STOCKS` list and random insights) to facilitate rapid frontend development without needing a live financial data API or complex database setup.
-   **API Structure:**
    -   `/api/search`: Accepts a query parameter `q` and returns a list of matching stocks.
    -   `/api/insights`: Accepts a `ticker` parameter and returns a structured JSON object with insights.

### Frontend Architecture
-   **Framework Choice:** Expo was selected for its robust ecosystem and ease of cross-platform development (iOS/Android).
-   **Navigation:**
    -   **File-based Routing:** `expo-router` is used to map the file structure directly to navigation routes, simplifying deep linking and code organization.
    -   **Tab Navigation:** A bottom tab bar provides access to primary views.
    -   **Stack Navigation:** Used for drilling down into specific content (e.g., stock details).
-   **Styling:**
    -   **Utility-First:** `nativewind` allows using Tailwind CSS classes directly in React Native components, promoting consistency and rapid UI iteration.
    -   **Custom Tab Bar:** The bottom tab bar is customized to be "floating" (absolute position, rounded corners, shadow) to give a modern, premium feel.
-   **Component Design:**
    -   **`SearchBar`:** Designed as a controlled component that manages its own UI state (loading, clear button) but delegates the search logic via props (`onValueChange`, `results`). It includes an overlay for results to keep the UI clean.

## Current Status
-   **Backend:** Functional with mock endpoints.
-   **Frontend:**
    -   Basic layout and navigation established.
    -   `SearchBar` component implemented with styling.
    -   "Updates" tab (Favorites) exists but is currently a placeholder.
    -   Stock detail route is defined but implementation details were not fully reviewed in this pass.
