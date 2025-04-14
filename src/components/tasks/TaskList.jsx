
import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * TaskList component for displaying the list of tasks
 * @returns {React.FC} React Function Component
 */
const TaskList = () => {
  const { tasks } = useTask();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterCompleted === null) {
      return matchesSearch;
    }
    
    return matchesSearch && task.completed === filterCompleted;
  });

  const toggleFilter = (completed) => {
    setFilterCompleted(current => current === completed ? null : completed);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 my-4">
        <Button
          variant={filterCompleted === null ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter(null)}
          className={filterCompleted === null ? "bg-task-primary" : ""}
        >
          All
        </Button>
        <Button
          variant={filterCompleted === false ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter(false)}
          className={filterCompleted === false ? "bg-task-primary" : ""}
        >
          <Circle className="mr-1 h-4 w-4" /> Active
        </Button>
        <Button
          variant={filterCompleted === true ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter(true)}
          className={filterCompleted === true ? "bg-task-primary" : ""}
        >
          <CheckCircle2 className="mr-1 h-4 w-4" /> Completed
        </Button>
      </div>
      
      {filteredTasks.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          {searchTerm || filterCompleted !== null ? (
            <>
              <p className="mb-2">No matching tasks found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </>
          ) : (
            <>
              <p className="mb-2">You don't have any tasks yet</p>
              <p className="text-sm">Click the "Add Task" button to create your first task</p>
            </>
          )}
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
