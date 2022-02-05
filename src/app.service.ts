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

  printReport(toPdf: boolean, response: Response): void {
    var data = {
      id: 42,
      date: 1492012745,
      company: {
        name: 'myCompany',
        address: 'here',
        city: 'Notfar',
        postalCode: 123456,
      },
      customer: {
        name: 'myCustomer',
        address: 'there',
        city: 'Faraway',
        postalCode: 654321,
      },
      products: [
        { name: 'product 1', priceUnit: 0.1, quantity: 10, priceTotal: 1 },
        { name: 'product 2', priceUnit: 0.1, quantity: 10, priceTotal: 1 },
        { name: 'product 3', priceUnit: 0.1, quantity: 10, priceTotal: 1 },
      ],
      total: 140,
    };

    var options = {
      convertTo: toPdf ? 'pdf' : 'odt', //can be docx, txt, ...
    };

    carbone.render('./resources/template-demo.odt', data, options, (err: any, result: any) => {
        if (err) {
          return console.log(err);
        }
        // write the result
        response.header(
          'Content-Type',
          toPdf ? 'application/pdf' : 'application/vnd.oasis.opendocument.text',
        );
        response.header(
          'Content-disposition',
          `attachment; filename=template-demo.${toPdf ? 'pdf' : 'odt'}`,
        );
        response.write(result, 'binary');
        response.end();
      }
    );
  }
}
