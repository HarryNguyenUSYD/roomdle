// If a type is meant to be shared across files, put it here

export type GameboardTileColor = 
  | "black"  // Tile is not used in solution
  | "gray"   // Tile is not checked yet
  | "yellow" // Tile is used, but not by checked element
  | "green"  // Tile is used by checked element

export type GameboardTileState = {
  x: number,
  y: number,
  color: GameboardTileColor,
  neighbors: number,
  solution: number
}

export type GameboardTileHighlight = {
  index: number,
  rotation: "0" | "90" | "180" | "270"
}