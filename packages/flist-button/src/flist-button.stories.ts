import { action } from "@storybook/addon-actions";
import { withKnobs, text, color, select, number } from "@storybook/addon-knobs";
import { html, TemplateResult } from "lit-element";
import "../dist/flist-button";

export default {
  title: "Components/FlistButton",
  components: "flist-button",
  decorators: [withKnobs],
  actions: {
    handles: ["onClick"],
  },
  argTypes: {
    slot: {
      control: {
        type: "text",
      },
      defaultValue: "Button",
    },
    type: {
      control: {
        type: "select",
        options: ["submit", "button", "auto"],
      },
      defaultValue: "submit",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    rounded: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    color: {
      name: "--flist-button-color",
      control: {
        type: "color",
      },
      defaultValue: "white",
    },
    backgroundColor: {
      name: "--flist-button-bg-color",
      control: {
        type: "color",
      },
      defaultValue: "#4caf50",
    },
    borderColor: {
      name: "--flist-button-border-color",
      control: {
        type: "color",
      },
      defaultValue: "#4caf50",
    },
    fontFamily: {
      name: "--flist-button-font-family",
      control: {
        type: "select",
        options: [
          "inherit",
          "Arial",
          "Tahoma",
          "Geneva",
          "Verdana",
          "sans-serif",
        ],
      },
      defaultValue: "Tahoma",
    },
    fontWeight: {
      name: "--flist-button-font-weight",
      control: {
        type: "number",
        range: true,
        min: 100,
        max: 1000,
        step: 100,
      },
      defaultValue: 400,
    },
    fontSize: {
      name: "--flist-button-font-size",
      control: {
        type: "range",
        min: 1,
        max: 64,
        step: 1,
      },
      defaultValue: 13.333,
    },
    cursor: {
      name: "--flist-button-cursor",
      control: {
        type: "select",
        options: ["inherit", "pointer", "help", "progress", "wait"],
      },
      defaultValue: "inherit",
    },
    height: {
      control: {
        type: "text",
      },
      defaultValue: "auto",
    },
    width: {
      control: {
        type: "text",
      },
      defaultValue: "auto",
    },
    class: {
      control: {
        type: "text",
      },
      defaultValue: "button",
    },
    css: {
      control: {
        type: "text",
      },
      defaultValue: "",
    },
  },
};

const actions = {
  onClick: action("click"),
  onFlistButtonClick: action("flist-button-click"),
  onFlistButtonDisabledClick: action("flist-button-disabled-click"),
  onFocus: action("focus"),
};

const Template: StoryTemplate = (args: StoryCustomArgs): TemplateResult => {
  return html`
    <style scoped>
      flist-button {
        --flist-button-color: ${args.color};
        --flist-button-bg-color: ${args.backgroundColor};
        --flist-button-border-color: ${args.borderColor};
        --flist-button-font-family: ${args.fontFamily};
        --flist-button-font-weight: ${args.fontWeight};
        --flist-button-font-size: ${args.fontSize}px;
        --flist-button-cursor: ${args.cursor};
        height: ${args.height};
        width: ${args.width};
      }
      ${args.css}
    </style>

    <flist-button
      @click=${args.disabled ? void 0 : actions.onClick}
      @focus=${actions.onFocus}
      class=${args.class}
      type=${args.type}
      ?disabled=${args.disabled}
      ?rounded=${args.rounded}
      @flist-button-click=${actions.onFlistButtonClick}
      @flist-button-disabled-click=${actions.onFlistButtonDisabledClick}
    >
      ${args.slot}
    </flist-button>

    <button ?disabled=${args.disabled} @click=${actions.onClick}>click</button>

    <script>
      document
        .querySelector("flist-button")
        .addEventListener("flist-button-click", (event) => {
          console.log(event);
        });
    </script>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  slot: "Send",
};

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
};

export const Large = Template.bind({});
Large.args = {
  css: `.button {
    width: 4rem;
    height: 4rem;
  }`,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const RoundedDisabled = Template.bind({});
RoundedDisabled.args = {
  rounded: true,
  disabled: true,
};

export const UsingCssPart = Template.bind({});
UsingCssPart.args = {
  css: `flist-button::part(button) {
    color: red;
    font-size: 16px;
  }`,
};

export const WithSlotSpan = Template.bind({});
WithSlotSpan.args = {
  slot: html`<span>hi</span>`,
};

export const WithSlotDiv = Template.bind({});
WithSlotDiv.args = {
  slot: html`<div><h1>Hey</h1></div>`,
};

const TemplateWithKnobs: StoryTemplate = (
  args: StoryCustomArgs
): TemplateResult => {
  return html`
    <style>
      flist-button {
        /* Legacy Knobs API */
        color: ${color("color", `white`)};
        background-color: ${color("background-color", `#4caf50`)};
        border-color: ${color("border-color", `#4caf50`)};
        font-family: ${text("font-family", `inherit`)};
        font-weight: ${number("font-weight", 400, {
          range: true,
          min: 100,
          max: 1000,
          step: 100,
        })};
        cursor: ${select(
          "cursor",
          ["pointer", "help", "progress", "wait"],
          "help"
        )};
        height: ${number("height", 4, {
          range: true,
          min: 1,
          max: 10,
          step: 1,
        })}rem;
        width: ${number("width", 4, {
          range: true,
          min: 1,
          max: 10,
          step: 1,
        })}rem;
      }
    </style>
    <flist-button
      @click=${actions.onClick}
      class=${args.class}
      type=${args.type}
      ?disabled=${args.disabled}
      ?rounded=${args.rounded}
      @flist-button-click=${actions.onClick}
    >
      ${args.slot}
    </flist-button>
  `;
};

export const WithKnobs = TemplateWithKnobs.bind({});
// WithKnobs.args = {};
