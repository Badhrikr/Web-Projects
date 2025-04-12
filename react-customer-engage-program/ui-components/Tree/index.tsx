import TreeNode from "../Tree-Node";
import uuid from "short-uuid";
import { TreeProps } from "./model";

function Tree(props: TreeProps) {
  const { treeData } = props;

  return (
    <div>
      {treeData.map((data) => (
        <TreeNode key={uuid.constants.flickrBase58} {...data} />
      ))}
    </div>
  );
}

export default Tree;
