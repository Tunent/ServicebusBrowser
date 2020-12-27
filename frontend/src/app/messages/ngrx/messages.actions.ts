import { createAction, props } from '@ngrx/store';
import { IMessage } from './messages.models';

export const getQueueMessages = createAction(
  '[Messages/Queue] Retreive messages from queue',
  props<{
    connectionId: string;
    queueName: string;
    deadletter: boolean;
    numberOfMessages: number;
  }>()
);

export const getQueueMessagesSuccess = createAction(
  '[Messages/Queue/Response] Retreived messages successfully',
  props<{
    connectionId: string;
    queueName: string;
    deadletter: boolean;
    messages: IMessage[];
  }>()
);

export const getQueueMessagesFailure = createAction(
  '[Messages/Queue/Response] Failed to retreive messages',
  props<{
    connectionId: string;
    queueName: string;
    deadletter: boolean;
    reason: string;
  }>()
);
