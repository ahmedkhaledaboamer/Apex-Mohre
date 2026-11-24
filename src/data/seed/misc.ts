import type { ActivityEntry, AppSettings, DocumentRecord, Task } from '../../types/system';
import { dateFromToday } from '../../utils/dates';
import { seedCompanies, seedEmployees, PRO_IDS } from './people';
import { seedTransactions } from './transactions';
import { DEFAULT_INVOICE_TERMS, seedPayments, seedReceipts } from './finance';
import { serviceCatalogSeed } from '../pricing';

let docSeq = 0;
const doc = (d: Omit<DocumentRecord, 'id'>): DocumentRecord => ({ id: `doc-${++docSeq}`, ...d });

export const seedDocuments: DocumentRecord[] = [
...seedEmployees.map((e, i) =>
doc({
  type: 'passport',
  title: `Passport — ${e.nameEn}`,
  fileName: `passport-${e.code.toLowerCase()}.pdf`,
  entityType: 'employee',
  entityId: e.id,
  uploadedAt: e.createdAt,
  expiryDate: e.passportExpiry,
  verification: i % 7 === 3 ? 'pending' : i === 8 ? 'rejected' : 'verified',
  notes: i === 8 ? 'Image is unclear — please rescan' : undefined,
  sizeKb: 420 + i * 11,
  uploadedBy: PRO_IDS[i % 2]
})
),
...seedEmployees.
filter((e) => e.emiratesIdNo).
map((e, i) =>
doc({
  type: 'emirates_id',
  title: `Emirates ID — ${e.nameEn}`,
  fileName: `eid-${e.code.toLowerCase()}.pdf`,
  entityType: 'employee',
  entityId: e.id,
  uploadedAt: e.residenceIssue ?? e.createdAt,
  expiryDate: e.emiratesIdExpiry,
  verification: 'verified',
  sizeKb: 310 + i * 7,
  uploadedBy: 'u-pro1'
})
),
...seedCompanies.map((c, i) =>
doc({
  type: 'trade_license',
  title: `Trade licence — ${c.nameEn}`,
  fileName: `license-${c.code.toLowerCase()}.pdf`,
  entityType: 'company',
  entityId: c.id,
  uploadedAt: c.licenseIssue,
  expiryDate: c.licenseExpiry,
  verification: 'verified',
  sizeKb: 520 + i * 13,
  uploadedBy: 'u-pro2'
})
),
...seedTransactions.
filter((t) => t.status !== 'new' && t.status !== 'cancelled').
slice(0, 18).
map((t, i) =>
doc({
  type: t.type === 'formation' ? 'trade_license' : t.serviceId.includes('medical') ? 'medical' : 'passport',
  title: `Transaction document ${t.ref}`,
  fileName: `${t.ref.toLowerCase()}-${i + 1}.pdf`,
  entityType: 'case',
  entityId: t.id,
  uploadedAt: t.transactionDate,
  verification: t.status === 'waiting_documents' ? 'pending' : 'verified',
  sizeKb: 180 + i * 9,
  uploadedBy: t.officerId
})
)];


export const seedTasks: Task[] = [
{ id: 'task-1', title: 'Follow up the medical test result with the centre', assigneeId: 'u-pro2', dueDate: dateFromToday(0), priority: 'high', status: 'open', relatedType: 'case', relatedId: 'trx-2', createdAt: dateFromToday(0), createdBy: 'u-owner' },
{ id: 'task-2', title: 'Request a new passport copy from the customer and resubmit the change of status', assigneeId: 'u-pro1', dueDate: dateFromToday(1), priority: 'high', status: 'open', relatedType: 'case', relatedId: 'trx-13', createdAt: dateFromToday(-4), createdBy: 'u-pro1' },
{ id: 'task-3', title: 'Collect the work permit renewal fees before paying', assigneeId: 'u-acc', dueDate: dateFromToday(0), priority: 'normal', status: 'open', relatedType: 'case', relatedId: 'trx-8', createdAt: dateFromToday(-2), createdBy: 'u-pro2' },
{ id: 'task-4', title: 'Collect licence renewal documents from Al Riyada Shipping', assigneeId: 'u-pro1', dueDate: dateFromToday(-1), priority: 'high', status: 'open', relatedType: 'case', relatedId: 'trx-11', createdAt: dateFromToday(-3), createdBy: 'u-owner' },
{ id: 'task-5', title: 'Collect the overdue balance on TRX-2026-0036', assigneeId: 'u-acc', dueDate: dateFromToday(2), priority: 'normal', status: 'open', relatedType: 'case', relatedId: 'trx-36', createdAt: dateFromToday(-4), createdBy: 'u-acc' },
{ id: 'task-6', title: 'Book the Emirates ID biometrics appointment', assigneeId: 'u-owner', dueDate: dateFromToday(3), priority: 'normal', status: 'open', relatedType: 'case', relatedId: 'trx-4', createdAt: dateFromToday(0), createdBy: 'u-owner' },
{ id: 'task-7', title: 'Review formation documents before requesting initial approval', assigneeId: 'u-pro1', dueDate: dateFromToday(4), priority: 'normal', status: 'open', relatedType: 'case', relatedId: 'trx-18', createdAt: dateFromToday(-6), createdBy: 'u-owner' },
{ id: 'task-8', title: 'Update fee prices after checking with the authorities', assigneeId: 'u-owner', dueDate: dateFromToday(7), priority: 'normal', status: 'open', createdAt: dateFromToday(-1), createdBy: 'u-owner' },
{ id: 'task-9', title: 'Hand the original residence visa to the customer', assigneeId: 'u-pro1', dueDate: dateFromToday(-3), priority: 'low', status: 'done', relatedType: 'case', relatedId: 'trx-24', createdAt: dateFromToday(-10), createdBy: 'u-pro1' },
{ id: 'task-10', title: 'Follow up the attested relationship certificate', assigneeId: 'u-pro2', dueDate: dateFromToday(2), priority: 'normal', status: 'open', relatedType: 'case', relatedId: 'trx-23', createdAt: dateFromToday(-5), createdBy: 'u-pro2' }];


const svcName = new Map(serviceCatalogSeed.map((s) => [s.id, s.nameAr]));

export const seedActivity: ActivityEntry[] = [
...seedTransactions.flatMap((t, i) => {
  const out: ActivityEntry[] = [
  { id: `act-t${i}-a`, entityType: 'case', entityId: t.id, action: 'created', message: { ar: `تسجيل المعاملة ${t.ref} — ${svcName.get(t.serviceId)}`, en: `Registered transaction ${t.ref}` }, userId: t.createdBy, at: t.createdAt }];

  if (t.completedAt) out.push({ id: `act-t${i}-c`, entityType: 'case', entityId: t.id, action: 'completed', message: { ar: `إكمال المعاملة ${t.ref}`, en: `Transaction ${t.ref} completed` }, userId: t.completedBy ?? t.officerId, at: `${t.completedAt}T16:00:00` });
  return out;
}),
...seedReceipts.map<ActivityEntry>((r) => ({
  id: `act-${r.id}`,
  entityType: 'receipt',
  entityId: r.id,
  action: r.kind === 'refund' ? 'refund' : 'created',
  message: r.kind === 'refund' ? { ar: `رد مبلغ ${r.amount} للعميل — ${r.number}`, en: `Refunded ${r.amount} — ${r.number}` } : { ar: `سند قبض ${r.number} بمبلغ ${r.amount}`, en: `Receipt ${r.number} for ${r.amount}` },
  userId: r.receivedBy,
  at: r.createdAt
})),
...seedPayments.map<ActivityEntry>((p) => ({
  id: `act-${p.id}`,
  entityType: 'payment',
  entityId: p.id,
  action: 'created',
  message: { ar: `سند صرف ${p.number} إلى ${p.payeeName} بمبلغ ${p.amount}`, en: `Payment ${p.number} of ${p.amount}` },
  userId: p.paidBy,
  at: p.createdAt
}))].
sort((a, b) => b.at.localeCompare(a.at));

export const defaultSettings: AppSettings = {
  companyNameAr: 'أبكس أورا لخدمات رجال الأعمال',
  companyNameEn: 'Apex Aora Business Services',
  trn: '100555123400003',
  address: 'Al Muraqqabat Street, Deira, Dubai — United Arab Emirates',
  phone: '+971 4 555 0100',
  email: 'hello@apexaora-demo.ae',
  vatRate: 5,
  invoiceTerms: DEFAULT_INVOICE_TERMS,
  reminderDays: { passport: 180, emiratesId: 30, residence: 30, license: 30, deadline: 3 },
  notifications: {
    inApp: true,
    email: true,
    sms: false,
    dailyDigest: true,
    kinds: { passport: true, emirates_id: true, residence: true, license: true, missing_documents: true, overdue_payment: true, deadline: true }
  },
  pricingConfigured: false
};
