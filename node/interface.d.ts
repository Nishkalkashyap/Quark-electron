/// <reference types="codemirror" />
export interface johnnyFiveClassInterface {
    class: "Accelerometer" | "Altimeter" | "Animation" | "Barometer" | "Board" | "Boards" | "Button" | "Compass" | "ESC" | "ESCs" | "Expander" | "Fn" | "GPS" | "Gyro" | "Hygrometer" | "IMU" | "IR.Reflect.Array" | "Joystick" | "Keypad" | "LCD" | "Led" | "Led.Digits" | "Led.Matrix" | "Led.RGB" | "Leds" | "Light" | "Motion" | "Motor" | "Motors" | "Multi" | "Piezo" | "Pin" | "Proximity" | "Relay" | "Relays" | "Sensor" | "Servo" | "Servos" | "ShiftRegister" | "Stepper" | "Switch" | "Thermometer";
    variable: string;
    arguments?: any;
    setup?: Function;
}
export interface menuListInterface {
    component?: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';
    icon?: string;
}
export interface menuListInterface {
    class?: "Accelerometer" | "Altimeter" | "Animation" | "Barometer" | "Board" | "Boards" | "Button" | "Compass" | "ESC" | "ESCs" | "Expander" | "Fn" | "GPS" | "Gyro" | "Hygrometer" | "IMU" | "IR.Reflect.Array" | "Joystick" | "Keypad" | "LCD" | "Led" | "Led.Digits" | "Led.Matrix" | "Led.RGB" | "Leds" | "Light" | "Motion" | "Motor" | "Motors" | "Multi" | "Piezo" | "Pin" | "Proximity" | "Relay" | "Relays" | "Sensor" | "Servo" | "Servos" | "ShiftRegister" | "Stepper" | "Switch" | "Thermometer";
    icon?: string;
}
export interface codeInterface {
    js: CodeMirror.Doc;
    css: CodeMirror.Doc;
}
export interface analogReadInterface {
    variable: string;
    pin: number;
    interval: number;
}
export interface componentDataInterface {
    config: {
        component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';
        id: number;
        css_class: string;
        function: string;
        variable: string;
        bind?: string;
        object?: any;
    };
    code: codeInterface;
}
export interface globalConfigInterface {
    js: {
        global_variables?: Array<globalVariableInterface | string>;
        binding_variables?: Array<string>;
        components?: Array<johnnyFiveClassInterface>;
        rendered_views?: Array<renderedViewInterface>;
        analogRead?: Array<analogReadInterface>;
        setup?: Function | string;
        renderer_update_interval: number;
    };
    css: string;
}
export interface renderedViewInterface {
    component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';
    id: number;
    variable: string;
    bind?: string;
    name?: string;
    description?: string;
}
export interface globalVariableInterface {
    variable: string;
    initialize?: any;
}
