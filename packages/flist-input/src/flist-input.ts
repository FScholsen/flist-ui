import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  unsafeCSS,
} from "lit-element";
// PostCSS and autoprefixer will only work if you import
// css from an external file and TypeScript doesn't complain about
// type declaration (.d.ts) because custom.d.ts declare type for this module
// (so make sure to include a custom.d.ts with the same content)
import style from "./style.css";

@customElement("flist-input")
export class FlistInput extends LitElement {
  @property()
  name = "default";

  @property()
  placeholder = "";

  static styles: CSSResult = unsafeCSS(style);

  async firstUpdated(): Promise<void> {
    await new Promise((r) => setTimeout(r, 0));
    const res = await this.test();
    console.log(res);

    this.addEventListener("focus", this._handleFocus);
  }

  private _handleFocus() {
    console.log("focused");
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
