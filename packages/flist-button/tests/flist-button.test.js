"use strict";
import { suite, test, setup } from "mocha";
import chai from "chai";
import { html, fixture, expect } from "@open-wc/testing";
import { FlistButton } from "../dist/flist-button";
const assert = chai.assert;

suite("flist-button empty", () => {
  let element;
  let button;
  let slot;
  let text;
  setup(async () => {
    element = await fixture(html`<flist-button></flist-button>`);
    button = element.shadowRoot?.querySelector("button");
    slot = button.querySelector("slot");
    text = slot.textContent;
  });
  test("is defined", () => {
    assert.instanceOf(element, FlistButton);
  });
  test("element has default type submit", () => {
    expect(element.type).to.equal("submit");
  });
  test("element default shadow root contains button", () => {
    expect(button).to.exist;
  });
  test("button has default type submit ", () => {
    expect(button.type).to.equal("submit");
  });
  test("button has slot ", () => {
    expect(slot).to.exist;
  });
  test("slot has default text", () => {
    expect(text).to.exist;
  });
  test("slot textContent has default value 'Send'", () => {
    expect(text).to.equal("Send");
  });
});
