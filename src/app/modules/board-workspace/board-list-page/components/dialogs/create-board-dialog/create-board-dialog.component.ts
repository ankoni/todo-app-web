import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { CreateBoardDialogData } from "../../../../../../models/board-workspace/board";

@Component({
    selector: 'app-create-board-dialog',
    templateUrl: './create-board-dialog.component.html',
    styleUrls: ['./create-board-dialog.component.scss', '../../../../../../common/components/dialogs/dialog.scss']
})
export class CreateBoardDialogComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null)
    });

    constructor(
        private dialogReg: NbDialogRef<CreateBoardDialogComponent>
    ) {
    }

    close(data?: CreateBoardDialogData): void {
        this.dialogReg.close(data);
    }

    accept(): void {
        const data: CreateBoardDialogData = this.form.getRawValue();
        this.close(data);
    }
}
