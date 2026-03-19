declare namespace shared {
    let clock: number;
    namespace brush {
        let colour: any;
    }
}
declare const Cell: {
    new (options?: {}): {
        birth: number;
        splash: any;
        position: any[];
        dimensions: number[];
        clear(image: any): void;
        colour: any;
        draw(image: any): void;
    };
};
declare function getPixelIndex(image: any, x: any, y: any): number;
declare function setImageAlpha(image: any, alpha: any): void;
declare class World {
    constructor({ colour }?: {
        colour?: any;
    });
    cells: any;
    caches: {
        left: any;
        right: any;
        top: any;
        bottom: any;
    };
    add(cell: any): void;
    delete(cell: any): void;
    cache(cell: any): void;
    uncache(cell: any): void;
    draw(image: any): void;
    replace(cells: any, newCells: any): any;
    pick(position: any): any;
}
declare function getSplashDigits(splash: any): any;
declare function mutateSplash(splash: any): number;
declare namespace DIRECTION {
    namespace left {
        import opposite = DIRECTION.right;
        export { opposite };
        import adjacent = DIRECTION.top;
        export { adjacent };
    }
    namespace right {
        import opposite_1 = DIRECTION.left;
        export { opposite_1 as opposite };
        import adjacent_1 = DIRECTION.bottom;
        export { adjacent_1 as adjacent };
    }
    namespace top {
        import opposite_2 = DIRECTION.bottom;
        export { opposite_2 as opposite };
        import adjacent_2 = DIRECTION.right;
        export { adjacent_2 as adjacent };
    }
    namespace bottom {
        import opposite_3 = DIRECTION.top;
        export { opposite_3 as opposite };
        import adjacent_3 = DIRECTION.left;
        export { adjacent_3 as adjacent };
    }
}
declare namespace AXIS {
    namespace x {
        import opposite_4 = AXIS.x;
        export { opposite_4 as opposite };
        import adjacent_4 = AXIS.y;
        export { adjacent_4 as adjacent };
    }
    namespace y {
        import opposite_5 = AXIS.y;
        export { opposite_5 as opposite };
        import adjacent_5 = AXIS.x;
        export { adjacent_5 as adjacent };
    }
}
declare namespace global {
    let world: World;
    let camera: any;
    let image: any;
}
declare const stage: any;
//# sourceMappingURL=script.d.ts.map