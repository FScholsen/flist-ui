// import { withKnobs, text } from "@storybook/addon-knobs";
// import { storiesOf } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FlistInput } from "../dist/flist-input";
import "../dist/flist-input";

export default {
  title: "Components/FlistInput",
  components: [FlistInput, "flist-input"],
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

export const PrimaryLitHtml = TemplateLitHmtl.bind({});
PrimaryLitHtml.args = {
  name: "Primary",
};

const actions = {
  onFocus: action("focus"),
  onBlur: action("blur"),
};

const Template: any = (args: any): any => {
  const el = new FlistInput();
  el.name = args.name;
  el.placeholder = args.placeholder;
  el.onfocus = actions.onFocus;
  el.onblur = actions.onBlur;
  return el;
};

export const Primary = Template.bind({});
Primary.args = {
  name: "Primary",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Test",
};

// Legacy way of creating stories
// storiesOf("Components/FlistInput", module)
//   .addDecorator(withKnobs)
//   .add("Secondary", (args: any) => {
//     const el = new FlistInput();
//     el.name = text("name", args.name);
//     el.placeholder = text("placeholder", args.placeholder);
//     return el;
//   });
