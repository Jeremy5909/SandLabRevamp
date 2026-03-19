export declare const View: {
    new (options?: {}): {
        cast(position: any): number[];
        get(position: any): any;
        getCenter(): any;
        getBounds(): {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        pan(displacement: any): void;
        zoom(scale: any, center?: any): void;
        contains(position: any): boolean;
        resize(dimensions: any): void;
    };
};
export declare const Camera: {
    new (options?: {}): {
        registerControls(): void;
        cast(position: any): number[];
        get(position: any): any;
        getCenter(): any;
        getBounds(): {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        pan(displacement: any): void;
        zoom(scale: any, center?: any): void;
        contains(position: any): boolean;
        resize(dimensions: any): void;
    };
};
//# sourceMappingURL=camera.d.ts.map