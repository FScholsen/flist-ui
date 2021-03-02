import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  unsafeCSS,
  query,
} from "lit-element";
// See https://lit-html.polymer-project.org/guide/styling-templates
// import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import style from "./style.css";

@customElement("flist-button")
export class FlistButton extends LitElement {
  // Declare observed properties
  @property({ type: String, attribute: true, reflect: true })
  type: "submit" | "button" | "auto" = "submit";

  @property({ type: String, attribute: true, reflect: true })
  class?: string = "";

  @property({ type: Boolean, attribute: true, reflect: true })
  disabled?: boolean = false;

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

  focusHandler(): void {
    return this.button?.focus();
  }

  clickHandler(): void {
    return this.button?.click();
  }

  buttonClickHandler(event: Event): void {
    event.stopPropagation();
  }

  buttonFocusHandler(): void {
    // console.log(this);
  }

  // class="${ifDefined(!!this.class ? this.class : undefined)}"
  // class="${classMap(cssClasses)}"
  // Define the element's template
  render(): TemplateResult {
    return html`<button
      .type="${this.type}"
      ?disabled="${this.disabled}"
      class="${ifDefined(this.class ? this.class : undefined)}"
      @click="${this.buttonClickHandler}"
      @focus="${this.buttonFocusHandler}"
    >
      <slot>Send</slot>
    </button>`;
  }
  // Add this method to render as non shadow DOM
  // createRenderRoot() {
  //   return this;
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-button": FlistButton;
  }
}
