export module servicebusConnectionsChannels {
    export const TEST = "servicebus:test";
    export const TEST_RESPONSE = "servicebus:test.response";
}

export module servicebusQueuesChannels {
    export const GET_QUEUES = "servicebus:getQueues";
    export const GET_QUEUES_RESPONSE = "servicebus:getQueues.response";
    export const GET_QUEUES_MESSAGES = "servicebus:getQueuesMessages";
    export const GET_QUEUES_MESSAGES_RESPONSE = "servicebus:getQueuesMessages.response";
}

export module servicebusTopicsChannels {
    export const GET_TOPICS = "servicebus:getTopics";
    export const GET_TOPICS_REPONSE = "servicebus:getTopics.reponse";
}

export module secretsChannels {
    export const GET_SECRETS = "secret:get_all";
    export const GET_SECRETS_RESPONSE = "secret:get_all.reponse";
    export const ADD_SECRET = "secret:add";
    export const ADD_SECRET_REPONSE = "secret:add.reponse";
    export const DELETE_SECRET = "secret:delete";
    export const DELETE_SECRET_RESPONSE = "secret:delete.response";
}