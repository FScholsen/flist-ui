import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
  CSSResult,
} from "lit-element";

@customElement("flist-button")
export class FlistButton extends LitElement {
  // Declare observed properties
  @property()
  type: "submit" | "button" | "auto" = "submit";

  static styles: CSSResult = css`
    :host {
    }
    button {
      font-family: inherit;
      font-size: 1.125rem;
      border: 1px solid #cecece;
      border-radius: 4px;
      outline: none;
      padding: 0.25rem 0.5rem;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
    button:hover {
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
    button:active {
      box-shadow: none;
    }
  `;

  focusHandler(): void {
    console.log("focus");
  }

  clickHandler(): void {
    console.log("click");
  }

  // Define the element's template
  render(): TemplateResult {
    return html`<button
      .type="${this.type}"
      @click="${this.clickHandler}"
      @focus="${this.focusHandler}"
    >
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-button": FlistButton;
  }
}
