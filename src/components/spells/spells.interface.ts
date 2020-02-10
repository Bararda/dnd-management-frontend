export interface SpellProps {
    name?: string;
}
export interface SchoolObj {
    [key: string]: string | boolean | number;
}
export interface TypeObj {
    [key: string]: string;
}

export interface SpellCardProps {
    spell?: any;
    schoolList: any;
    damageTypeList: any;
}

export interface ColorObj {
    [key: string]: string;
}
export interface TitleTextProps {
    title: string;
    text: string;
}