import { StopEventPropagationDirective } from "./directives/stop-event-propagation.directive";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        StopEventPropagationDirective
    ],
    exports: [
        StopEventPropagationDirective
    ]
})
export class CoreComponentsModule { }