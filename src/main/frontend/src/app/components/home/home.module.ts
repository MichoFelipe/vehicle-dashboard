import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../shared/shared.module";

import { routes } from "./home.routes";

import { HomeComponent, EditDialogOverview } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  declarations: [HomeComponent, EditDialogOverview],
  entryComponents: [EditDialogOverview]
})
export class HomeModule {}
