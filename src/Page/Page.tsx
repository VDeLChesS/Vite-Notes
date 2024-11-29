import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { Spacer } from "./Spacer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { NodeContainer } from "../Node/NodeContainer";


export const Page = () => {
    const { title, nodes, addNode, cover, setCoverImage, reorderNodes, setTitle } = useAppState();
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes });
    
    const handleDragEvent = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over?.id && active.id !== over?.id) {
            reorderNodes(active.id as string, over.id as string);
            
        }
    }
    
    return (
        <>
            <Cover filePath={cover} changePageCover={setCoverImage} />
            <div>
                <Title 
                    title={title}
                    changePageTitle={setTitle}
                    addNode={addNode}
                    handleChangeTitle={(e) => setTitle(e.target.value)}
                />
                <DndContext onDragEnd={handleDragEvent}>
                    <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
                    {nodes.map((node, index) => (
                        <NodeContainer
                            key={node.id}
                            node={node}
                            updateFocusedIndex={setFocusedNodeIndex}
                            isFocused={focusedNodeIndex === index}
                            index={index}
                        />
                    ))}
                    </SortableContext>
                    <DragOverlay/>
                </DndContext>
                {
                    nodes.map((node, index) => (
                        <NodeTypeSwitcher
                            key={node.id}
                            node={node}
                            updateFocusedIndex={setFocusedNodeIndex}
                            isFocused={focusedNodeIndex === index}
                            index={index}
                        />
                    ))
                }
                <Spacer
                    handleClick={() => {
                        addNode({ type: "text", id: nanoid(), value: "" }, nodes.length)
                    }}
                    showHint={!nodes.length}
                />
            </div>
        </>
    )
}