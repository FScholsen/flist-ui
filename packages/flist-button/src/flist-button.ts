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
  text = "awesome";

  static styles: CSSResult = css`
    :host {
      color: red;
    }
  `;

  hoverHandler() {
    console.log("over");
  }

  clickHandler(): void {
    console.log("hello");
  }

  // Define the element's template
  render(): TemplateResult {
    return html`<button @click="${this.clickHandler}">${this.text}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-button": FlistButton;
  }
}
