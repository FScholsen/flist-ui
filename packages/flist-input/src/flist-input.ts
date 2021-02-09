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

  @property()
  placeholder = "";

  static styles: CSSResult = css`
    :host {
      display: inline-flex;
      flex: 1 1 12rem;
      min-width: 2rem;
      height: 100%;
      max-width: 32rem;
      max-height: 3rem;
    }
    input {
      background-color: #cecece;
      border: 1px solid #cecece;
      border-radius: 0.25rem;
      padding: 0.5rem;
      outline: none;
      box-shadow: 0 0 1px 0 rgba(0, 0.2, 0, 0.2),
        0 0 1px 1px rgba(0, 0, 0, 0.14);
      transition: box-shadow 0.3s ease;
      width: 100%;
    }
    input:focus {
      border: 1px solid rgba(0, 0.2, 0, 0.25);
      box-shadow: 0 0 2px 1px rgba(0, 0.2, 0, 0.25);
    }
  `;

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0));
    let res = await this.test();
    console.log(res);

    this.addEventListener("focus", this._handleFocus);
  }

  private _handleFocus() {
    // console.log("focused");
  }

  async test(): Promise<string> {
    return new Promise((resolve) => {
      return resolve("loaded");
    });
  }

  render(): TemplateResult {
    return html`<input
      type="text"
      name="${this.name}"
      autocomplete="off"
      placeholder="${this.placeholder}"
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "flist-input": FlistInput;
  }
}
