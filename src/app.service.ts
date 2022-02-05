import { Injectable } from '@nestjs/common';
//import carbone from 'carbone'; does not work, returns undefined
import { Response } from 'express';

const carbone = require('carbone');

@Injectable()
export class AppService {

    //constructor(private readonly carbone) {}

  getHello(): string {
    return 'Hello World!';
  }

  printReport(response: Response): void {
    var data = {
      firstname : 'John',
      lastname : 'Doe'
    };
    carbone.render('./node_modules/carbone/examples/simple.odt', data, (err: any, result: any) => {
        if (err) {
          return console.log(err);
        }
        // write the result
        response.header('Content-Type', 'application/vnd.oasis.opendocument.text');
        response.header('Content-disposition', `attachment; filename=simple.odt`);
        response.write(result, 'binary');
        response.end();
      });
  }
}
