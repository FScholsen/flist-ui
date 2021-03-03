import { html } from "lit-element";
import "../dist/flist-button";

export default {
  title: "Components/FlistButton",
  components: "flist-button",
  argTypes: {
    slot: {
      control: {
        type: "text",
      },
      defaultValue: "Button",
    },
    type: {
      control: {
        type: "text",
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
    class: {
      control: {
        type: "text",
      },
      defaultValue: "button",
    },
  },
};

const Template = (args) => {
  return html`
    <flist-button
      class=${args.class}
      type=${args.type}
      ?disabled=${args.disabled}
      ?rounded=${args.rounded}
    >
      ${args.slot}
    </flist-button>
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

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const RoundedDisabled = Template.bind({});
RoundedDisabled.args = {
  rounded: true,
  disabled: true,
};
