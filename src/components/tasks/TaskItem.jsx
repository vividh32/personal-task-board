
import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TaskEditForm from "./TaskEditForm";

/**
 * TaskItem component for displaying a single task
 * @param {Object} props - Component properties
 * @param {Object} props.task - Task object to display
 * @returns {React.FC} React Function Component
 */
const TaskItem = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTask();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteDialog(false);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  const handleEditComplete = () => {
    setShowEditForm(false);
  };

  return (
    <>
      <Card className={`mb-3 overflow-hidden border-l-4 transition-all ${task.completed ? "border-l-task-completed opacity-75" : "border-l-task-primary"}`}>
        <CardContent className="pb-2 pt-4">
          <div className="flex items-start gap-3">
            <Checkbox 
              checked={task.completed} 
              onCheckedChange={handleToggleCompletion}
              className={`mt-1 ${task.completed ? "border-task-completed" : "border-task-primary"}`}
            />
            <div className="flex-1">
              <h3 className={`font-medium text-lg ${task.completed ? "task-completed" : ""}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${task.completed ? "task-completed" : ""}`}>
                  {task.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Added {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleEdit} className="text-gray-500 hover:text-task-primary">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-gray-500 hover:text-task-danger">
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-task-danger">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showEditForm && (
        <TaskEditForm
          task={task}
          onCancel={handleEditCancel}
          onComplete={handleEditComplete}
        />
      )}
    </>
  );
};

export default TaskItem;
