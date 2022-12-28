import { useState, startTransition, useTransition } from "react";
import { Avater } from "./Avater";
import { TaskList } from "./TaskList";

export type Task = {
    id: number;
    title: string;
    assignee: string;
};

const member = {
    a: "A",
    b: "B",
    c: "C",
};

const generateDummyTasks = (): Task[] => {
    return Array(10000)
        .fill("")
        .map((_, index) => {
            const addedIndex = index + 1;
            return {
                id: addedIndex,
                title: `タスク${addedIndex}`,
                assignee:
                    addedIndex % 3 === 0
                        ? member.a
                        : addedIndex % 3 === 1
                        ? member.b
                        : member.c,
            };
        });
};

const tasks = generateDummyTasks();

const fillterAssignee = (assignee: string) => {
    if (assignee === "") return tasks;
    return tasks.filter((task) => task.assignee === assignee);
};

export const Transition = () => {
    const [selectAssignee, setSelectAssignee] = useState<string>("");
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    /*
        transitionを使用しない
    */
    const onClickAssignee = (assignee: string) => {
        setSelectAssignee(assignee);
        setTaskList(fillterAssignee(assignee));
    };

    /*
        startTransitionを使用する
    */
    // const onClickAssignee = (assignee: string) => {
    //     setSelectAssignee(assignee);
    //     startTransition(() => {
    //         // 緊急性の低いものはstartTransitionのの中に記述する
    //         setTaskList(fillterAssignee(assignee));
    //     });
    // };

    /*
        useTransitionを使用する
    */
    // const [isPending, startTransition] = useTransition();
    // const onClickAssignee = (assignee: string) => {
    //     setSelectAssignee(assignee);
    //     startTransition(() => {
    //         // useTransitionのstartTransition
    //         // この中に記述している関数の処理中はisPendingがtrueとなる
    //         // タスクをフィルタリングしている間はisPendingが　trueとなり、opacityが0.5になる
    //         setTaskList(fillterAssignee(assignee));
    //     });
    // };

    return (
        <div>
            <p>transition</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Avater
                    isSelected={selectAssignee === member.a}
                    onClick={onClickAssignee}
                >
                    {member.a}
                </Avater>
                <Avater
                    isSelected={selectAssignee === member.b}
                    onClick={onClickAssignee}
                >
                    {member.b}
                </Avater>
                <Avater
                    isSelected={selectAssignee === member.c}
                    onClick={onClickAssignee}
                >
                    {member.c}
                </Avater>
            </div>
            <br />
            <button onClick={() => onClickAssignee("")}>リセット</button>
            <TaskList taskList={taskList} />
        </div>
    );
};
