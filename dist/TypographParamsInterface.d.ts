import { KeyboardsNames } from "./Keyboards";
export default interface InterfaceParams {
    selector: string;
    speed?: number;
    fixePosition?: boolean;
    cursor?: string;
    mistype?: boolean;
    selectBeforeErase?: boolean;
    keyboard?: keyof typeof KeyboardsNames;
    mistypeRate?: number;
    humanize?: boolean;
    text?: string;
    ignoreWhitespace?: boolean;
    synchroniseCursors?: boolean;
    retyped?: boolean;
}
