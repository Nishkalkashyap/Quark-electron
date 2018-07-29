export interface widgetsListInterface {
    name: string;
    component: string;
    icon?: string;
}
export interface codeInterface {
    js: string;
    css: string;
}
export interface analogReadInterface {
    variable: string;
    pin: number;
    interval: number;
}
export interface componentDataInterface {
    config: {
        tag: string;
        class: string;
        variable: string;
        component: 'Led';
    };
    code: codeInterface;
    local: toggleComponentInterface;
}
export interface toggleComponentInterface {
    state: boolean;
    title: string;
    pin: number;
}
export interface globalConfigInterface {
    js: {
        components: Array<componentsArrayInterface>;
        analogRead?: Array<analogReadInterface>;
        setup?: Function | string;
        mode: 'auto' | 'manual';
    };
    css: string;
}
export interface componentsArrayInterface {
    component: "Led";
    variable: string;
    data: toggleComponentInterface;
}
