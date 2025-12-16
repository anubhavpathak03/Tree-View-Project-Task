import { Position } from "@xyflow/react";

export function getSubtreeWidth(node) {
  if (!node.children || !node.expanded) { // agar vo leaf node (koi children nhi) hua tho ya phir agar vo expanded nhi hai false hai us case mein aagye function nhi karunga
    return 1;
  }

  return node.children.reduce(
    (sum, child) => sum + getSubtreeWidth(child),
    0
  );
}

export function buildingTreeLayout (
    node, x, y, nodes, edges, parentId, toggleNode
) {
    const width = getSubtreeWidth(node);

    nodes.push({
        id: node.id,
        type: "treeNode",
        data: {
            label: node.label,
            expanded: node.expanded,
            hasChildren: !!node.children,
            onToggle: () => toggleNode(node.id),
        },
        position: { x: x + width * 80, y },
    });

    if (parentId) {
        edges.push({
            id: `${parentId}-${node.id}`,
            source: parentId,
            target: node.id,
        });
    }

    // Stop recursion
    if (!node.children || !node.expanded) return;

    // Children positioning
    let currentX = x;

    node.children.forEach((child) => {
        const childWidth = getSubtreeWidth(child);

        buildingTreeLayout(
            child,
            currentX,
            y + 120,
            nodes,
            edges,
            node.id,
            toggleNode
        );
        currentX += childWidth * 160;
    });
}