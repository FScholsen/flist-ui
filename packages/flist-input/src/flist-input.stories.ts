import { withKnobs, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/web-components";
import { html, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FlistInput } from "../dist/flist-input";

export default {
  title: "Components/FlistInput",
  components: FlistInput,
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

const TemplateLitHmtl: any = (args: StoryCustomArgs): TemplateResult => {
  return html`
    <flist-input name=${args.name} placeholder=${ifDefined(args.placeholder)}>
    </flist-input>
  `;
};

export const Primary = TemplateLitHmtl.bind({});
Primary.args = {
  name: "Primary",
};

const Template: any = (args: any): any => {
  const el = new FlistInput();
  el.name = args.name;
  el.placeholder = args.placeholder;
  return el;
};

export const Secondary = Template.bind({});
Secondary.args = {
  name: "Primary",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Test",
};

// Legacy way of creating stories
storiesOf("Components/FlistInput", module)
  .addDecorator(withKnobs)
  .add("Tertiary", (args: any) => {
    const el = new FlistInput();
    el.name = text("name", args.name);
    el.placeholder = text("placeholder", args.placeholder);
    return el;
  });
