import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ProgressBarWithStages from './ProgressBarWithStages.jsx';


export class OptionsetProgressbar implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private allOptions: ComponentFramework.PropertyHelper.OptionMetadata[];
    private defaultValue: number | undefined;
    private isDisabled: boolean;
    private dropdownOptions: any;
    private container: HTMLDivElement;
    private currentValue: number | null | undefined;
    private notifyOutputChanged: () => void;
    private isReadOnly: boolean;

    /**
     * Empty constructor.
     */
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        let opts = context.parameters.OptionSetField.attributes!.Options;
        this.allOptions = opts;
        this.isReadOnly = (context.parameters.OptionSetField.attributes?.Description === "readonly");
        let i = 0;
        this.dropdownOptions = this.allOptions.map((option: ComponentFramework.PropertyHelper.OptionMetadata, i: any) => ({ Value: option.Value, Label: option.Label, Color: { color: option.Color }, Id: i + 1, Status: "" }))
        this.defaultValue = context.parameters.OptionSetField.attributes?.DefaultValue;
        //if ((typeof this.defaultValue === 'undefined') || this.defaultValue == 0) this.defaultValue = this.dropdownOptions[0].Value;

        this.container = container;

        this.notifyOutputChanged = notifyOutputChanged;

        this.renderControl(context);
    }

    private renderControl(context: ComponentFramework.Context<IInputs>): void {
        let currentValueObj = this.dropdownOptions.filter((element: { Value: number; }) => element.Value == context.parameters.OptionSetField.raw)
        currentValueObj.length == 0 ? this.currentValue = this.defaultValue : this.currentValue = currentValueObj[0].Value;
        console.log("Current value: " + this.currentValue);
        let completed = !(typeof this.currentValue === 'undefined' || this.currentValue == 0 || this.currentValue == -1);

        for (let clave in this.dropdownOptions) {
            if (this.dropdownOptions[clave].Value == this.currentValue) {
                this.dropdownOptions[clave].Status = "stepper-item active";
                completed = false;
            }
            else {
                (completed) ? this.dropdownOptions[clave].Status = "stepper-item completed" : this.dropdownOptions[clave].Status = "stepper-item";
            }
        }

        let params = {
            options: this.dropdownOptions.filter((element: { Value: number; }) => element.Value != 1), //El valor 1 no lo pintamos All completed
            selectedKey: this.currentValue,
            onChange: (newValue: number | null) => {
                if (this.isReadOnly == false) {
                    this.currentValue = newValue;
                    this.notifyOutputChanged();
                }
            },
            isDisabled: this.isDisabled,
            defaultValue: this.defaultValue,
            ReadOnly: this.isReadOnly
        };

        ReactDOM.render(React.createElement(ProgressBarWithStages, { params }), this.container);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.renderControl(context);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            OptionSetField: this.currentValue == null ? undefined : this.currentValue
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary    
        ReactDOM.unmountComponentAtNode(this.container);
    }
}
