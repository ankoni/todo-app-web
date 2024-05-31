import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NbButtonModule, NbCardModule, NbDialogRef, NbIconModule, NbInputModule } from "@nebular/theme";
import { CreateTaskListDialogData, TaskList } from "../../../../../../models/board-workspace/task-list";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiButtonModule, TuiDialogContext } from "@taiga-ui/core";
import { Task } from "../../../../../../models/board-workspace/task";
import { TuiInputModule, TuiInputPhoneModule, TuiTextareaModule } from "@taiga-ui/kit";

@Component({
    selector: 'app-create-tasks-column-dialog',
    templateUrl: './create-task-list-dialog.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiButtonModule,
        TuiInputModule,
        TuiInputPhoneModule,
        TuiTextareaModule
    ],
    styleUrls: ['./create-task-list-dialog.component.scss', '../../../../../../common/components/dialogs/dialog.scss']
})
export class CreateTaskListDialogComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required)
    });

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<Partial<TaskList> | null, Partial<TaskList>>,
    ) {
    }

    close(data?: CreateTaskListDialogData): void {
      this.context.completeWith(data as Partial<TaskList>)
    }

    accept(): void {
      const data: CreateTaskListDialogData = this.form.getRawValue();
      this.close(data)
    }
}
