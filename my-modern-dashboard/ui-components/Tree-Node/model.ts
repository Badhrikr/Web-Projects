import { IconBaseProps } from "../model";

interface TreeNodeProps extends Partial<IconBaseProps> {
  name: string;
  link?: string;
  children?: Array<TreeNodeProps>;
}

export type { TreeNodeProps };
