# CellScript-WA3-Project
My submission project for my WA3 project in G3 Computing Sec 3 2026.

## Overview 
CellScript is a terminal-based puzzle game developed in Google Colab. Players write simple commands into programmable sequences, which are then executed to move the player through increasingly challenging puzzle rooms.

## Technologies used
- Python
- Google Colab
- Google Apps Script

## Features 
- 3 programmable sequences, the main sequence, and 2 custom user defined functions.
- Puzzle rooms containing walls and puzzles.
- Toggle switches connected to doors with wires.
- A NOT logic gate that can be combined with the wiring system to create more complex logic circuits.
- Account system to save your progress and continue from where you left off.
- Level select screen to play any level you want.

## How It Works 
The project begins with more than 900 lines of user-defined functions that handle the game's mechanics while keeping the code modular and readable. Then the remaining 400 lines handle the menus and flow of the game. The code has multiple nested `while True` loops and `break`s to allow seamless UI navigation like some real games I have played before. 

## Challenges 
As the project grew larger, adding new features became increasingly difficult. Before implementing a new function, I often had to revisit earlier sections of the code to understand how they interacted with the rest of the program.

Debugging also posed a major challenge. Some bugs only appeared after introducing new mechanics, and locating the source of the problem could take a significant amount of time.

## What I Learned 
I learned to keep my code readable, as I used to have a bad habit of naming my variables that did not accurately represent the actual variable in any way or form. 

I also learned to persevere through hard moments, especially when I felt like giving up on an important feature. I also learned to plan ahead on how I would achieve the final product I wanted as starting from scratch and working your way up usually never takes simply a single sitting. 

## Future Improvements 
I would improve on the naming of the variables as there were times where I kept the name for a specific role and ended up using that same variable for another role, making the old name irrelevant. I would also improve on my presentation skills, since I spent so much time on the game itself, I ended up with less time for the more important presentation. I would improve it by also setting up plans to make the presentation at the same time I planned my game development timeline. 

## Playing my game 
If you're interested in trying CellScript, you can play it directly on Google Colab using the link below. Instructions for running the game are included in the notebook. Alternatively, you can download `CellScript.py` and run it locally on your computer. I recommend using Google Colab, as it provides access to the built-in account system for saving your progress.

[CellScript URL](https://colab.research.google.com/drive/11r8ao6OH1-Y3IuloVHrnGAKF9rIbt4Dp?usp=sharing "Go to Google Colab")
