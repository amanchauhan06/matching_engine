import { Injectable } from '@nestjs/common';
import { auth, Client, mapping } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;
    private createClient() {
        this.client = new Client({
            contactPoints: 
            ['aws:cassandra:ap-south-1:259850036060:/keyspace/stock_app_keyspace'],
            // ['0.0.0.0'],
            // applicationName: 'stock_data',
            keyspace: 'stock_price',
            localDataCenter: 'datacenter1',
            authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra')
        });
    }
    
    createMapper(mappingOptions: mapping.MappingOptions) {
     if(this.client == undefined) {
         this.createClient();
     }   
     return new mapping.Mapper(this.client, mappingOptions);
    }
}