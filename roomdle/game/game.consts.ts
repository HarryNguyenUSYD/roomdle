import { FurnitureOrientation } from "./game.types";

export const GAMEBOARD_WIDTH = 5 as const;
export const GAMEBOARD_HEIGHT = 5 as const;
export const NUM_PIECES_PER_PUZZLE = 5;

export const FURNITURE_SPRITE_DIR = "/roomdle-furniture/" as const;
export const PIXELS_PER_UNIT = 250;

export const FURNITURE_ORIENTATIONS: FurnitureOrientation[] = [
  {
    id: 1,
    positions: [[0, 0], [0, 1]],
    sprites: {
      graySrc: "roomdle-vert-s1.png",
      greenSrc: "roomdle-vert-s2.png",
      yellowSrc: "roomdle-vert-s3.png",
    },
    width: 1,
    height: 2
  },
  {
    id: 2,
    positions: [[0, 0], [0, 1], [0, 2]],
    sprites: {
      graySrc: "roomdle-vert-m1.png",
      greenSrc: "roomdle-vert-m2.png",
      yellowSrc: "roomdle-vert-m3.png",
    },
    width: 1,
    height: 3
  },
  {
    id: 3,
    positions: [[0, 0], [0, 1], [0, 2], [0, 3]],
    sprites: {
      graySrc: "roomdle-vert-l1.png",
      greenSrc: "roomdle-vert-l2.png",
      yellowSrc: "roomdle-vert-l3.png",
    },
    width: 1,
    height: 4
  },
  {
    id: 4,
    positions: [[0, 0], [1, 0]],
    sprites: {
      graySrc: "roomdle-hort-s1.png",
      greenSrc: "roomdle-hort-s2.png",
      yellowSrc: "roomdle-hort-s3.png",
    },
    width: 2,
    height: 1
  },
  {
    id: 5,
    positions: [[0, 0], [1, 0], [2, 0]],
    sprites: {
      graySrc: "roomdle-hort-m1.png",
      greenSrc: "roomdle-hort-m2.png",
      yellowSrc: "roomdle-hort-m3.png",
    },
    width: 3,
    height: 1
  },
  {
    id: 6,
    positions: [[0, 0], [1, 0], [2, 0], [3, 0]],
    sprites: {
      graySrc: "roomdle-hort-l1.png",
      greenSrc: "roomdle-hort-l2.png",
      yellowSrc: "roomdle-hort-l3.png",
    },
    width: 4,
    height: 1
  },
  {
    id: 7,
    positions: [[0, 0], [0, 1], [1, 1]],
    sprites: {
      graySrc: "roomdle-L-a1.png",
      greenSrc: "roomdle-L-a2.png",
      yellowSrc: "roomdle-L-a3.png",
    },
    width: 2,
    height: 2
  },
  {
    id: 8,
    positions: [[0, 0], [1, 0], [0, 1]],
    sprites: {
      graySrc: "roomdle-L-b1.png",
      greenSrc: "roomdle-L-b2.png",
      yellowSrc: "roomdle-L-b3.png",
    },
    width: 2,
    height: 2
  },
  {
    id: 9,
    positions: [[0, 0], [1, 0], [1, 1]],
    sprites: {
      graySrc: "roomdle-L-c1.png",
      greenSrc: "roomdle-L-c2.png",
      yellowSrc: "roomdle-L-c3.png",
    },
    width: 2,
    height: 2
  },
  {
    id: 10,
    positions: [[0, 1], [1, 0], [1, 1]],
    sprites: {
      graySrc: "roomdle-L-d1.png",
      greenSrc: "roomdle-L-d2.png",
      yellowSrc: "roomdle-L-d3.png",
    },
    width: 2,
    height: 2
  },
  {
    id: 11,
    positions: [[0, 0], [1, 0], [1, 1], [2, 1]],
    sprites: {
      graySrc: "roomdle-Z-a1.png",
      greenSrc: "roomdle-Z-a2.png",
      yellowSrc: "roomdle-Z-a3.png",
    },
    width: 3,
    height: 2
  },
  {
    id: 12,
    positions: [[1, 0], [0, 1], [1, 1], [0, 2]],
    sprites: {
      graySrc: "roomdle-Z-d1.png",
      greenSrc: "roomdle-Z-d2.png",
      yellowSrc: "roomdle-Z-d3.png",
    },
    width: 2,
    height: 3
  },
  {
    id: 13,
    positions: [[1, 0], [0, 1], [1, 1], [2, 0]],
    sprites: {
      graySrc: "roomdle-Z-b1.png",
      greenSrc: "roomdle-Z-b2.png",
      yellowSrc: "roomdle-Z-b3.png",
    },
    width: 3,
    height: 2
  },
  {
    id: 14,
    positions: [[0, 0], [0, 1], [1, 1], [1, 2]],
    sprites: {
      graySrc: "roomdle-Z-c1.png",
      greenSrc: "roomdle-Z-c2.png",
      yellowSrc: "roomdle-Z-c3.png",
    },
    width: 2,
    height: 3
  },
  {
    id: 15,
    positions: [[0, 0], [0, 1], [1, 0], [1, 1]],
    sprites: {
      graySrc: "roomdle-square1.png",
      greenSrc: "roomdle-square2.png",
      yellowSrc: "roomdle-square3.png",
    },
    width: 2,
    height: 2
  }
];