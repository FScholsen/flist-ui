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
  slot: string;
  type: "submit" | "button" | "auto";
  disabled: boolean;
  rounded: boolean;
  color: string;
  backgroundColor: string;
  borderColor: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  cursor: string;
  height: string;
  width: string;
  css: string;
  class: string;
}
