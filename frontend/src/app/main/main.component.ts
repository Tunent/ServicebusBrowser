import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { IConnection } from '../../../../ipcModels/IConnection';
import { deleteConnection, openConnection } from '../connections/ngrx/connections.actions';
import { getStoredConnections } from '../connections/ngrx/connections.selectors';
import { State } from '../ngrx.module';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  storedConnections: IConnection[] = [];
  subsink = new SubSink();

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.subsink.add(this.store.select(getStoredConnections).subscribe(c => {
      this.storedConnections = c;
    }))
  }

  open(connection: IConnection) {
    this.store.dispatch(openConnection({connection}));
  }

  delete(connection: IConnection) {
    this.store.dispatch(deleteConnection({id: connection.id}));
  }

}
