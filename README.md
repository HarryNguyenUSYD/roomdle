# Roomdle

A daily puzzle game inspired by Wordle. Figure out where to put the correct furniture in a new room every day! Created by Harry Nguyen.

# How To Run Locally

1. This project requires `node` and `npm`. If you don't have those yet, install `node` [here](https://nodejs.org/en) (will also install `npm`).

2. Navigate to the project directory (`cd roomdle`)

3. Install dependancies (`npm install`).

4. Run project with `npm run dev`.

5. Visit the locally hosted website at [http://localhost:3000](http://localhost:3000) or whichever URL printed by the previous command.

6. Have fun!

# Patch Notes

## Week 1:

chore: repository and project initialization

Generated new Next.js project using `npm create next-app@latest`, and created `README.md`. Have not made any changes to the template project yet.

## Week 2:

feat: set up webpage layout and created placeholders

Created dedicated files and directories for future work. All the visuals are currently only placeholders, but will be changed in the upcoming weeks. Placeholders are created for both desktop and mobile version.

Only the front-end has been worked on. Back-end tasks remain untouched.

- TODO: Add styles for tablet device.

## Week 3:

feat: added puzzle-generating algorithm in Puzzle class, Debug menu, and connected Gameboard to Puzzle.

Created files and directories (`game/`) for the backend, currently includes the `Puzzle` class and other utils. Also created debug-related components with `/contexts/DebugContext` and some Debug buttons + menu in `/layout/gameboard/GameboardDebug`. Finally, connected the new `Puzzle` class to the `Gameboard`, so now I can use debugging features to edit the puzzle, which will show on the board.

- TODO: Add styles for tablet device.