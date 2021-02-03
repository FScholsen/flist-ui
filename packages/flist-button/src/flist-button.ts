import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
  CSSResult,
  query,
} from "lit-element";
// import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";

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

  static styles: CSSResult = css`
    :host {
      display: inline-flex;
      font-family: inherit;
      color: rgba(0, 20, 0, 1) !important;
      border: none !important;
      border-radius: 4px;
      padding: 0 !important;
      margin: 0 !important;
    }

    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-family: inherit;
      color: inherit;
      border: 1px solid #cecece !important;
      border-radius: inherit !important;
      outline: none;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.2s ease;
    }
    :host([rounded]) {
      border-radius: 100px;
    }
    :host([disabled]) {
      opacity: 0.5;
    }
    :host button:hover:not(:disabled) {
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
    :host button:active:not(:disabled) {
      box-shadow: none;
    }

    :host([disabled]) button {
      cursor: not-allowed;
    }
    :host([disabled]) button,
    :host([disabled]) button:hover {
      box-shadow: none;
    }
  `;

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
