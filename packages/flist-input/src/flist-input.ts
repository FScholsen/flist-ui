import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
  CSSResult,
} from "lit-element";

@customElement("flist-input")
export class FlistInput extends LitElement {
  @property()
  name = "default";

  static styles: CSSResult = css`
    :host {
    }
    input {
      background-color: red;
    }
  `;

  render(): TemplateResult {
    return html`<input type="text" name="${this.name}" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-input": FlistInput;
  }
}
