import { NodeData } from "../utils/types";
import { useEffect, useRef } from "react";
import styles from "./Title.module.css";
import { nanoid } from "nanoid";


type TitleProps = {
    title: string;
    changePageTitle(title: string): void;
    addNode(node: NodeData, index: number): void
    handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    
    useEffect(() => {
        const isFocused = document.activeElement == headerRef.current;
        if (!isFocused && headerRef.current) {
            headerRef.current.textContent = title;
        }
    }, [title]);
    
    return (<div className={styles.container}>
        <h1 className={styles.title}
            contentEditable
            ref={headerRef}
            suppressContentEditableWarning
            onBlur={(event) => changePageTitle(event.currentTarget.innerText)}
            onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addNode({ type: "text", id: nanoid(), value: "" }, 0);
                }
            }}
        ></h1>
    </div>
    );
};