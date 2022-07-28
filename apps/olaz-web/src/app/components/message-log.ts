import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessageLogService {
    constructor(
        private _snackBar: MatSnackBar
    ) { }
    openSnackBar(message: string) {
        this._snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',

        });
    }
}

