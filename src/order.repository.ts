import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { randomUUID } from 'crypto';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderRepository implements OnModuleInit {

    constructor(private cassandraService: CassandraService) { }

    stockPriceMapper: mapping.ModelMapper<OrderModel>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'OrderModel': {
                    tables: ['stockprice'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.stockPriceMapper = this.cassandraService.createMapper(mappingOptions).forModel('OrderModel');
    }

    async getPrices() {
        return (await this.stockPriceMapper.findAll()).toArray();
    }

    async getEmployeeById(id: number) {
        return (await this.stockPriceMapper.find({ empId: id})).toArray();
    }

    async savePricesToDB(order: OrderModel) {
        return (await this.stockPriceMapper.insert({...order, id: randomUUID()})).toArray();
    }
}
