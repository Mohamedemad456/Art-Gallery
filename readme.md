# Art Gallery

Welcome to the Art Gallery project! This repository contains the code and resources for managing and displaying an art gallery.

## Features

### For Users
- Browse curated art collection with diverse range of artworks
- Search and filter artworks by artist, category, or tags
- View detailed artwork information including bid history
- Participate in live auctions with real-time updates
- View timed exhibitions and featured artworks
- Create and manage user profile
- Place bids on artworks
- Track bid history and artwork value changes

### For Artists
- Upload and manage artwork listings
- Add detailed artwork information including title, description, and pricing
- Categorize artworks with tags and mediums
- Track artwork performance and bid history

### For Administrators
- Manage user accounts and permissions
- Approve or reject artwork submissions
- Monitor and manage auctions
- Curate featured artworks and exhibitions
- Oversee the entire gallery system

## Installation and Setup

### Backend Setup (.NET)
1. Navigate to the backend project directory:
    ```sh
    cd FCIH.ArtGallery
    ```
2. Restore dependencies:
    ```sh
    dotnet restore
    ```
3. Run the backend server:
    ```sh
    dotnet run --project FCIH.ArtGallery/FCIH.ArtGallery.APIs --urls "https://localhost:7043"
    ```

### Frontend Setup (React)
1. Navigate to the frontend project directory:
    ```sh
    cd FrontEnd
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

## Accessing the Application
- Frontend: http://localhost:5173
- Backend API: https://localhost:7043

## Technologies Used
- Frontend: React.js with modern UI components
- Backend: .NET Core
- Database: SQL Server
- Authentication: JWT-based authentication