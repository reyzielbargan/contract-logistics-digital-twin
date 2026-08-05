'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Printer, HelpCircle } from 'lucide-react';

interface ClaimItem {
  requestId: string;
  dateReceived: string;
  closedDate: string;
  typeOfDamage: string;
  packDate: string;
  companyCustomer: string;
  customerNo: string;
  consignmentNo: string;
  forwarder: string;
  claimedPartner: string;
  accCode: string;
  kg: number;
  claimed: string;
  sdrExchangeRate: string;
  sdrCalculatedAmount: string;
  accepted: string;
  recoursed: string;
  insurable: string;
}

export default function ClaimListPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [company, setCompany] = useState('');

  // จำลองข้อมูลตัวอย่างในตาราง
  const mockClaims: ClaimItem[] = [
    {
      requestId: 'REQ-2026-001',
      dateReceived: '2026-03-10',
      closedDate: '2026-03-15',
      typeOfDamage: 'Carton Crushed',
      packDate: '2026-03-08',
      companyCustomer: 'DSV Solutions TH',
      customerNo: 'CUST-8842',
      consignmentNo: 'CN-991024',
      forwarder: 'DSV Air & Sea',
      claimedPartner: 'DHL Express',
      accCode: 'AC-301',
      kg: 120,
      claimed: '15,000 THB',
      sdrExchangeRate: '4.82',
      sdrCalculatedAmount: '3,112 SDR',
      accepted: 'Yes',
      recoursed: 'No',
      insurable: 'Yes',
    },
    {
      requestId: 'REQ-2026-002',
      dateReceived: '2026-03-12',
      closedDate: '2026-03-18',
      typeOfDamage: 'Wet / Water Damage',
      packDate: '2026-03-09',
      companyCustomer: 'Logistics Partner Ltd',
      customerNo: 'CUST-5510',
      consignmentNo: 'CN-882103',
      forwarder: 'Schenker Logistics',
      claimedPartner: 'Kuehne + Nagel',
      accCode: 'AC-104',
      kg: 450,
      claimed: '42,500 THB',
      sdrExchangeRate: '4.82',
      sdrCalculatedAmount: '8,817 SDR',
      accepted: 'Pending',
      recoursed: 'Yes',
      insurable: 'Yes',
    },
    {
      requestId: 'REQ-2026-003',
      dateReceived: '2026-03-14',
      closedDate: '-',
      typeOfDamage: 'Shortage / Missing Item',
      packDate: '2026-03-11',
      companyCustomer: 'DSV Solutions TH',
      customerNo: 'CUST-8842',
      consignmentNo: 'CN-773419',
      forwarder: 'DSV Road',
      claimedPartner: 'Linehaul Partner',
      accCode: 'AC-202',
      kg: 35,
      claimed: '8,200 THB',
      sdrExchangeRate: '4.82',
      sdrCalculatedAmount: '1,701 SDR',
      accepted: 'In Progress',
      recoursed: 'No',
      insurable: 'No',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setOrderNumber('');
    setCompany('');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#1E293B' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#FFFFFF', padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2rem', fontWeight: '900', color: '#002664', letterSpacing: '-1px' }}>
            RECAP Request, Claim & Performance
          </span>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
          {[
            'NEW REQUEST',
            'LISTS',
            'KPI REPORT',
            'CONTACTS',
            'PERSONAL DETAILS',
            'CUSTOMER PRODUCTS',
            'DAI REPORTS',
            'KEY USER ADMIN',
            'SYSTEMS',
            'DASHBOARD',
          ].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: '#002664',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                textDecoration: 'none',
                letterSpacing: '0.5px',
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '24px' }}>
        {/* Page Title */}
        <h1 style={{ color: '#2C5282', fontSize: '1.8rem', fontWeight: 'normal', marginBottom: '20px' }}>
          Claim list
        </h1>

        {/* Filter / Search Box */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '0.8rem', color: '#334155' }}>Order number</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                style={{
                  border: '1px solid #CBD5E1',
                  padding: '6px 10px',
                  borderRadius: '2px',
                  outline: 'none',
                  fontSize: '0.85rem',
                  width: '160px',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '0.8rem', color: '#334155' }}>Company</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  border: '1px solid #CBD5E1',
                  padding: '6px 10px',
                  borderRadius: '2px',
                  outline: 'none',
                  fontSize: '0.85rem',
                  width: '180px',
                  backgroundColor: '#FFF',
                }}
              >
                <option value="">Select</option>
                <option value="DSV TH">DSV Solutions TH</option>
                <option value="DSV Air">DSV Air & Sea</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#002664',
                  color: '#FFF',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '2px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Advanced search
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: '#002664',
                  color: '#FFF',
                  border: 'none',
                  padding: '8px 22px',
                  borderRadius: '2px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  backgroundColor: '#002664',
                  color: '#FFF',
                  border: 'none',
                  padding: '8px 22px',
                  borderRadius: '2px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Results Bar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', fontSize: '0.85rem', color: '#334155' }}>
          <span>Total number of entries found: <strong>{mockClaims.length}</strong></span>
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#002664', cursor: 'pointer', fontSize: '0.85rem' }}>
            <FileSpreadsheet size={16} /> Open in excel
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#002664', cursor: 'pointer', fontSize: '0.85rem' }}>
            <Printer size={16} /> Print view
          </button>
        </div>

        {/* Table List พร้อมจำลองข้อมูล */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#475569', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Request ID</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Date Received</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Closed date</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Type of damage</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Pack date</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Company customer</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Customer no</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Consignment No</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Forwarder</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Claimed partner</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Acc code</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Kg</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Claimed</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>SDR Exchange rate</span>
                    <HelpCircle size={14} color="#002664" />
                  </div>
                </th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>SDR calculated amount</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Accepted</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Recoursed</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold' }}>Insurable</th>
              </tr>
            </thead>
            <tbody>
              {mockClaims.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #F1F5F9', color: '#334155' }}>
                  <td style={{ padding: '10px 12px', color: '#002664', fontWeight: 'bold' }}>{item.requestId}</td>
                  <td style={{ padding: '10px 12px' }}>{item.dateReceived}</td>
                  <td style={{ padding: '10px 12px' }}>{item.closedDate}</td>
                  <td style={{ padding: '10px 12px' }}>{item.typeOfDamage}</td>
                  <td style={{ padding: '10px 12px' }}>{item.packDate}</td>
                  <td style={{ padding: '10px 12px' }}>{item.companyCustomer}</td>
                  <td style={{ padding: '10px 12px' }}>{item.customerNo}</td>
                  <td style={{ padding: '10px 12px' }}>{item.consignmentNo}</td>
                  <td style={{ padding: '10px 12px' }}>{item.forwarder}</td>
                  <td style={{ padding: '10px 12px' }}>{item.claimedPartner}</td>
                  <td style={{ padding: '10px 12px' }}>{item.accCode}</td>
                  <td style={{ padding: '10px 12px' }}>{item.kg}</td>
                  <td style={{ padding: '10px 12px' }}>{item.claimed}</td>
                  <td style={{ padding: '10px 12px' }}>{item.sdrExchangeRate}</td>
                  <td style={{ padding: '10px 12px' }}>{item.sdrCalculatedAmount}</td>
                  <td style={{ padding: '10px 12px' }}>{item.accepted}</td>
                  <td style={{ padding: '10px 12px' }}>{item.recoursed}</td>
                  <td style={{ padding: '10px 12px' }}>{item.insurable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}