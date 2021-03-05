declare global {
  interface HTMLElementTagNameMap {
    "flist-button": FlistButton;
  }
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Storybook
interface StoryTemplate {
  (args: StoryCustomArgs): TemplateResult;
  args?: typeof StoryCustomArgs;
}

interface StoryCustomArgs {
  backgroundColor: string;
  borderColor: string;
  css: string;
  color: string;
  onClick: () => EventHandlerNonNull;
  class: string;
  type: "submit" | "button" | "auto";
  rounded: boolean;
  disabled: boolean;
  slot: string;
}
