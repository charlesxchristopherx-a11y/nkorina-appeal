// Shared helpers for Nkorina filings (docx-js)
const d = require("docx");
const { Paragraph, TextRun, AlignmentType, BorderStyle, Footer, Header, PageNumber,
        TabStopType } = d;

function mk(size) {
  const SZ = size; // half-points
  // inline markup: *italic*  **bold**  __underline__
  function runs(text, base = {}) {
    const out = [];
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: "Times New Roman", size: SZ, ...base }));
      const t = m[0];
      if (t.startsWith("**")) out.push(new TextRun({ text: t.slice(2, -2), bold: true, font: "Times New Roman", size: SZ, ...base }));
      else if (t.startsWith("__")) out.push(new TextRun({ text: t.slice(2, -2), underline: {}, font: "Times New Roman", size: SZ, ...base }));
      else out.push(new TextRun({ text: t.slice(1, -1), italics: true, font: "Times New Roman", size: SZ, ...base }));
      last = m.index + t.length;
    }
    if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: "Times New Roman", size: SZ, ...base }));
    return out;
  }
  const DBL = { line: 480, lineRule: "auto" }, SGL = { line: 240, lineRule: "auto" };
  return {
    runs,
    body: (t, o = {}) => new Paragraph({ children: runs(t), alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 }, spacing: DBL, ...o }),
    flush: (t, o = {}) => new Paragraph({ children: runs(t), alignment: AlignmentType.LEFT, spacing: SGL, ...o }),
    flushD: (t, o = {}) => new Paragraph({ children: runs(t), alignment: AlignmentType.JUSTIFIED, spacing: DBL, ...o }),
    ctr: (t, o = {}) => new Paragraph({ children: runs(t), alignment: AlignmentType.CENTER, spacing: SGL, ...o }),
    head: (t) => new Paragraph({ children: runs(t, { bold: true }), alignment: AlignmentType.CENTER, spacing: { line: 240, lineRule: "auto", before: 240, after: 240 }, keepNext: true }),
    sub: (t) => new Paragraph({ children: runs(t, { bold: true }), alignment: AlignmentType.JUSTIFIED, spacing: { line: 240, lineRule: "auto", before: 120, after: 240 }, indent: { left: 720, hanging: 720 }, keepNext: true }),
    block: (t) => new Paragraph({ children: runs(t), alignment: AlignmentType.JUSTIFIED, spacing: { line: 240, lineRule: "auto", after: 240 }, indent: { left: 1440, right: 1440 } }),
    num: (label, t) => new Paragraph({ children: runs(`${label}\t${t}`), alignment: AlignmentType.JUSTIFIED, spacing: DBL, indent: { left: 1440, hanging: 720 }, tabStops: [{ type: TabStopType.LEFT, position: 1440 }] }),
    blank: () => new Paragraph({ children: [new TextRun({ text: "", size: SZ })], spacing: SGL }),
    rule: () => new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 } }, spacing: { after: 120 } }),
    brk: () => new Paragraph({ children: [], pageBreakBefore: true }),
    footer: () => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: "Times New Roman", size: SZ })] })] }),
    page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    SZ,
  };
}
module.exports = { mk, d };
