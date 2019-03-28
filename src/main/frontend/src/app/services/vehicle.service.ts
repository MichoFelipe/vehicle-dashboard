import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class VehicleService {
  private vehicleUrl: string;

  public constructor(private http: HttpClient) {
    this.vehicleUrl = `http://localhost:8080/api/vehicle`;
  }

  public getVehicles() {
    // update url
    let getVehicleUrl = `${this.vehicleUrl}s`;

    // make api get call
    return this.http.get(getVehicleUrl).map(
      data => {
        return data;
      },
      error => {
        return error.json();
      }
    );
  }
}
