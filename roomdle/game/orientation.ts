export type Orientation = {
  id: number,
  positions: [number, number][]
};

export const FURNITURE_ORIENTATIONS: Orientation[] = [
  { id: 1, positions: [[0, 0], [0, 1]] },
  { id: 2, positions: [[0, 0], [1, 0]] },
  { id: 3, positions: [[0, 0], [0, 1], [0, 2]] },
  { id: 4, positions: [[0, 0], [1, 0], [2, 0]] },
  { id: 5, positions: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  { id: 6, positions: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { id: 7, positions: [[0, 0], [0, 1], [1, 1]] },
  { id: 8, positions: [[0, 1], [1, 0], [1, 1]] },
  { id: 9, positions: [[0, 0], [1, 0], [1, 1]] },
  { id: 10, positions: [[0, 0], [1, 0], [0, 1]] },
  { id: 11, positions: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { id: 12, positions: [[1, 0], [0, 1], [1, 1], [0, 2]] },
  { id: 13, positions: [[1, 0], [0, 1], [1, 1], [2, 0]] },
  { id: 14, positions: [[0, 0], [0, 1], [1, 1], [1, 2]] },
  { id: 15, positions: [[0, 0], [0, 1], [1, 0], [1, 1]] },
];