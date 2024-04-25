# [JSL11] Agile Board - Kanban Task Management App

## Overview

In this project, I brought a Kanban Management app to life by implementing the features described in the provided user stories.

## Walkthrough of the App (Agile Board Project Feature List)

1. When you open the App, the user can click on the `Add New Task` button and create a task with a title, description and set the status which will immediately reflect.
2. When you click on the individual task, it will show all the details. Here you can edit each task and update the task title, desciption and status and save the changes which will reflect immediately on the UI.
3. The tasks can also be deleted directly from the edits modal.
4. The user can also cancel their edits and close the modal.
5. Information can be updated by editing the existing tasks and the changes will be saved to the local storage and not be cleared when the page is refreshed.
6. The side bar can be hidden to gain more work space or opened to access different boards and the theme switch.
7. The user can also use dark mode to reduce eye strain and light mode to suite the environments with the according logo updates.

## Project outcome

![alt text](MyJSL11.png)

## Loom Presentation Link

[Loom Presentation Link](https://www.loom.com/share/7f79746ce8ac44589f95f61da820ee10?sid=334573d2-2e4f-4acf-afec-eef55fa46d11)

## Learning Reflections

1. Error Handling in Local Storage Initialization: The `initializeData()` function handles the case when localStorage doesn't have the 'tasks' key by initializing it with initialData, ensuring the app has default data to work with.
2. DOM Manipulation: I learned how to retrieve and manipulates DOM elements using document.getElementById and document.querySelector, though not efficiently which helped in writing cleaner and more readable code, making it easier to maintain and debug.
3. Event listeners are set up to handle various user interactions like adding, editing, and deleting tasks, toggling sidebar visibility, and changing themes. This ensures that user interactions are captured and processed correctly, enhancing the user experience.
4. Several bugs were identified and fixed, such as in `displayBoards()`, `filterAndDisplayTasksByBoard()`, and `styleActiveBoard()`, ensuring proper functionality. Although a struggle, this improved code quality and reliability.
5. Local Storage Usage: Local storage is utilized to store and retrieve data like tasks, active board, theme preferences, and sidebar visibility. This provides a seamless user experience.
6. The code effectively manages tasks, including adding, editing, and deleting tasks, as well as updating their statuses and boards.
7. UI/UX Enhancements: The code includes features like modal dialogs for adding and editing tasks, active board styling, and theme toggling, enhancing the user interface and experience.
