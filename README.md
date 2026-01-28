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

## Week 3:

feat: added puzzle-generating algorithm in Puzzle class, Debug menu, and connected Gameboard to Puzzle.

Created files and directories (`game/`) for the backend, currently includes the `Puzzle` class and other utils. Also created debug-related components with `/contexts/DebugContext` and some Debug buttons + menu in `/layout/gameboard/GameboardDebug`. Finally, connected the new `Puzzle` class to the `Gameboard`, so now I can use debugging features to edit the puzzle, which will show on the board.

## Week 4:

feat: added tile highlighting, added sprites for tiles and tiles highlighting, and added high contrast mode.

Added many sprites, including the tiles, highlight (green and yellow) and high contrast icons. Added an algorithm to select the correct highlight sprite from surrounding area. Added the Space hotkey for quick random puzzle generation. Added the "High Contrast" setting in the Settings menu for high contrast icon.

Relocated `page.tsx` components to a separate folder, and relocated all contexts to now wrap around the entire page. Created `ContextWrapper` as a large wrapper containing all Contexts.

## Week 5:

feat: added sprites for furniture pieces, and reworked the functionality of the `Furniture Bar`

Added sprites of the `Furniture` pieces, and implemented the grid display of the `Furniture Bar`. Additional work to be done on the bar, including adding tiles backdrop (to highlight the grid), size slider, and decorative borders.

## Week 6:

### Commit 1:

feat: added drag functionality for furniture pieces, refactored code relating to furniture pieces and the furniture bar

Added the ability to drag `Furniture` pieces around the screen, but currently they snap back to the original position after dropping.

Relocated `/components/ui/furniture` to `/components/layout/furniture-bar`, with all the imports updated. Added `furniture.context.tsx` for compound component pattern, similar to `Gameboard`.

### Commit 2:

feat: added hover highlighting feature: the tiles on the `Gameboard` will be appropriately highlighted when dragging a `Furniture` piece onto them.

Added the ability to hover `Furniture` pieces onto the board, which will highlight the tiles taken over by it. This feature, however, doesn't work on mobile devices currently.

Added the `DragAndDropContext` to store the currently dragged furniture piece and updated `ContextWrapper` accordingly. Updated `GameboardContext` to now store the coordinates of the currently hovered tile.