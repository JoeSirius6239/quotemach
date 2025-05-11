
# QuoteMach - Insurance Clause Management System

## Overview

QuoteMach is a specialized web application designed for insurance underwriters to efficiently manage insurance clauses and generate professional quotes. The system streamlines the workflow of selecting, organizing, and exporting insurance clauses while providing a modern, responsive interface that works across devices.

## Key Features

- **Excel-based Clause Management**: Import and parse Excel files containing insurance clauses
- **Advanced Search & Filtering**: Quickly find specific clauses with multi-column search
- **Clause Package Management**: Create, save, and restore collections of clauses
- **Quote Generation**: Generate professional insurance quotes with customizable templates
- **Multilingual Support**: Switch between Chinese, English, and bilingual modes
- **Dark Mode**: Enhanced visual comfort with a professionally designed dark theme
- **Responsive Design**: Optimized for both desktop and mobile devices

## Architecture & Design Philosophy

### Core Architecture

QuoteMach follows a modular architecture with clear separation of concerns:

1. **Core Engine (FinancialClauseEngine)**: Manages the application state, data processing, and business logic
2. **UI Components**: Provides a responsive and intuitive user interface
3. **Custom Dropdown System**: Enhances the native select elements with custom styling and behavior
4. **Template Processing**: Handles document generation using docxtemplater

### Design Principles

- **Performance First**: Optimized for handling large Excel files with batch processing and progressive loading
- **Responsive UI**: Adapts seamlessly to different screen sizes and devices
- **Visual Consistency**: Follows a cohesive design language inspired by modern web applications
- **Offline Capability**: Core functionality works without requiring server connections
- **User-Centric Workflow**: Designed around the actual workflow of insurance underwriters

### Technical Implementation

- **Pure Frontend**: Built with vanilla JavaScript, HTML, and CSS without framework dependencies
- **Modern JavaScript**: Utilizes ES6+ features for cleaner, more maintainable code
- **Local Storage**: Saves user preferences and clause packages to browser storage
- **External Libraries**: Leverages specialized libraries for Excel parsing (SheetJS), document generation (docxtemplater), and visual effects (confetti)

## User Workflow

### Basic Workflow

1. **Authentication**: Enter password to access the system
2. **Import Data**: Upload Excel file containing insurance clauses
3. **Search & Select**: Find and select relevant clauses
4. **Configure Limits**: Set coverage limits and deductibles for selected clauses
5. **Save Package**: Save selected clauses as a reusable package
6. **Generate Quote**: Create a professional quote document based on selected clauses

### Detailed Process Flow

```mermaid
graph TD
    A[Login] --> B[Upload Excel]
    B --> C[Search Clauses]
    C --> D[Select Clauses]
    D --> E[Configure Limits]
    E --> F1[Save Clause Package]
    E --> F2[Generate Quote]
    F1 --> G[Manage Saved Packages]
    F2 --> H[Export Document]
    G --> C