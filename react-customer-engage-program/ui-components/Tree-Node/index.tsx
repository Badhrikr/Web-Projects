import { useState } from "react";
import uuid from "short-uuid";
import { chevron_down, up_arrow } from "../../helpers/icons";
import Icon from "../Icon";
import { TreeNodeProps } from "./model";

function TreeNode(props: TreeNodeProps) {
  const { name, icon, iconType, children, link } = props;

  const [showChildren, setShowChildren] = useState(false);

  const toggle = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="flex flex-col py-1 px-2">
      <button className="flex items-center gap-2 p-2" onClick={toggle}>
        <div className="flex items-center flex-start gap-1">
          <Icon
            icon={icon ?? <></>}
            iconType={iconType}
            size="md"
            theme="secondary"
          />
          <span> {name} </span>
        </div>

        {children && children?.length > 0 && (
          <Icon
            icon={showChildren ? up_arrow : chevron_down}
            size="sm"
            theme="secondary"
          />
        )}
      </button>

      {showChildren && (
        <div className="ml-4">
          {children?.map((treeNode) => (
            <TreeNode key={uuid.constants.flickrBase58} {...treeNode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
