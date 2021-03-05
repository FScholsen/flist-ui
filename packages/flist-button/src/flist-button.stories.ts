// import { action } from "@storybook/addon-actions";
import { withKnobs, text, color, select } from "@storybook/addon-knobs";
import { html, TemplateResult } from "lit-element";
import "../dist/flist-button";

export default {
  title: "Components/FlistButton",
  components: "flist-button",
  decorators: [withKnobs],
  actions: {
    handles: ["onclick"],
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
    backgroundColor: {
      control: {
        type: "color",
      },
      defaultValue: "#4caf50",
    },
    borderColor: {
      control: {
        type: "color",
      },
      defaultValue: "#4caf50",
    },
    color: {
      control: {
        type: "color",
      },
      defaultValue: "white",
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
    onClick: {
      action: "clicked",
    },
  },
};

// export const actionsData = {
//   onClick: action("onClick"),
// };

const Template: StoryTemplate = (args: StoryCustomArgs): TemplateResult => {
  return html`
    <style scoped>
      flist-button {
        --flist-button-bg-color: ${color(
        "--flist-button-bg-color",
        `${args.backgroundColor}`
      )};
        --flist-button-border-color: ${color(
        "--flist-button-border-color",
        `${args.borderColor}`
      )};
        --flist-button-color: ${color("--flist-button-color", `${args.color}`)};
        --flist-button-cursor: ${select(
        "--flist-button-cursor",
        ["pointer", "help", "progress", "wait"],
        "help"
      )};

        height: ${text("height", "auto")};
        width: ${text("width", "auto")};
        font-family: ${text(
        "font-family",
        "Tahoma, Geneva, Verdana, sans-serif"
      )};
        font-weight: ${text("font-weight", "400")};
      }
      ${args.css}
    </style>

    <script>
      function onClick(event) {
        //${args.onClick()};
        console.log("onClick");
      }
    </script>
    <flist-button
      @click=${args.onClick()}
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
