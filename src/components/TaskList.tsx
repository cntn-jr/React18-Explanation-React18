import { useDeferredValue } from "react";
import type { Task } from "./Transition";

type Props = {
    taskList: Task[];
};

export const TaskList = (props: Props) => {
    const { taskList } = props;
    /*
        useDeferredValueを使用する
    */
    // 緊急性の低い値をuseDefferedValueの引数に設定する。
    // 他のTransitionとは異なり、useStateのset関数などの関数ではなく、変数を記述する。
    const defferedTaskList = useDeferredValue(taskList);
    return (
        <div>
            {taskList.map((task) => (
            // {defferedTaskList.map((task) => (
                <div
                    key={task.id}
                    style={{
                        width: "300px",
                        margin: "auto",
                        background: "lavender",
                        // opacity: isPending ? "0.5" : "1.0",
                    }}
                >
                    <p>タイトル： {task.title}</p>
                    <p>担当者： {task.assignee}</p>
                </div>
            ))}
        </div>
    );
};
