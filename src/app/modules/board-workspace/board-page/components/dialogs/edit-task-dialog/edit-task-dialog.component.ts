import { Component, Inject } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from "@nebular/theme";
import { TuiInputModule, TuiIslandModule, TuiTextareaModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Task } from "../../../../../../models/board-workspace/task";

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
    imports: [
        TuiIslandModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextareaModule,
        TuiButtonModule
    ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss', '../../../../../../common/components/dialogs/dialog.scss']
})
export class EditTaskDialogComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
    })

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<Partial<Task> | null, Task>,
    ) {
        const { name, description } = this.context.data
        this.form.setValue({
            name,
            description: description ?? ''
        })
    }

    close(): void {
        this.context.completeWith(null)
    }

    save(): void {
        this.context.completeWith(this.form.getRawValue())
    }
}
