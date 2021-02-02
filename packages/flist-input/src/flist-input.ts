import { LitElement, html, customElement } from "lit-element";

@customElement("flist-input")
export class FlistInput extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "flist-input": FlistInput;
  }
}
