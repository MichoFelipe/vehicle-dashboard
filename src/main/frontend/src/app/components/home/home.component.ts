import { Component, ViewChild, Inject } from "@angular/core";
import { UserService } from "../../services/user.service";
import { VehicleService } from "../../services/vehicle.service";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: "home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  public columns: any[];
  public vehicleList: any;
  public filterValueList: any[];
  public filterSpecialRequirements: any[];
  public filterOrigin: string;
  public filterSpecialRequirement: string;
  public searchFilter: string;
  public dataSource = new MatTableDataSource<Vehicle>();

  public resultsLength = 0;
  public isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.columns = [
      "id",
      "name",
      "phoneNumber",
      "carModel",
      "currentLocation",
      "specialRequirement"
    ];
    this.filterValueList = [
      { value: "Barranco", name: "Barranco" },
      { value: "Lince", name: "Lince" },
      { value: "Magdalena", name: "Magdalena" },
      { value: "San Miguel", name: "San Miguel" },
      { value: "Surquillo", name: "Surquillo" }
    ];
    this.filterSpecialRequirements = [
      { value: "Compartir Viaje", name: "Compartir Viaje" },
      { value: "Mascota", name: "Mascota" },
      { value: "Persona Sola", name: "Persona Sola" }
    ];
    this.filterOrigin = "";
    this.filterSpecialRequirement = "";
    this.searchFilter = "";
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getVehicles();
  }

  public setData(data) {
    this.dataSource = new MatTableDataSource<Vehicle>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getVehicles() {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicleList = data;
      this.resultsLength = Object.keys(data).length;
      this.isLoadingResults = false;
      this.setData(data);
    });
  }

  public changeFilter(selected) {
    this.filterOrigin = selected;
    this.filterResult();
    //this.clearFilter();
  }

  public changeSpecialRequirements(selected) {
    this.filterSpecialRequirement = selected;
    this.filterResult();
  }

  public clearFilter() {
    this.searchFilter = null;
    // refresh list
    this.setData(this.vehicleList);
  }

  public filterResult() {
    const filterOrigin = this.filterOrigin; // Drop Down Selected (Key)
    const filterSpecialRequirement = this.filterSpecialRequirement;

    console.log("filterOrigin: " + filterOrigin);
    console.log("filterSpecialRequirement: " + filterSpecialRequirement);

    // filter our data
    const tempVehicleList = this.vehicleList.filter(function(d) {
      return (
        d.currentLocation
          .toString()
          .toLowerCase()
          .indexOf(filterOrigin.toLowerCase()) > -1 &&
        d.specialRequirement
          .toString()
          .toLowerCase()
          .indexOf(filterSpecialRequirement.toLocaleLowerCase()) > -1
      );
    });

    console.log("tempVehicleList: " + tempVehicleList);
    this.setData(tempVehicleList);
  }

  public filterList(event) {}

  public editVehicleDialog(rowData, index): void {
    let dialogRef = this.dialog.open(EditDialogOverview, {
      width: "300px",
      data: rowData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != undefined) {
        let vehiclePos = this.vehicleList
          .map(function(x) {
            return x.id;
          })
          .indexOf(rowData.id);

        this.vehicleList.splice(vehiclePos, 1);
        if (typeof result === "object") {
          this.vehicleList.splice(vehiclePos, 0, result);
          //this.setvehicle(result);
          this.snackBar.open("Successfully Booked", "Dismiss", {
            duration: 2500
          });
        }
        this.clearFilter();
        this.setData(this.vehicleList);
      }
    });
  }
}

@Component({
  selector: "dialog-overview",
  templateUrl: "./edit-dialog-overview.component.html"
})
export class EditDialogOverview {
  public newData: Vehicle;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.newData = {
      id: data.id,
      name: data.name,
      carModel: data.carModel,
      createdDate: data.createdDate,
      phoneNumber: data.phoneNumber,
      currentLocation: data.currentLocation,
      specialRequirement: data.specialRequirement
    };
  }
}

export interface Vehicle {
  id: number;
  name: string;
  phoneNumber: string;
  carModel: string;
  currentLocation: string;
  specialRequirement: string;
  createdDate: string;
}
