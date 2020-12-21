export interface IConnection {
    id: string|undefined;
    name: string;
    testSuccess: boolean | null;
    connectionType: ConnectionType;
    connectionDetails: IConnectionStringConnectionDetails | IAADTokenCredentialsConnectionDetails
}

export enum ConnectionType {
    connectionString,
    AADTokenCredentials
}

export interface IConnectionStringConnectionDetails {
    connectionString: string
}

export interface IAADTokenCredentialsConnectionDetails {
    
}