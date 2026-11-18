import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';
import { QuizSubmission } from '../types/quiz';

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}d`;
}

function formatDate(d: Date | null): string {
  if (!d) return '-';
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function exportToExcel(submissions: QuizSubmission[], classFilter: string) {
  const rows = submissions.map((item, idx) => ({
    No: idx + 1,
    'Nama Siswa': item.studentName,
    Kelas: item.className,
    'No. Absen': item.absentNumber || '-',
    'Nilai Akhir': item.score,
    'Benar Penuh (/35)': item.correctCount,
    'Level Adaptif': item.adaptiveTier,
    Durasi: formatDuration(item.durationSeconds),
    'Berpangkat (%)': item.topicScores.pangkat,
    'Bentuk Akar (%)': item.topicScores.akar,
    'Bentuk Baku (%)': item.topicScores.baku,
    'Pythagoras (%)': item.topicScores.pythagoras,
    'PLSV & PtLSV (%)': item.topicScores.plsv,
    'Memahami (%)': item.competencyScores.memahami,
    'Mengaplikasikan (%)': item.competencyScores.mengaplikasikan,
    'Menalar (%)': item.competencyScores.menalar,
    'PG (/17)': item.typeScores.pg,
    'MCMA (/8)': item.typeScores.mcma,
    'Benar/Salah (/10)': item.typeScores.bs,
    'Waktu Kirim': formatDate(item.submittedAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap SAS Kelas 8');

  const suffix = classFilter === 'ALL' ? '8A_8B' : classFilter;
  XLSX.writeFile(workbook, `Rekap_TryOut_SAS_Matematika_${suffix}.xlsx`);
}

export function exportToPDF(submissions: QuizSubmission[], classFilter: string) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  doc.setFontSize(15);
  doc.text('LAPORAN REKAP HASIL TRY OUT SAS MATEMATIKA KELAS 8', 14, 16);
  doc.setFontSize(10);
  doc.text(
    `SMPN 1 Wanaraya · Filter Kelas: ${classFilter === 'ALL' ? 'Kelas 8A & 8B' : `Kelas ${classFilter}`} · Dicetak: ${new Date().toLocaleString('id-ID')}`,
    14,
    23
  );

  const avg =
    submissions.length > 0
      ? Math.round(submissions.reduce((acc, s) => acc + s.score, 0) / submissions.length)
      : 0;
  const passed = submissions.filter((s) => s.score >= 76).length;

  doc.text(
    `Total Peserta: ${submissions.length} siswa   |   Rata-rata Nilai: ${avg}   |   Tuntas (>=76): ${passed} siswa`,
    14,
    30
  );

  autoTable(doc, {
    startY: 35,
    head: [
      [
        'No',
        'Nama Siswa',
        'Kelas',
        'Nilai',
        'Benar',
        'Level',
        'Pangkat',
        'Akar',
        'Baku',
        'Pythagoras',
        'PLSV',
        'Durasi',
        'Waktu',
      ],
    ],
    body: submissions.map((s, idx) => [
      String(idx + 1),
      s.studentName,
      s.className,
      String(s.score),
      `${s.correctCount}/35`,
      s.adaptiveTier,
      `${s.topicScores.pangkat}%`,
      `${s.topicScores.akar}%`,
      `${s.topicScores.baku}%`,
      `${s.topicScores.pythagoras}%`,
      `${s.topicScores.plsv}%`,
      formatDuration(s.durationSeconds),
      formatDate(s.submittedAt),
    ]),
    styles: { fontSize: 8.5, cellPadding: 2.2 },
    headStyles: { fillColor: [2, 132, 199], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  const suffix = classFilter === 'ALL' ? '8A_8B' : classFilter;
  doc.save(`Rekap_TryOut_SAS_Matematika_${suffix}.pdf`);
}

export async function exportToWord(submissions: QuizSubmission[], classFilter: string) {
  const avg =
    submissions.length > 0
      ? Math.round(submissions.reduce((acc, s) => acc + s.score, 0) / submissions.length)
      : 0;
  const passed = submissions.filter((s) => s.score >= 76).length;

  const headerCells = [
    'No',
    'Nama Siswa',
    'Kelas',
    'Nilai',
    'Benar (/35)',
    'Level Adaptif',
    'Memahami',
    'Aplikasi',
    'Menalar',
    'Durasi',
  ].map(
    (text) =>
      new TableCell({
        shading: { fill: '0284C7' },
        children: [
          new Paragraph({
            children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 18 })],
          }),
        ],
      })
  );

  const dataRows = submissions.map(
    (s, idx) =>
      new TableRow({
        children: [
          String(idx + 1),
          s.studentName,
          s.className,
          String(s.score),
          `${s.correctCount}/35`,
          s.adaptiveTier,
          `${s.competencyScores.memahami}%`,
          `${s.competencyScores.mengaplikasikan}%`,
          `${s.competencyScores.menalar}%`,
          formatDuration(s.durationSeconds),
        ].map(
          (val) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: val, size: 18 })],
                }),
              ],
            })
        ),
      })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'REKAP HASIL TRY OUT SAS MATEMATIKA KELAS 8',
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `SMPN 1 Wanaraya · Kelas: ${classFilter === 'ALL' ? '8A & 8B' : classFilter} · Dicetak: ${new Date().toLocaleString('id-ID')}`,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Ringkasan: Total Peserta = ${submissions.length} siswa | Rata-rata Nilai = ${avg} | Siswa Tuntas (>=76) = ${passed} siswa`,
                bold: true,
                size: 20,
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: headerCells }),
              ...dataRows,
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const suffix = classFilter === 'ALL' ? '8A_8B' : classFilter;
  saveAs(blob, `Rekap_TryOut_SAS_Matematika_${suffix}.docx`);
}
