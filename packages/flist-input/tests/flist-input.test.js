"use strict";
import { html, fixture } from "@open-wc/testing";
import { FlistInput } from "../dist/flist-input";

// describe("flist-input", () => {
//   it("needs tests");
// });

const assert = chai.assert;

suite("flist-input", () => {
  test("is defined", () => {
    const el = document.createElement("flist-input");
    assert.instanceOf(el, FlistInput);
  });
  test("renders with default values", async () => {
    const el = await fixture(html`<flist-input></flist-input>`);
    assert.shadowDom.equal(
      el,
      `
      <input type="text" autocomplete="off" name="default" placeholder>
      `
    );
  });
});
