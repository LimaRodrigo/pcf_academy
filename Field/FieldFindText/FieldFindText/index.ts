import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Main, IMainProps } from "./Main";
import * as React from "react";
import * as MOCK from "./Mock"

export class FieldFindText
  implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private inputEntity: string | undefined;
  private inputAttribute: string | undefined;
  /**
   * Empty constructor.
   */
  constructor() { }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.inputEntity = context.parameters.entity.raw || "";
  }

  /**p
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    const props: IMainProps = {
      entity: context.parameters.entity.raw || "",
      attribute: context.parameters.attribute.raw || "",
      SetInputChanges: this.SetInputChanges.bind(this)
    };
    return React.createElement(Main, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      entity: this.inputEntity,
      attribute: this.inputAttribute
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  public async SetInputChanges(entity: string | undefined, attribute: string | undefined): Promise<void> {
    if (MOCK.isMock) return;
    this.inputEntity = entity;
    this.inputAttribute = attribute;
    this.notifyOutputChanged();
  }
}
