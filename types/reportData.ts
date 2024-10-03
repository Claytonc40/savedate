export interface ReportData {
  totalOrders: number;
  totalSales: number;
  canceledOrders: number;
  averageTicket: number;
  posError: number;
  routeTime: any[]; // Defina tipos mais específicos conforme necessário
  restaurantTime: any[];
  deliveryTime: any[];
  totalTime: any[];
  ordersByPartner: any[];
  salesByPartner: any[];
  restaurantTimePerHour: any[];
}
