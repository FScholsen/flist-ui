import { LitElement, html, customElement, property } from "lit-element";

@customElement("flist-button")
export class FlistButton extends LitElement {
  // Declare observed properties
  @property()
  text = "awesome";

  clickHandler() {
    console.log("execute virus");
  }

  // Define the element's template
  render() {
    return html`<button @click="${this.clickHandler}">
      ${this.text} button here
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-button": FlistButton;
  }
}
