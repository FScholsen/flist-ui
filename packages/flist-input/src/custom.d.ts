declare global {
  interface HTMLElementTagNameMap {
    "flist-input": FlistInput;
  }
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface StoryTemplate {
  (args: StoryCustomArgs): TemplateResult;
  args?: typeof StoryCustomArgs;
}

interface StoryCustomArgs {
  name: string;
  placeholder: string;
}
