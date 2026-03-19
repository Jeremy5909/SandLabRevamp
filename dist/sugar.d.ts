declare function split(cell: any, [rows, columns]: [any, any]): {
    birth: number;
    splash: any;
    position: any[];
    dimensions: number[];
    clear(image: any): void;
    colour: any;
    draw(image: any): void;
}[];
declare function chop(cell: any, axis: any, targets: any): any[];
declare function merge(cells: any, colour?: any): {
    birth: number;
    splash: any;
    position: any[];
    dimensions: number[];
    clear(image: any): void;
    colour: any;
    draw(image: any): void;
};
declare function reposition(cell: any, bounds: any): {
    birth: number;
    splash: any;
    position: any[];
    dimensions: number[];
    clear(image: any): void;
    colour: any;
    draw(image: any): void;
};
declare function recolour(cell: any, colour: any): {
    birth: number;
    splash: any;
    position: any[];
    dimensions: number[];
    clear(image: any): void;
    colour: any;
    draw(image: any): void;
};
declare function getNeighbours(cell: any, world: any): {
    left: any;
    right: any;
    top: any;
    bottom: any;
};
declare function getNeighbour(cell: any, world: any, edge: any): any;
declare function pickContacts(cell: any, world: any, edge?: string): any[];
declare function snipContacts(cell: any, contacts: any, edge: any, reach?: number): (number | any[])[];
declare function pickSnips(cell: any, world: any, edge: any, reach: any): {
    contacts: any[];
    snips: number | any[];
    excesses: number | any[];
    reach: number | any[];
};
declare function swapSnips(cell: any, snips: any, edge: any): {
    birth: number;
    splash: any;
    position: any[];
    dimensions: number[];
    clear(image: any): void;
    colour: any;
    draw(image: any): void;
}[];
declare function defaultJudge(cells: any): number;
declare function defaultCompare(a: any, b?: number): boolean;
declare function defaultFilter(cell: any): boolean;
declare function tryToSleep(cell: any, world: any, { edges, judge, compare, filter }?: {
    edges?: string[];
    judge?: (cells: any) => number;
    compare?: (a: any, b?: number) => boolean;
    filter?: (cell: any) => boolean;
}): any;
declare function average(array: any): number;
declare function scoresAreBetter(a: any, b: any): boolean;
declare function equals(a: any, b: any): boolean;
declare function move(cell: any, world: any, edge: any, speed: any, minSize?: number): any[][];
declare function sleep(cell: any, world: any, edge: any, filter: any): {
    oldCells: any[];
    newCells: any[];
};
declare function distanceToBounds(point: any, bounds: any): number;
//# sourceMappingURL=sugar.d.ts.map