export declare const KeyboardsNames: {
    azerty: "azerty";
    qwerty: "qwerty";
};
export declare const keyboards: {
    [key in keyof typeof KeyboardsNames]: string[];
};
