import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";
import {CreateTaskListDialogData} from "../../../../../../models/board-workspace/task-list";

@Component({
    selector: 'app-create-tasks-column-dialog',
    templateUrl: './create-task-list-dialog.component.html',
    styleUrls: ['./create-task-list-dialog.component.scss', '../../../../../../common/components/dialogs/dialog.scss']
})
export class CreateTaskListDialogComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required)
    });

    constructor(
        private dialogRef: NbDialogRef<CreateTaskListDialogComponent>
    ) {
    }

    close(data?: CreateTaskListDialogData): void {
      this.dialogRef.close(data)
    }

    accept(): void {
      const data: CreateTaskListDialogData = this.form.getRawValue();
      this.close(data)
    }
}
