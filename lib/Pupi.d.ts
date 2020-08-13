/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */
export declare type PupiData = [string[]];
export declare type PupiPoint = {
    x: number;
    y: number;
};
/** Pupi resolves an alphabet soup */
export default class Pupi {
    readonly data: PupiData;
    private limitX;
    private limitY;
    constructor(data: PupiData);
    find(value: string): PupiPoint[];
    private doWalk;
}
//# sourceMappingURL=Pupi.d.ts.map