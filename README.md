# Snippet Board Frontend

React frontend for my [Snippet Board website](https://snipits.netlify.app).

Snip it is a tool to help manage snippets of code. It features a full code editor with language syntax and color themes. The desing was based on Google's "Material Design" system along with being responsive and having a darkmode. 

Each user can have as many snippets as they want, which are only visible to them, so an account is needed. The user is able to create, update, search and delete his snippets. The user can be authenticated with their password, stored as a hash or via a token if they logged in before. The frontend uses primarily React, Redux and MUI components, the [backend](https://github.com/churris-x/snippet-board-server) is an Express NodeJS server with a PostgreSQL database.

I still plan to add more features that are on [my todo list](https://github.com/users/churris-x/projects/2?fullscreen=true).


## Screenshot

<img src="public/largePreview.png?raw=true" alt="website screenshot">

## Wireframe

![Wireframe image](README/wireframe.svg?raw=true)

## Technologies
- Packages
	- react
	- react-redux
	- axios
	- [MUI](https://github.com/mui/material-ui) material & icons
	<!-- - boring-avatars -->
	- [react-ace](https://github.com/securingsincity/react-ace)
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

