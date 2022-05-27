import React from "react";

import s from "./TreeItem.module.scss";

import ArrowIcon from "images/arrow.svg";
import FolderIcon from "images/folder.svg";
import FileIcon from "images/file.svg";
import BinIcon from "images/bin.svg";

interface TreeItemProps {
  id: string;
  handleSelect: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  deleteNode: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  label: string;
  leaves: JSX.Element[];
}

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  handleSelect,
  deleteNode,
  label,
  leaves,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const isEmpty = leaves.length < 1;

  const handleChangeOpen = () => {
    if (!isEmpty) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={s.root}>
      <div
        className={s.headline}
        style={{ marginLeft: isEmpty ? "16px" : "0" }}
        onClick={handleChangeOpen}
        onDoubleClick={(e) => handleSelect(e, id)}
      >
        {!isEmpty ? (
          <>
            <ArrowIcon
              className={s.arrowIcon}
              style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
            />
            <FolderIcon className={s.folderIcon} />
          </>
        ) : (
          <FileIcon className={s.fileIcon} />
        )}
        <div>{label}</div>
        <BinIcon className={s.bin} onClick={(e) => deleteNode(e, id)} />
      </div>
      <div className={s.content} style={{ display: isOpen ? "block" : "none" }}>
        {leaves}
      </div>
    </div>
  );
};

export default React.memo(TreeItem);
