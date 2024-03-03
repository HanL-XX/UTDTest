import {juggler} from '@loopback/repository';
import {inject} from '@loopback/core';
import {MongoDataSource} from 'loopback-connector-mongodb';

export class MyLoopbackAppDataSource extends juggler.DataSource {
  static dataSourceName = 'myLoopbackApp';

  constructor(
    @inject('datasources.config.myLoopbackApp', {optional: true})
    dsConfig: object = {},
  ) {
    super(dsConfig);

    // Uncomment the following line to enable MongoDB
    this.connector = new MongoDataSource(dsConfig);

    // Customize the settings below to adjust MongoDB connection options
    // this.connector = new MongoDBDataSource(dsConfig, {
    //   useNewUrlParser: true,
    //   connector: MongoDBConnector,
    // });

    // ...

    if (this.connector) {
      this.connector.dataSource = this;
    }
  }
}
