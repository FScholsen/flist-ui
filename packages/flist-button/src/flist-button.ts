import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  unsafeCSS,
  query,
  eventOptions,
} from "lit-element";
// See https://lit-html.polymer-project.org/guide/styling-templates
// import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import style from "./style.css";

/**
 * @element flist-button - FlistButton
 * @attr {"submit" | "button" | "auto"} type - The type of the button
 * @attr {String} class - The class of the button
 * @attr {Boolean} disabled - Set to true to disable the button
 * @attr {Boolean} rounded - Set to true to have a rounded corners button
 * @cssprop --flist-button-color - Controls the color of the button
 * @cssprop --flist-button-bg-color - Controls the background-color of the button
 * @cssprop --flist-button-border-color - Controls the border-color of the button
 * @cssprop --flist-button-font-family - Controls the font-family of the button
 * @cssprop --flist-button-font-weight - Controls the font-weigt of the button
 * @cssprop --flist-button-font-size - Controls the font-size of the button
 * @cssprop --flist-button-cursor - Controls the cursor type of the button
 * @fires flist-button-click - Dispatched when the button is clicked
 * @fires flist-button-disabled-click - Dispatched when the button is clicked but is disabled
 * @csspart button - The button
 * @slot - The default button slot
 * @query button - The HTMLButtonElement instance
 *
 */
@customElement("flist-button")
export class FlistButton extends LitElement {
  /**
   * @type {"submit" | "button" | "auto"}
   */
  @property({ type: String, attribute: true, reflect: true })
  type: "submit" | "button" | "auto" = "submit";

  /**
   * @type {string}
   */
  @property({ type: String, attribute: true, reflect: true })
  class?: string = "";

  /**
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: true, reflect: true })
  disabled?: boolean = false;

  /**
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: true, reflect: true })
  rounded?: boolean = false;

  /**
   * @type {HTMLButtonElement}
   */
  @query("button")
  button?: HTMLButtonElement;

  static styles: CSSResult = unsafeCSS(style);

  /**
   * connectedCallback
   */
  connectedCallback(): void {
    super.connectedCallback();
    // Map class attribute to the button class attribute
    // const cssClasses = {};
    // this.class?.split(" ").map((cssClass) => {
    //   console.log(cssClass);
    //   console.log(this.button);
    //   this.button?.classList.add(cssClass);
    //   // return (cssClasses[cssClass] = !!cssClass);
    // });
    // console.log(cssClasses);
    // this.class = undefined;
    // Map style to the button
    // if (this.button) this.button.style = classMap(cssClasses);

    // Map event handlers
    this.addEventListener("focus", this.focusHandler);
    this.addEventListener("click", this.clickHandler);
  }

  // firstUpdated(changedProperties) {
  // if (this.button) this.button.onclick = () => console.log("clicked");
  // }

  @eventOptions({ capture: true })
  focusHandler(event: FocusEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log("focused");
    return;
  }

  @eventOptions({ capture: true })
  clickHandler(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (this.disabled) {
      this.dispatchEvent(new CustomEvent("flist-button-disabled-click"));
      return;
    }
    this.dispatchEvent(new CustomEvent("flist-button-click"));
    return;
  }

  // class="${ifDefined(!!this.class ? this.class : undefined)}"
  // class="${classMap(cssClasses)}"
  // Define the element's template
  render(): TemplateResult {
    return html`<button
      part="button"
      .type="${this.type}"
      ?disabled="${this.disabled}"
      class="${ifDefined(this.class ? this.class : undefined)}"
      tabindex="0"
    >
      <slot tabindex="0">Send</slot>
    </button>`;
  }
  // Add this method to render as non shadow DOM
  // createRenderRoot() {
  //   return this;
  // }
}
