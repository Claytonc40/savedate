/**
 * Represents a single item in a report.
 * @author Clayton de Aguiar Cavalcante
 * @company Editec Sistemas
 */
export interface ReportItem {
  time: string;
  gC: number;
  sn: number;
  avg: number;
  tts: number;
  o35: number;
  o50: number;
}

/**
 * Represents a report for the MFY (Made for You) system.
 */
export interface MFYReport {
  id: string;
  store: string;
  operationDate: string;
  manager: string;
  reportName: string;
  printedAt: string;
  diurnoAvg?: number | null;
  noturnoAvg?: number | null;
  madrugadaAvg?: number | null;
  totalAvg?: number | null;
  snDiurnoAvg?: number | null;
  snNoturnoAvg?: number | null;
  snMadrugadaAvg?: number | null;
  snTotalSum?: number | null;
  total: number;
  reportItems: ReportItem[];
}

/**
 * Represents the data for the OEPEReport.
 */
export interface OEPEReportData {
  time: string;
  prodsale: number;
  tc: number;
  med: number;
  totl: number;
  oepePercent: number;
  pfwdPercent: number;
  carsv: number;
  ot: number;
  oecb: number;
  cash: number;
  psnt: number;
  oepe: number;
  pfwd: number;
}

/**
 * Represents a report for the OEPEReport.
 */
export interface OEPEReport {
  id: string;
  store: string;
  operationDate: string;
  manager: string;
  reportName: string;
  printedAt: string;
  diurnoAvg?: number | null;
  noturnoAvg?: number | null;
  madrugadaAvg?: number | null;
  totalAvg?: number | null;
  carsVTotal?: number | null;
  total: number;
  reportItems: OEPEReportData[];
}

/**
 * Represents a single item in a seller report.
 */
export interface SellerReportItem {
  hora: string;
  tcs: number;
  vendas: number;
  tm: number;
  acumu: number;
}

/**
 * Represents a seller report.
 */
export interface SellerReport {
  id: string;
  store: string;
  operationDate: string;
  manager: string;
  reportName: string;
  printedAt: string;
  diurnoSalesSum?: number | null;
  noturnoSalesSum?: number | null;
  madrugadaSalesSum?: number | null;
  totalSalesSum?: number | null;
  diurnoTCSum?: number | null;
  noturnoTCSum?: number | null;
  madrugadaTCSum?: number | null;
  totalTCSum?: number | null;
  total: number;
  reportItems: SellerReportItem[];
}

/**
 * Represents a single item in an R2P (Ready to Pay) report.
 */
export interface R2PReportItem {
  id: string;
  hora: string;
  prodsale: number;
  tc: number;
  med: number;
  r2pPercent: number;
  orb: number;
  accum: number;
  ot: number;
  cash: number;
  r2p: number;
  totl: number;
  reportId: string;
}

/**
 * Represents an R2P (Ready to Pay) report.
 */
export interface R2PReport {
  id: string;
  store: string;
  operationDate: string;
  manager: string;
  reportName: string;
  printedAt: string;
  diurnoR2PAvg?: number | null;
  noturnoR2PAvg?: number | null;
  madrugadaR2PAvg?: number | null;
  totalR2PAvg?: number | null;
  total: number;
  reportItems: R2PReportItem[];
}

/**
 * Represents the data for all types of reports.
 */
export interface ReportData {
  oepe: OEPEReport[];
  mfy: MFYReport[];
  r2p: R2PReport[];
  sales: SellerReport[];
  pmixCategories: PmixCategoryTotal[];
}

/**
 * Represents the total quantity and value of a category in the PMIX (Product Mix) report.
 */
export interface PmixCategoryTotal {
  categoryName: string;
  quantity: number;
  value: number;
  icon: string;
}

// @/types/interfaces.ts

// hooks/useUsers.ts

/**
 * Represents a store.
 */
export interface Store {
  id: string;
  name: string;
}

/**
 * Represents a user's assigned store.
 */
export interface UserStore {
  store: Store;
}

/**
 * Represents a user.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  hashPassword: string | null;
  emailVerified: string | null;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  userStores: UserStore[];
}
