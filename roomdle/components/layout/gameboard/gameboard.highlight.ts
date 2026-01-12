import { GameboardTileHighlight } from "./gameboard.types";

export const SPECIAL_OFFSET = 29;
export const YELLOW_OFFSET = 14;

// export const HIGHLIGHT_ORITENTATIONS: Record<number, Map<number, GameboardTileHighlight>> = {
//   0b0000: new Map([[ 0b0000, { index: 1, rotation: "0" } ]]),
//   0b1000: new Map([[ 0b0000, { index: 2, rotation: "270" } ]]),
//   0b0100: { 0b0000: { index: 2, rotation: "180" } },
//   0b0010: { 0b0000: { index: 2, rotation: "0" } },
//   0b0001: { 0b0000: { index: 2, rotation: "90" } },
//   0b1100: { 0b1000: { index: 5, rotation: "180" }, 0b0000: { index: 4, rotation: "180" } },
//   0b1010: { 0b0100: { index: 5, rotation: "270" }, 0b0000: { index: 4, rotation: "270" } },
//   0b1001: { 0b0000: { index: 3, rotation: "90" } },
//   0b0110: { 0b0000: { index: 3, rotation: "0" } },
//   0b0101: { 0b0010: { index: 5, rotation: "90" }, 0b0000: { index: 4, rotation: "90" } },
//   0b0011: { 0b0001: { index: 5, rotation: "0" }, 0b0000: { index: 4, rotation: "0" } },
//   0b1110: {
//     0b1100: { index: 7, rotation: "180" },
//     0b1000: { index: 8, rotation: "180" },
//     0b0100: { index: 9, rotation: "180" },
//     0b0000: { index: 6, rotation: "180" },
//   },
//   0b1101: {
//     0b1010: { index: 7, rotation: "90" },
//     0b1000: { index: 9, rotation: "90" },
//     0b0010: { index: 8, rotation: "90" },
//     0b0000: { index: 6, rotation: "90" },
//   },
//   0b1011: {
//     0b1001: { index: 7, rotation: "270" },
//     0b0001: { index: 8, rotation: "270" },
//     0b0010: { index: 9, rotation: "270" },
//     0b0000: { index: 6, rotation: "270" },
//   },
//   0b0111: {
//     0b0011: { index: 7, rotation: "0" },
//     0b0001: { index: 8, rotation: "0" },
//     0b0010: { index: 9, rotation: "0" },
//     0b0000: { index: 6, rotation: "0" },
//   },
//   0b1111: {
//     0b1111: { index: 32, rotation: "0" },
//     0b0111: { index: 14, rotation: "90" },
//     0b1011: { index: 14, rotation: "180" },
//     0b1101: { index: 14, rotation: "0" },
//     0b1110: { index: 14, rotation: "270" },
//     0b1100: { index: 12, rotation: "0" },
//     0b1010: { index: 12, rotation: "270" },
//     0b1001: { index: 13, rotation: "0" },
//     0b0110: { index: 13, rotation: "180" },
//     0b0101: { index: 12, rotation: "90" },
//     0b0011: { index: 12, rotation: "180" },
//     0b1000: { index: 11, rotation: "270" },
//     0b0100: { index: 11, rotation: "0" },
//     0b0010: { index: 11, rotation: "180" },
//     0b0001: { index: 11, rotation: "90" },
//     0b0000: { index: 10, rotation: "0" },
//   },
// }

export const HIGHLIGHT_ORITENTATIONS = new Map<number, Map<number, GameboardTileHighlight>>([
  [0b0000, new Map([
    [0b0000, { index: 1, rotation: "0" }],
  ])],

  [0b1000, new Map([
    [0b0000, { index: 2, rotation: "270" }],
  ])],

  [0b0100, new Map([
    [0b0000, { index: 2, rotation: "180" }],
  ])],

  [0b0010, new Map([
    [0b0000, { index: 2, rotation: "0" }],
  ])],

  [0b0001, new Map([
    [0b0000, { index: 2, rotation: "90" }],
  ])],

  [0b1100, new Map([
    [0b1000, { index: 4, rotation: "180" }],
    [0b0000, { index: 5, rotation: "180" }],
  ])],

  [0b1010, new Map([
    [0b0100, { index: 4, rotation: "270" }],
    [0b0000, { index: 5, rotation: "270" }],
  ])],

  [0b1001, new Map([
    [0b0000, { index: 3, rotation: "90" }],
  ])],

  [0b0110, new Map([
    [0b0000, { index: 3, rotation: "0" }],
  ])],

  [0b0101, new Map([
    [0b0010, { index: 4, rotation: "90" }],
    [0b0000, { index: 5, rotation: "90" }],
  ])],

  [0b0011, new Map([
    [0b0001, { index: 4, rotation: "0" }],
    [0b0000, { index: 5, rotation: "0" }],
  ])],

  [0b1110, new Map([
    [0b1100, { index: 6, rotation: "180" }],
    [0b1000, { index: 8, rotation: "180" }],
    [0b0100, { index: 9, rotation: "180" }],
    [0b0000, { index: 7, rotation: "180" }],
  ])],

  [0b1101, new Map([
    [0b1010, { index: 6, rotation: "90" }],
    [0b1000, { index: 9, rotation: "90" }],
    [0b0010, { index: 8, rotation: "90" }],
    [0b0000, { index: 7, rotation: "90" }],
  ])],

  [0b1011, new Map([
    [0b0101, { index: 6, rotation: "270" }],
    [0b0001, { index: 9, rotation: "270" }],
    [0b0100, { index: 8, rotation: "270" }],
    [0b0000, { index: 7, rotation: "270" }],
  ])],

  [0b0111, new Map([
    [0b0011, { index: 6, rotation: "0" }],
    [0b0001, { index: 8, rotation: "0" }],
    [0b0010, { index: 9, rotation: "0" }],
    [0b0000, { index: 7, rotation: "0" }],
  ])],

  [0b1111, new Map([
    [0b1111, { index: 32, rotation: "0" }],
    [0b0111, { index: 14, rotation: "90" }],
    [0b1011, { index: 14, rotation: "180" }],
    [0b1101, { index: 14, rotation: "0" }],
    [0b1110, { index: 14, rotation: "270" }],
    [0b1100, { index: 12, rotation: "0" }],
    [0b1010, { index: 12, rotation: "270" }],
    [0b1001, { index: 13, rotation: "0" }],
    [0b0110, { index: 13, rotation: "90" }],
    [0b0101, { index: 12, rotation: "90" }],
    [0b0011, { index: 12, rotation: "180" }],
    [0b1000, { index: 11, rotation: "270" }],
    [0b0100, { index: 11, rotation: "0" }],
    [0b0010, { index: 11, rotation: "180" }],
    [0b0001, { index: 11, rotation: "90" }],
    [0b0000, { index: 10, rotation: "0" }],
  ])],
]);

// Rotation is clockwise
// First four: Cardinal (top -> left -> right -> bottom)
// Second four: Diagonal (top left -> top right -> bottom left -> bottom right)