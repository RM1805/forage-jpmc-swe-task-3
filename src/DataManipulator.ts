import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string;
  top_ask_price: number;
  timestamp: Date;
  ratio: number; // New field
  upper_bound: number; // New field
  lower_bound: number; // New field
  trigger_alert?: number; // New field, optional
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // Calculate price_abc and price_def based on serverResponds
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;

    // Calculate the ratio
    const ratio = price_abc / price_def;

    // Set upper and lower bounds
    const upper_bound = 1.05;
    const lower_bound = 0.95;

    // Determine trigger_alert
    let trigger_alert: number | undefined = undefined;
    if (ratio > upper_bound) {
      trigger_alert = ratio;
    } else if (ratio < lower_bound) {
      trigger_alert = ratio;
    }

    // Create and return the Row object
    return {
      stock: 'Ratio', // You can set a specific label for the stock, e.g., 'Ratio'
      top_ask_price: ratio,
      timestamp: serverResponds[0].timestamp, // Use the timestamp from one of the stocks
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert,
    };
  }
}
