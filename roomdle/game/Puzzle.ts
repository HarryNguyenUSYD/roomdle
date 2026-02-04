import { GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT, NUM_PIECES_PER_PUZZLE, FURNITURE_ORIENTATIONS } from "./game.consts";
import { FurnitureOrientation } from "./game.types";
import { getSeedFromToday, mulberry32 } from "./game.utils";

type Listener = () => void;

export class Puzzle {
  private _puzzle: number[][] = Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
  );
  private _listeners: Listener[] = [];
  
  constructor() {
    const todaySeed = getSeedFromToday();
    this._generatePuzzle(todaySeed);
  }

  /**
   * The useSyncExternalStore-related methods
   */
  //////////////////////////////////////
  public subscribe(listener: Listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }

  public getSnapshot() {
    return this._puzzle;
  }

  private _emit() {
    for (const l of this._listeners) {
      l();
    }
  }
  ///////////////////////////////////////

  private _resetPuzzle() {
    this._puzzle = Array.from({ length: GAMEBOARD_HEIGHT }, () =>
      Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
    );
  }

  public generateRandomPuzzle() {
    const seed = Math.floor(Math.random() * 99999999);
    this._generatePuzzle(seed);
  }

  private _generatePuzzle(seed: number) {
    let complete = false;
    let loop = 0;

    while (!complete) {
      this._resetPuzzle();

      const currentSeed = seed + loop;
      const rng = mulberry32(currentSeed);
      const usedPieces: number[] = [];

      let valid = true;
      for (let i = 0; i < NUM_PIECES_PER_PUZZLE; i++) {
        const unusedPieces = FURNITURE_ORIENTATIONS.filter((p) => (!usedPieces.includes(p.id)));

        if (unusedPieces.length == 0) {
          valid = false;
          break;
        }

        const pieceIndex = Math.floor(rng() * (unusedPieces.length));
        const piece = unusedPieces[pieceIndex];
        const possiblePlacements = this._getPossiblePlacements(piece);
  
        if (possiblePlacements.length > 0) {
          const coordIndex = Math.floor(rng() * (possiblePlacements.length));
          const coord = possiblePlacements[coordIndex];
          this._setPlacement(piece, coord);
          usedPieces.push(piece.id);
        } else {
          usedPieces.push(piece.id);
          --i;
        }
      }

      complete = valid;
      ++loop;
    }

    console.log(this._puzzle);
    this._emit();
  }

  private _getPossiblePlacements(piece: FurnitureOrientation): number[][] {
    const output = [];
    for (let y = 0; y < GAMEBOARD_HEIGHT; y++) {
      for (let x = 0; x < GAMEBOARD_WIDTH; x++) {
        let valid = true;
        for (let i = 0; i < piece.positions.length; i++) {
          const pos = piece.positions[i];
          if (
            x + pos[0] < 0 ||
            x + pos[0] >= GAMEBOARD_WIDTH ||
            y + pos[1] < 0 ||
            y + pos[1] >= GAMEBOARD_HEIGHT ||
            this._puzzle[y + pos[1]][x + pos[0]] != -1
          ) {
            valid = false;  
          }
        }

        if (valid) {
          output.push([x, y]);
        }
      }
    }

    return output;
  }

  private _setPlacement(piece: FurnitureOrientation, coord: number[]) {
    for (let i = 0; i < piece.positions.length; i++) {
      const pos = piece.positions[i];
      this._puzzle[coord[1] + pos[1]][coord[0] + pos[0]] = piece.id;
    } 
  }
}