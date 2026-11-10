const { mk, d } = require("./lib");
const fs = require("fs");
const { Document, Packer, Header, Paragraph, TextRun, AlignmentType, PageNumber } = d;
const CIP = require("./cip_list");

function save(doc, name) { return Packer.toBuffer(doc).then(b => { fs.writeFileSync(name, b); console.log("wrote", name); }); }

// ================= 1. Stand-alone CIP (11th Cir., 14 pt) =================
{
  const L = mk(28);
  const { body, flush, flushD, ctr, head, blank, rule, brk } = L;
  const hdr = new Header({ children: [
    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Serge Nkorina v. United States, No. 26-14135-D", font: "Times New Roman", size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ children: ["C-", PageNumber.CURRENT, " of " + (process.env.CIPS||"3")], font: "Times New Roman", size: 24 })] }),
  ]});
  const kids = [
    ctr("**IN THE UNITED STATES COURT OF APPEALS**"),
    ctr("**FOR THE ELEVENTH CIRCUIT**"),
    blank(),
    ctr("No. 26-14135-D"),
    blank(),
    ctr("SERGE NKORINA, Petitioner-Appellant,"),
    ctr("v."),
    ctr("UNITED STATES OF AMERICA, Respondent-Appellee."),
    rule(),
    ctr("On Appeal from the United States District Court for the Southern District of Florida"),
    ctr("No. 1:25-cv-25405-CMA"),
    rule(),
    ctr("**APPELLANT’S CERTIFICATE OF INTERESTED PERSONS**"),
    ctr("**AND CORPORATE DISCLOSURE STATEMENT**"),
    rule(),
    body("Under Federal Rule of Appellate Procedure 26.1 and Eleventh Circuit Rules 26.1-1 through 26.1-3, Petitioner-Appellant Serge Nkorina, proceeding pro se, certifies that the following persons and entities have an interest in the outcome of this appeal:"),
    ...CIP.map(e => flushD(e)),
    ...CIP.TODO.map(e => flushD(e)),
    body("No publicly traded company or corporation has an interest in the outcome of this appeal."),
    blank(),
    flush("Respectfully submitted this ____ day of ______________, 2026."),
    blank(), blank(),
    flush("________________________________"),
    flush("SERGE NKORINA"),
    flush("Petitioner-Appellant, Pro Se"),
    flush("Reg. No. 26432-509"),
    flush("Federal Correctional Institution — Miami"),
    flush("Inmate Mail/Parcels"),
    flush("P.O. Box 779800"),
    flush("Miami, FL 33177"),
    brk(),
    head("CERTIFICATE OF SERVICE AND DECLARATION OF INMATE FILING"),
    body("I certify that on the date below I placed this Certificate of Interested Persons in the legal mail system at the Federal Correctional Institution — Miami, with first-class postage prepaid, addressed to the Clerk of Court, United States Court of Appeals for the Eleventh Circuit, 56 Forsyth Street, N.W., Atlanta, Georgia 30303, and mailed a copy, first-class postage prepaid, to George E. Doty III, Assistant United States Attorney, or other counsel of record for the United States, United States Attorney’s Office, 99 N.E. 4th Street, Miami, FL 33132. I declare under penalty of perjury under 28 U.S.C. § 1746 that the foregoing is true and correct, and that I deposited this document in the institution’s internal mail system on ____________________, 2026, with first-class postage prepaid."),
    blank(),
    flush("Executed on this ____ day of ______________, 2026."),
    blank(), blank(),
    flush("________________________________"),
    flush("SERGE NKORINA"),
  ];
  save(new Document({ styles: { default: { document: { run: { font: "Times New Roman", size: 28 } } } },
    sections: [{ properties: { page: { ...L.page, margin: { ...L.page.margin, top: 2160, header: 1440 } } }, headers: { default: hdr }, children: kids }] }), "Nkorina_11thCir_CIP.docx");
}


// ================= S.D. Fla. documents (12 pt) =================
const L = mk(24);
const { body, flush, flushD, ctr, head, sub, num, blank, rule, brk } = L;
function sdCaption(title) {
  return [
    ctr("**UNITED STATES DISTRICT COURT**"),
    ctr("**SOUTHERN DISTRICT OF FLORIDA**"),
    blank(),
    ctr("CASE NO. 25-25405-CIV-ALTONAGA"),
    ctr("(Crim. Case No. 19-20261-CR-ALTONAGA)"),
    ctr("Eleventh Circuit No. 26-14135-D"),
    blank(),
    flush("SERGE NKORINA,"),
    flush("          Movant-Appellant,"),
    blank(),
    flush("v."),
    blank(),
    flush("UNITED STATES OF AMERICA,"),
    flush("          Respondent-Appellee."),
    rule(),
    ...title.map(t => ctr(`**${t}**`)),
    rule(),
  ];
}
const sig = (role = "Movant-Appellant, Pro Se") => [
  flush("", { keepNext: true }),
  ...["Respectfully submitted this ____ day of ______________, 2026.", "", "", "________________________________", "SERGE NKORINA", role, "Reg. No. 26432-509", "Federal Correctional Institution — Miami", "Inmate Mail/Parcels", "P.O. Box 779800"].map(t => flush(t, { keepNext: true, keepLines: true })),
  flush("Miami, FL 33177"),
];
const cosBody = (what, ca11) => [
  head("CERTIFICATE OF SERVICE AND DECLARATION OF INMATE FILING"),
  body(`I certify that I placed the foregoing ${what} in the legal mail system at the Federal Correctional Institution — Miami, first-class postage prepaid, addressed to the Clerk of Court, United States District Court for the Southern District of Florida, 400 North Miami Avenue, Miami, Florida 33128${ca11 ? ", and mailed a copy, first-class postage prepaid, to the Clerk of Court, United States Court of Appeals for the Eleventh Circuit, 56 Forsyth Street, N.W., Atlanta, Georgia 30303" : ""}. Counsel of record for the United States will be served through the Court’s CM/ECF system when the document is docketed.`),
  body("I declare under penalty of perjury under 28 U.S.C. § 1746 that the foregoing is true and correct, and that I deposited this document in the institution’s internal mail system on ____________________, 2026, with first-class postage prepaid."),
  blank(),
  flush("________________________________"),
  flush("SERGE NKORINA"),
  flush("Reg. No. 26432-509"),
];
const sdDoc = (kids) => new Document({ styles: { default: { document: { run: { font: "Times New Roman", size: 24 } } } },
  sections: [{ properties: { page: L.page }, footers: { default: L.footer() }, children: kids }] });

const ISSUES = [
  ["(a)", "Whether the district court violated *Clisby v. Jones*, 960 F.2d 925 (11th Cir. 1992) (en banc), and *Rhode v. United States*, 583 F.3d 1289 (11th Cir. 2009), by failing to resolve Movant’s due-process claim that the Government suppressed favorable evidence under *Brady v. Maryland*, 373 U.S. 83 (1963), and *Giglio v. United States*, 405 U.S. 150 (1972), as alleged in his § 2255 motion (ECF No. 1 at 21–24); and"],
  ["(b)", "Whether the district court abused its discretion in denying Rule 59(e) relief on the ground that Movant’s argument that the court overlooked a claim in his original motion raised new arguments (ECF No. 18 at 5)."],
];

// ================= 2. IFP supplement + affidavit + Exhibit A cover =================
{
  const SC = "[SERGE TO COMPLETE]";
  const kids = [
    ...sdCaption(["MOVANT’S SUPPLEMENT TO MOTION FOR LEAVE TO PROCEED", "ON APPEAL IN FORMA PAUPERIS (ECF NO. 21)", "WITH SUPPORTING AFFIDAVIT"]),
    body("Movant-Appellant Serge Nkorina, proceeding pro se, supplements his pending Motion for Leave to Proceed on Appeal In Forma Pauperis (ECF No. 21) under Federal Rule of Appellate Procedure 24(a)(1) and 28 U.S.C. § 1915(a). He submits this supplement so that the Court has a current affidavit and a complete accounting of every deposit to his inmate account, including gifts from family, and he asks the Court to grant leave to proceed on appeal without prepaying the appellate filing and docketing fees."),
    head("GROUNDS"),
    body("**1. Inability to pay.** Movant is incarcerated at the Federal Correctional Institution in Miami. As shown in the attached affidavit and inmate account statement, his only income is institutional pay of about $43 per month and irregular gifts from family. The Bureau of Prisons statement reports total deposits of $952.86 and total withdrawals of $1,064.90 for the six months before the statement date, and an average daily balance of $40.24. He owns no real estate, vehicle, or other asset of value. He cannot prepay the appellate filing and docketing fees."),
    body("**2. Inmate account statement.** Under 28 U.S.C. § 1915(a)(2), a prisoner who seeks to appeal a judgment in a civil proceeding without prepaying fees must submit a certified copy of his trust fund account statement for the six-month period immediately preceding the filing of the notice of appeal. Movant attaches as Exhibit A his inmate account statement for April 8 through October 11, 2026, which covers the six months before he deposited his notice of appeal (ECF No. 20). He has asked institution staff for a certified copy and will file it as soon as he receives it."),
    body("**3. Entitlement to redress and issues on appeal.** Movant believes he is entitled to redress. He intends to ask the Court of Appeals for a certificate of appealability on these issues:"),
    ...ISSUES.map(([a, b]) => num(a, b)),
    body("**4. Good faith.** The appeal is taken in good faith. It raises a non-frivolous question whether a claim pleaded in the original motion was left undecided. Movant asks the Court not to certify under 28 U.S.C. § 1915(a)(3) that the appeal is not taken in good faith."),
    head("CONCLUSION"),
    body("Movant respectfully asks the Court to grant his Motion for Leave to Proceed on Appeal In Forma Pauperis (ECF No. 21), as supplemented here. A proposed order is attached."),
    ...sig(),
    brk(),
    head("AFFIDAVIT OF SERGE NKORINA IN SUPPORT OF MOTION FOR LEAVE TO APPEAL IN FORMA PAUPERIS"),
    body("I swear or affirm under penalty of perjury that, because of my poverty, I cannot prepay the docket fees of my appeal or post a bond for them. I believe I am entitled to redress. I swear or affirm under penalty of perjury under United States laws that my answers in this affidavit are true and correct. 28 U.S.C. § 1746; 18 U.S.C. § 1621."),
    sub("1.\tMy issues on appeal are:"),
    ...ISSUES.map(([a, b]) => num(a, b)),
    sub("2.\tIncome. My inmate account statement covers six months (April 8 to October 11, 2026). The monthly figures below are averages over that period. " + SC + ": state whether your income in the six months before April 2026 was about the same."),
    num("Employment:", "Federal Bureau of Prisons Inmate Performance Pay (IPP), FCI Miami — $257.81 over six months, about $43.00 per month. Expected next month: about $43.00."),
    num("Gifts:", "Western Union deposits from family — six deposits totaling $695.05 between April 17 and August 31, 2026, about $116.00 per month. None since August 31, 2026. Expected next month: unknown; these gifts are not regular or guaranteed."),
    num("Other:", "Business, self-employment, rental, interest, dividends, pensions, Social Security, disability, unemployment, public assistance, alimony, child support, or any other income: $0."),
    num("Total:", "About $159.00 per month (total deposits of $952.86 over six months). Expected next month: about $43.00 plus any gifts."),
    num("Spouse:", `${SC} — write “N/A — not married,” or list your spouse’s monthly income by source.`),
    sub("3.\tMy employment history for the past two years."),
    body("Federal Bureau of Prisons, Inmate Performance Pay, FCI Miami, P.O. Box 779800, Miami, FL 33177; dates of employment: " + SC + "; gross monthly pay about $43.00. I have had no other employment."),
    sub("4.\tMy spouse’s employment history for the past two years."),
    body(SC + " — write “N/A,” or list employer, address, dates, and gross monthly pay."),
    sub("5.\tCash and accounts."),
    body("Cash on hand: $0. Federal Bureau of Prisons inmate trust account: $41.77 as of October 11, 2026 (" + SC + ": update to the balance shown on the certified statement). I have no bank, savings, or other financial accounts."),
    sub("6.\tAssets."),
    body("Home: none. Other real estate: none. Motor vehicles: none. Other assets of value: none."),
    sub("7.\tMoney owed to me."),
    body("No one owes me money."),
    sub("8.\tDependents."),
    body(SC + " — write “None,” or list each dependent (initials only for anyone under 18), relationship, and age."),
    sub("9.\tMonthly expenses (averages over the six-month statement period)."),
    num("Food and hygiene:", "Commissary purchases — $1,033.90 over six months, about $172.00 per month."),
    num("Communication:", "Electronic messaging (TRULINCS) — $24.00, about $4.00 per month; telephone — $5.00, under $1.00 per month."),
    num("Medical:", "Inmate co-pay — $2.00 over six months."),
    num("All others:", "Rent or mortgage, utilities, home maintenance, clothing, laundry, transportation, recreation, insurance, taxes, installment payments, alimony, support, and business expenses: $0."),
    num("Total:", "About $177.00 per month ($1,064.90 over six months)."),
    sub("10.\tExpected changes."),
    body("I do not expect any major change in my monthly income, expenses, assets, or liabilities in the next twelve months."),
    sub("11.\tPayments for this case."),
    body(SC + " — state whether you have paid, or will pay, any attorney or any other person (including a person who helps prepare papers) for services in connection with this case, and if so, how much and to whom."),
    sub("12.\tWhy I cannot pay."),
    body("I am serving a federal sentence. My only earned income is about $43 per month in prison pay, which I spend on food, hygiene items, and messaging. I own no assets. Family gifts have been irregular and have not come since August 31, 2026. I cannot pay the appellate filing and docketing fees."),
    sub("13.\tPersonal information."),
    body("City and state of legal residence: Miami, Florida (FCI Miami). Age: " + SC + ". Years of schooling: " + SC + "."),
    blank(),
    flush("I declare under penalty of perjury that the foregoing is true and correct."),
    blank(),
    flush("Executed on this ____ day of ______________, 2026."),
    blank(), blank(),
    flush("________________________________"),
    flush("SERGE NKORINA"),
    flush("Reg. No. 26432-509"),
    brk(),
    blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(),
    ctr("**EXHIBIT A**"),
    blank(),
    ctr("Inmate Account Statement — Serge Nkorina, Reg. No. 26432-509"),
    ctr("Federal Bureau of Prisons, FCI Miami (April 8 – October 11, 2026)"),
  ];
  save(sdDoc(kids), "Nkorina_IFP_Supplement_and_Affidavit.docx");
  save(sdDoc(cosBody("Supplement to Motion for Leave to Proceed on Appeal In Forma Pauperis, with Affidavit, Exhibit A, and Proposed Order,", false)), "Nkorina_IFP_COS.docx");
  // proposed order
  const po = [
    ...sdCaption(["[PROPOSED] ORDER GRANTING LEAVE TO PROCEED", "ON APPEAL IN FORMA PAUPERIS"]),
    body("THIS CAUSE came before the Court on Movant-Appellant Serge Nkorina’s Motion for Leave to Proceed on Appeal In Forma Pauperis (ECF No. 21), as supplemented. The Court has reviewed the motion, the supporting affidavit, and the inmate account statement, and finds that Movant is unable to prepay the fees for his appeal and that the appeal is taken in good faith. Accordingly, it is"),
    body("ORDERED AND ADJUDGED that the Motion (ECF No. 21) is GRANTED. Movant may proceed on appeal in Eleventh Circuit No. 26-14135-D without prepayment of the appellate filing and docketing fees."),
    body("DONE AND ORDERED in Miami, Florida, this ____ day of ______________, 202__."),
    blank(), blank(),
    flush("________________________________________"),
    flush("CECILIA M. ALTONAGA"),
    flush("CHIEF UNITED STATES DISTRICT JUDGE"),
    blank(),
    flush("cc:\tMovant-Appellant, pro se"),
    flush("\tCounsel of record"),
  ];
  save(sdDoc(po), "Nkorina_IFP_Proposed_Order.docx");
}

// ================= 3. Transcript certificate + statement of issues (FRAP 10(b)) =================
{
  const kids = [
    ...sdCaption(["MOVANT-APPELLANT’S CERTIFICATE THAT NO TRANSCRIPT", "WILL BE ORDERED AND STATEMENT OF ISSUES"]),
    head("CERTIFICATE UNDER FED. R. APP. P. 10(b)(1)(B)"),
    body("Movant-Appellant Serge Nkorina, proceeding pro se, certifies that he will not order any transcript for this appeal (Eleventh Circuit No. 26-14135-D)."),
    body("No evidentiary hearing or other proceeding was held in this § 2255 case. The Court decided the motion on the written submissions and the existing record. ECF No. 10 at 1, 9. The transcripts from the underlying criminal case that bear on the issues are already filed. *See* ECF No. 5-1; Crim. ECF Nos. 230, 235–239. The Court of Appeals’ docketing notice permits a certificate stating that no transcripts will be ordered in place of the Transcript Order Form. ECF No. 23 at 1."),
    head("STATEMENT OF ISSUES UNDER FED. R. APP. P. 10(b)(3)(A)"),
    body("Movant-Appellant intends to present these issues on appeal, subject to the Court of Appeals’ ruling on his application for a certificate of appealability:"),
    ...ISSUES.map(([a, b]) => num(a, b)),
    ...sig(),
    brk(),
    ...cosBody("Certificate That No Transcript Will Be Ordered and Statement of Issues", true),
  ];
  save(sdDoc(kids), "Nkorina_No_Transcript_Certificate.docx");
}
