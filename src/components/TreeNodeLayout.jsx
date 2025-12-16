import "./TreeNodeLayout.css";
import { Handle, Position } from "@xyflow/react";

export default function TreeNodeLayout({data}) {  
    const { label, hasChildren, expanded, onToggle } = data;

    return (
        <div className="tree-node">
            {/* TARGET handle (parent se aane wali line) */}
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: "#555" }}
            />
            <span className="label">{label}</span>

            {hasChildren && (
                <button className="toggle-btn" onClick={onToggle}>
                {expanded ? "-" : "+"}
                </button>
            )}

            {/* SOURCE handle (children ko jaane wali line) */}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: "#555" }}
            />
        </div>
    );
};