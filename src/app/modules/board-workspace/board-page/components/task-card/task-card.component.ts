import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from "../../services/tasks/task.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Task } from '../../../../../models/board-workspace/task';
import { TuiDialogService } from "@taiga-ui/core";
import { EditTaskDialogComponent } from "../dialogs/edit-task-dialog/edit-task-dialog.component";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit, OnDestroy {
    @Input() listId: string = '';
    @Input() taskData!: Task;

    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required)
    });

    editMode = false;

    private destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private taskService: TaskService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
    }

    ngOnInit(): void {
        this.form.patchValue({
            name: this.taskData.name
        })
        this.editMode = this.taskData.isNew as boolean
    }

    editCardName(): void  {
        this.editMode = true
    }

    openTaskEditDialog(): void {
        this.dialogs.open(
            new PolymorpheusComponent(EditTaskDialogComponent),
            { label: 'Edit data', data: { ...this.taskData }}
        ).subscribe((res) => {
            console.log(res)
        })
    }

    onSave(): void  {
        if (this.form.valid && this.form.dirty) {
            const listId = this.listId
            const { id: taskId, isNew } = this.taskData
            const formData = this.form.getRawValue()
            if (isNew) {
                this.taskService.saveTask(listId, formData)
            } else {
                this.taskService.editTaskGeneralInfo(listId, taskId, formData)
            }
        }

        this.editMode = false
    }

    deleteTask(): void {
        this.taskService.deleteTaskFromList(this.listId, this.taskData.id);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

}
