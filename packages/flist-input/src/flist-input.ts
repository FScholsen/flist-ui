import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  unsafeCSS,
} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
// PostCSS and autoprefixer will only work if you import
// css from an external file and TypeScript doesn't complain about
// type declaration (.d.ts) because custom.d.ts declare type for this module
// (so make sure to include a custom.d.ts with the same content)
import style from "./style.css";

@customElement("flist-input")
export class FlistInput extends LitElement {
  /**
   * The name of the input
   * @type {string}
   */
  @property({ type: String, attribute: true, reflect: true })
  name?: string = "default";

  /**
   * The input placeholder
   * @type {string}
   */
  @property({ type: String, attribute: true, reflect: true })
  placeholder?: string = "";

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
      name="${ifDefined(this.name)}"
      autocomplete="off"
      placeholder="${ifDefined(this.placeholder)}"
    />`;
  }
}
