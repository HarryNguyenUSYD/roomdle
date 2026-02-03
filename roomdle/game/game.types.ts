export type FurnitureOrientation = {
  id: number,
  positions: [number, number][]
  sprites: FurnitureSprites,
  width: number,
  height: number
};

export type FurnitureSprites = {
  graySrc: string,
  greenSrc: string,
  yellowSrc: string
};

export type HighlightColor = 
  | "black"  // Tile is not used in solution
  | "gray"   // Tile is not checked yet
  | "yellow" // Tile is used, but not by checked element
  | "green"  // Tile is used by checked element

export type TileCoordinates = {
  x: number,
  y: number
}

export type FurniturePlacement = {
  id: number,
  origin: TileCoordinates
}