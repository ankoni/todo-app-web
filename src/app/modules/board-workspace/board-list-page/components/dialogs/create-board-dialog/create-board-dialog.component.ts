import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NbButtonModule, NbCardModule, NbDialogRef, NbIconModule, NbInputModule } from "@nebular/theme";
import { CreateBoardDialogData } from "../../../../../../models/board-workspace/board";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiButtonModule, TuiDialogContext } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPhoneModule, TuiTextareaModule } from "@taiga-ui/kit";

@Component({
    selector: 'app-create-board-dialog',
    templateUrl: './create-board-dialog.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiButtonModule,
        TuiInputModule,
        TuiInputPhoneModule,
        TuiTextareaModule
    ],
    styleUrls: ['./create-board-dialog.component.scss', '../../../../../../common/components/dialogs/dialog.scss']
})
export class CreateBoardDialogComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null)
    });

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, CreateBoardDialogData>
    ) {
    }

    close(data?: CreateBoardDialogData): void {
        this.context.completeWith(data);
    }

    accept(): void {
        const data: CreateBoardDialogData = this.form.getRawValue();
        this.close(data);
    }
}
