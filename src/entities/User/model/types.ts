  export type User = {
    id: number;
    name: string;
    yearStartAt: number;
    yearEndAt: number;
    awards: string[];
    information: string;
    medal: boolean;
    image: string;
    next: number;
    ranks: string;
};


export type FilterUser = {
    yearStart?: number;
    yearEnd?: number;
    rank?: (string | null)[] | undefined;
    word?: string[] | undefined;
};