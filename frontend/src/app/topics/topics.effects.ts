import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../ngrx.module';
import { TopicsService } from './topics.service';
import * as actions from "./ngrx/topics.actions";
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { getActiveConnections } from '../connections/ngrx/connections.selectors';
import { of } from 'rxjs';

@Injectable()
export class TopicsEffects {
  constructor(
    private actions$: Actions,
    private topicsService: TopicsService,
    private store: Store<State>,
  ) {}

  getTopics$ = createEffect(() => {
    return this.actions$.pipe(
      // listen for the type of testConnection
      ofType(actions.refreshTopics),
      // retreive the currently selected connection
      withLatestFrom(this.store.select(getActiveConnections)),

      // execute the test and return the result
      mergeMap(([action, connections]) => {
        if (!connections || connections.length === 0) {
          return of(actions.refreshTopicsFailed({connectionId: action.connectionId, error: 'No connections present'}))
        }
        
        const connection = connections.find(c => c.id === action.connectionId);
        if (!connection) {
          return of(actions.refreshTopicsFailed({connectionId: action.connectionId, error: `Connection with id ${action.connectionId} not found`}))
        }

        return this.topicsService.getTopics(connection)
        .pipe(
          map((result) => actions.refreshTopicsSuccess({connectionId: connection.id, topics: result})),
          catchError(error => of(actions.refreshTopicsFailed({ connectionId: connection.id, error: error as string })))
        )
      })
    )
  });

  getSubscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      // listen for the type of testConnection
      ofType(actions.refreshSubscriptions),
      // retreive the currently selected connection
      withLatestFrom(this.store.select(getActiveConnections)),

      // execute the test and return the result
      mergeMap(([action, connections]) => {
        if (!connections || connections.length === 0) {
          return of(actions.refreshSubscriptionsFailed({connectionId: action.connectionId, topicName: action.topicName, reason: 'No connections present'}))
        }
        
        const connection = connections.find(c => c.id === action.connectionId);
        if (!connection) {
          return of(actions.refreshSubscriptionsFailed({connectionId: action.connectionId, topicName: action.topicName, reason: `Connection with id ${action.connectionId} not found`}))
        }

        return this.topicsService.getTopicSubscriptions(connection, action.topicName)
        .pipe(
          map((result) => actions.refreshSubscriptionsSuccess({connectionId: connection.id, topicName: action.topicName, subscriptions: result})),
          catchError(error => of(actions.refreshSubscriptionsFailed({ connectionId: connection.id, topicName: action.topicName, reason: error as string })))
        )
      })
    )
  });
}
