import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx.module';
import { IConnection } from '../ngrx/connections.models';
import { getActiveConnections } from '../ngrx/connections.selectors';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-connection-plane',
  templateUrl: './connection-plane.component.html',
  styleUrls: ['./connection-plane.component.scss']
})
export class ConnectionPlaneComponent implements OnInit, OnDestroy {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  public connections: IConnection[] = [];
  public subs = new Subscription();

  constructor(
    private store: Store<State>
  ) {
    this.dataSource.data = TREE_DATA
  }

  ngOnInit(): void {
    this.subs.add(this.store.select(getActiveConnections).subscribe(c => this.connections = c));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
