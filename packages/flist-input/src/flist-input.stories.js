import { html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import "../dist/flist-input";

export default {
  title: "Components/FlistInput",
  components: "flist-input",
  argTypes: {
    name: {
      control: {
        type: "text",
      },
      defaultValue: "input",
    },
    placeholder: {
      control: {
        type: "text",
      },
      defaultValue: "",
    },
  },
};

const Template = (args) => {
  return html`
    <flist-input name=${args.name} placeholder=${ifDefined(args.placeholder)}>
    </flist-input>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  name: "Primary",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Name",
};
