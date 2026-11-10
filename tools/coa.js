const { mk, d } = require("./lib");
const fs = require("fs");
const { Document, Packer, Header, Paragraph, TextRun, AlignmentType, PageNumber } = d;
const CIP = require("./cip_list");
const L = mk(28); // 14-point: FRAP 27(d)(1)(E), 32(a)(5)(A)
const { body, flush, flushD, ctr, head, sub, block, num, blank, rule, brk } = L;

const caption = [
  ctr("**IN THE UNITED STATES COURT OF APPEALS**"),
  ctr("**FOR THE ELEVENTH CIRCUIT**"),
  blank(),
  ctr("No. 26-14135-D"),
  blank(),
  ctr("SERGE NKORINA,"),
  ctr("Petitioner-Appellant,"),
  blank(),
  ctr("v."),
  blank(),
  ctr("UNITED STATES OF AMERICA,"),
  ctr("Respondent-Appellee."),
  rule(),
  ctr("On Appeal from the United States District Court"),
  ctr("for the Southern District of Florida"),
  ctr("No. 1:25-cv-25405-CMA (Crim. No. 1:19-cr-20261-CMA)"),
  rule(),
  ctr("**APPELLANT’S APPLICATION FOR A CERTIFICATE OF APPEALABILITY**"),
  rule(),
  blank(),
  ctr("Serge Nkorina, Reg. No. 26432-509"),
  ctr("Federal Correctional Institution — Miami"),
  ctr("Inmate Mail/Parcels, P.O. Box 779800"),
  ctr("Miami, FL 33177"),
  ctr("Petitioner-Appellant, Pro Se"),
];

// ---- CIP pages (11th Cir. R. 26.1-3(c), (d)) ----
const cipHeader = new Header({ children: [
  new Paragraph({ alignment: AlignmentType.RIGHT, children: [
    new TextRun({ text: "Serge Nkorina v. United States, No. 26-14135-D", font: "Times New Roman", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.RIGHT, children: [
    new TextRun({ children: ["C-", PageNumber.CURRENT, " of " + (process.env.CIPN||"2")], font: "Times New Roman", size: 24 })] }),
]});
const cip = [
  head("CERTIFICATE OF INTERESTED PERSONS AND CORPORATE DISCLOSURE STATEMENT"),
  body("Under Federal Rule of Appellate Procedure 26.1 and Eleventh Circuit Rules 26.1-1 through 26.1-3, Petitioner-Appellant Serge Nkorina certifies that the following persons and entities have an interest in the outcome of this appeal:"),
  ...CIP.map(e => flushD(e)),
  ...CIP.TODO.map(e => flushD(e)),
  body("No publicly traded company or corporation has an interest in the outcome of this appeal."),
];

const T = [
  body("Petitioner-Appellant Serge Nkorina, proceeding pro se, applies under 28 U.S.C. § 2253(c), Federal Rule of Appellate Procedure 22(b), and Eleventh Circuit Rule 22-1(b) for a certificate of appealability (“COA”). The district court denied his motion under 28 U.S.C. § 2255 and denied a COA. ECF No. 10 at 9–10. It later denied his timely motion under Federal Rule of Civil Procedure 59(e) and again declined to issue a COA. ECF No. 18 at 6–7. (“ECF No.” refers to the docket in No. 1:25-cv-25405-CMA, with page numbers from the CM/ECF header; “Crim. ECF No.” refers to No. 1:19-cr-20261-CMA.) Appellant asks this Court to issue a COA on the two issues below."),
  head("ISSUES ON WHICH A CERTIFICATE IS REQUESTED"),
  num("I.", "Whether the district court violated *Clisby v. Jones*, 960 F.2d 925 (11th Cir. 1992) (en banc), and *Rhode v. United States*, 583 F.3d 1289 (11th Cir. 2009), by failing to resolve Appellant’s due-process claim that the Government suppressed favorable evidence under *Brady v. Maryland*, 373 U.S. 83 (1963), and *Giglio v. United States*, 405 U.S. 150 (1972), where his pro se § 2255 motion set out each element of that claim, identified the evidence at issue, and alleged a “*Brady* violation by the government (failure to disclose).”"),
  num("II.", "Whether the district court abused its discretion in denying Rule 59(e) relief on the ground that Appellant’s argument — that the court overlooked a claim contained in his original motion — was one of the “new arguments that could have been raised” before judgment."),
  head("PRIOR RULINGS ON THIS REQUEST"),
  body("As Eleventh Circuit Rule 27-1(a)(4) requires, Appellant states that the district court denied a COA in its order denying the § 2255 motion (ECF No. 10 at 9–10) and again in its order denying Rule 59(e) relief (ECF No. 18 at 6–7). No other court or judge has ruled on this request."),
  head("STATEMENT OF THE CASE"),
  sub("A.\tThe criminal case"),
  body("A jury convicted Appellant of conspiracy to commit kidnapping and kidnapping, and he was sentenced to 240 months in prison. ECF No. 10 at 1–3. This Court affirmed. *Id.* at 3 (citing *United States v. Nkorina*, No. 22-10532, 2025 WL 763378 (11th Cir. Mar. 11, 2025)). Before trial, the district court found Appellant’s waiver of counsel knowing and voluntary, allowed him to represent himself, and appointed stand-by counsel. *Id.* at 2. When Appellant asked for “the immediate release of all discovery and videos . . . in the possession of the prosecution,” the court denied the request, directed him to obtain discovery from stand-by counsel, and told him to communicate any request for missing discovery “to the Government directly.” *Id.* at 2–3 (citing Crim. ECF Nos. 115, 116)."),
  sub("B.\tThe § 2255 motion"),
  body("Appellant filed a pro se § 2255 motion with an attached memorandum. ECF No. 1. On the form, his first ground stated that stand-by counsel refused to provide pretrial discovery and “failed to assist in obtaining *Brady* materials from the government.” *Id.* at 4. Grounds two through four referred the court to the attached memorandum. *Id.* at 5, 7–8."),
  body("In the memorandum, Appellant set out the four elements of a *Brady* violation as this Court states them and addressed each one under its own heading. *Id.* at 21–23. Under “Element 1: Government Possession of Favorable Evidence,” he listed the evidence he believed the Government held, including a co-defendant’s police interview, a government forensic report, the alleged victim’s statements, and cell-phone data. *Id.* at 21. Under “Element 3: Prosecution Suppression of Favorable Evidence,” he wrote:"),
  block("The government’s failure to provide *Brady* material, combined with standby counsel’s refusal to advocate for its production, resulted in effective suppression even if not intentional."),
  body("*Id.* at 23. Under “Element 4,” he alleged that “the withheld *Brady* material” created a reasonable probability of a different outcome. *Id.* at 23. Under the heading “Giglio Impeachment Evidence Was Also Withheld,” he identified impeachment material concerning Government witnesses — a cooperation agreement, correspondence about promises of leniency, prior inconsistent statements, and a co-defendant’s criminal history — and alleged that the lack of these disclosures kept him from impeaching key witnesses “in violation of *Brady*/*Giglio*.” *Id.* at 23–24. He then stated that, in his case, “two independent constitutional violations occur: (1) *Brady* violation by the government (failure to disclose); and (2) Ineffective assistance of counsel . . . .” *Id.* at 24."),
  body("Appellant acknowledges that much of the memorandum is written against stand-by counsel. The *Brady* discussion appears under a section heading that refers to stand-by counsel, *id.* at 21, 24; the memorandum says stand-by counsel’s refusal to help “constructively suppresses” evidence “even if the government technically ‘made it available,’” *id.* at 24; and the cumulative-error section ends by describing the errors as amounting to ineffective assistance, *id.* at 36. He does not hide those passages. His point is that the motion *also* alleged, in plain words, that the Government failed to disclose favorable evidence, and that this allegation is a separate constitutional claim."),
  sub("C.\tThe district court’s rulings"),
  body("The district court construed four grounds: three claims of ineffective assistance by stand-by counsel and a claim of cumulative error. ECF No. 10 at 3–4. In a footnote, it stated that Appellant “does not adequately raise any standalone *Brady* or *Giglio* claims outside the ineffective-assistance context,” and it “decline[d] to construe additional claims not expressly raised.” *Id.* at 4 n.8. It then held that a defendant who represents himself cannot claim ineffective assistance by stand-by counsel, rejected the cumulative-error ground, and denied a COA. *Id.* at 6–10. The court did not decide whether the Government suppressed favorable evidence."),
  body("Appellant moved under Rule 59(e), arguing that the court had overlooked the Government-disclosure claim in his original motion. ECF No. 12. The court denied the motion. ECF No. 18. Relying on *Barritt v. Secretary, Florida Department of Corrections*, 968 F.3d 1246 (11th Cir. 2020), it reasoned that “[a] district court need not infer an independent claim from allegations offered in support of another,” and it described Appellant’s *Brady* allegations as “passing references” within arguments framed against stand-by counsel. ECF No. 18 at 3–4. It also held that Appellant “may not rely on the present Motion to introduce new arguments that could have been raised before the Court entered the Final Judgment.” *Id.* at 5. It denied a COA, citing *Hamilton v. Secretary, Florida Department of Corrections*, 793 F.3d 1261, 1266 (11th Cir. 2015). ECF No. 18 at 7."),
  body("Appellant does not seek a COA on the district court’s holding that he cannot bring an ineffective-assistance claim against stand-by counsel. He asks only that this Court allow him to appeal the court’s failure to decide his separate claim against the Government."),
  head("THE STANDARD FOR A CERTIFICATE OF APPEALABILITY"),
  body("A COA may issue if the applicant “has made a substantial showing of the denial of a constitutional right.” 28 U.S.C. § 2253(c)(2). When the district court did not reach the underlying constitutional claim, a COA should issue if the applicant shows “that jurists of reason would find it debatable whether the petition states a valid claim of the denial of a constitutional right and that jurists of reason would find it debatable whether the district court was correct in its procedural ruling.” *Slack v. McDaniel*, 529 U.S. 473, 484 (2000)."),
  body("This is a threshold question, not a ruling on the merits. A court of appeals “should not decline the application for a COA merely because it believes the applicant will not demonstrate an entitlement to relief.” *Miller-El v. Cockrell*, 537 U.S. 322, 337 (2003). Indeed, “a claim can be debatable even though every jurist of reason might agree, after the COA has been granted and the case has received full consideration, that petitioner will not prevail.” *Id.* at 338."),
  head("ARGUMENT"),
  sub("I.\tJurists of Reason Could Debate Whether the District Court Violated *Clisby* by Leaving Appellant’s *Brady* Claim Against the Government Undecided."),
  sub("A.\tThe district court had to resolve every allegation of a constitutional violation."),
  body("In *Clisby*, this Court, sitting en banc, instructed district courts to resolve all claims for relief raised in a habeas petition, whether relief is granted or denied. 960 F.2d at 936. “A claim for relief for purposes of this instruction is any allegation of a constitutional violation.” *Id.* And “an allegation of one constitutional violation and an allegation of another constitutional violation constitute two distinct claims for relief, even if both allegations arise from the same alleged set of operative facts.” *Id.* When a district court fails to resolve a claim, this Court vacates the judgment without prejudice and remands. *Id.* at 938. The rule applies to motions under § 2255. *Rhode*, 583 F.3d at 1291."),
  body("A pro se filing must be read generously: “a pro se complaint, however inartfully pleaded, must be held to less stringent standards than formal pleadings drafted by lawyers.” *Erickson v. Pardus*, 551 U.S. 89, 94 (2007) (citation and internal quotation marks omitted). At the same time, “[a] habeas petitioner must present a claim in clear and simple language such that the district court may not misunderstand it.” *Dupree v. Warden*, 715 F.3d 1295, 1299 (11th Cir. 2013). These two rules work together. In *Dupree*, the claim the district court missed “consist[ed] of two sentences found in the middle of a fifteen-page memorandum attached to Dupree’s petition,” and this Court still held that the failure to resolve it violated *Clisby*. *Id.* In *Rhode*, the Court found a claim in statements spread across the motion and its memorandum, holding that “[t]hese statements, liberally construed, adequately state a claim of ineffective assistance of counsel.” 583 F.3d at 1292. This Court granted a COA on the *Clisby* question in both cases. *Id.* at 1289–90; *Dupree*, 715 F.3d at 1298."),
  sub("B.\tAppellant’s motion alleged a *Brady* violation by the Government in clear terms."),
  body("Reasonable jurists could conclude that Appellant’s motion did far more than mention *Brady* in passing. He listed the elements of a *Brady* claim and addressed each one. ECF No. 1 at 21–23. He identified the evidence he believed the Government possessed. *Id.* at 21, 24. He alleged that the Government failed to provide it: “The government’s failure to provide *Brady* material . . . resulted in effective suppression even if not intentional.” *Id.* at 23. He alleged materiality. *Id.* And he expressly told the court that the facts gave rise to “two independent constitutional violations,” the first being a “*Brady* violation by the government (failure to disclose).” *Id.* at 24."),
  body("Those allegations name a different wrongdoer (the prosecution), a different constitutional source (due process), and a different legal test (suppression of favorable, material evidence) than the Sixth Amendment claim against stand-by counsel. Under *Clisby*, that makes them a distinct claim, even though both claims grow out of the same discovery dispute. 960 F.2d at 936. The district court treated the overlap in facts as a reason to fold the *Brady* allegations into the ineffective-assistance grounds. ECF No. 18 at 3–4. *Clisby* says the opposite."),
  sub("C.\t*Barritt* does not put the question beyond debate."),
  body("The district court relied on *Barritt*. There, this Court held that “simply because Barritt made passing references to ‘coercion’ does not mean he asserted an independent coercion claim for the purposes of *Clisby*.” 968 F.3d at 1251–52. Barritt had alluded to “pressure” and “coercion” while arguing that counsel was ineffective; he never alleged a freestanding coercion claim. *Id.* Appellant’s motion is different in kind. It did not merely use the word *Brady*. It set out the *Brady* elements, applied each one, accused the Government of a failure to disclose, and labeled that failure a separate constitutional violation. Whether that crosses the line between *Barritt*’s “passing references” and the claims recognized in *Rhode* and *Dupree* is, at a minimum, debatable."),
  body("Appellant recognizes the passages that cut the other way, including the heading of the subsection in which the “two independent constitutional violations” sentence appears and the closing sentence of the cumulative-error section. ECF No. 1 at 24, 36. But a pro se litigant’s choice of headings does not control what his allegations say, and the question under *Clisby* is whether the motion contains an “allegation of a constitutional violation,” 960 F.2d at 936 — not whether the litigant organized his brief as a lawyer would. A jurist could reasonably weigh these passages differently than the district court did. That is enough for a COA. *Miller-El*, 537 U.S. at 338."),
  sub("D.\tThe motion states a valid claim of the denial of a constitutional right."),
  body("The first part of the *Slack* test is also met. “[T]he suppression by the prosecution of evidence favorable to an accused upon request violates due process where the evidence is material either to guilt or to punishment, irrespective of the good faith or bad faith of the prosecution.” *Brady*, 373 U.S. at 87. Appellant alleged that he repeatedly requested *Brady* and *Giglio* material, ECF No. 1 at 4; that the Government held favorable evidence, including impeachment evidence such as a cooperation agreement and promises of leniency to Government witnesses, *id.* at 21, 24; that it was not provided, *id.* at 23; and that its absence prevented him from impeaching key witnesses and created a reasonable probability of a different result, *id.* at 23–24. Allegations that the prosecution withheld cooperation agreements and leniency promises given to its witnesses state a classic *Giglio* claim."),
  body("The Government has argued that any such claim is procedurally defaulted and fails on the merits. ECF No. 14 at 3. The district court did not decide either question. Those are matters for the district court on remand, not reasons to deny a COA, because the COA inquiry “does not require a showing that the appeal will succeed.” *Miller-El*, 537 U.S. at 337."),
  sub("II.\tJurists of Reason Could Debate Whether the Rule 59(e) Ruling Was Correct."),
  body("The district court denied Rule 59(e) relief in part because Appellant’s motion raised “new arguments that could have been raised before the Court entered the Final Judgment.” ECF No. 18 at 5. But Appellant’s Rule 59(e) motion did not add a claim. It argued that the court had overlooked a claim already in his original motion, and it pointed to the pages where that claim appears. Rule 59(e) exists to correct manifest errors of law or fact, ECF No. 18 at 2, and a failure to resolve a pleaded claim, if it occurred, is that kind of error."),
  body("*Hamilton* is not to the contrary. There, the Rule 59(e) motion sought to “raise for the first time an attorney-abandonment claim,” and this Court held that “[t]he denial of that Rule 59(e) motion is not debatable among reasonable jurists.” 793 F.3d at 1266. Appellant’s *Brady* claim was not raised for the first time after judgment; whether it was raised before judgment is the very question presented in Issue I. If that question is debatable, so is the court’s refusal to correct the omission under Rule 59(e)."),
  body("Issue II is offered in addition to Issue I, not in place of it. Because Appellant’s Rule 59(e) motion was timely — the district court’s order describes it as filed on June 21, 2026, within 28 days after the May 27 judgment, ECF No. 18 at 1 — the May 27 order itself is before this Court, and Issue I can be decided without regard to the Rule 59(e) standard."),
  head("CONCLUSION"),
  body("Appellant respectfully asks this Court to issue a certificate of appealability on Issues I and II, or at a minimum on Issue I: whether the district court violated *Clisby v. Jones* by failing to resolve his claim that the Government suppressed favorable evidence in violation of *Brady* and *Giglio*."),
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
  blank(),
];

const tail = [
  head("CERTIFICATE OF COMPLIANCE"),
  body("This application complies with the type-volume limit of Federal Rule of Appellate Procedure 27(d)(2)(A) because, excluding the parts of the document exempted by Rule 32(f), it contains __WORDS__ words. It complies with the typeface and type-style requirements of Rules 27(d)(1)(E), 32(a)(5), and 32(a)(6) because it was prepared in 14-point Times New Roman."),
  blank(),
  flush("________________________________"),
  flush("SERGE NKORINA"),
  brk(),
  head("CERTIFICATE OF SERVICE AND DECLARATION OF INMATE FILING"),
  body("I certify that on the date below I placed this Application for a Certificate of Appealability, with its appendix, in the legal mail system at the Federal Correctional Institution — Miami, with first-class postage prepaid, addressed to the Clerk of Court, United States Court of Appeals for the Eleventh Circuit, 56 Forsyth Street, N.W., Atlanta, Georgia 30303, and that I mailed a copy, first-class postage prepaid, to counsel for the United States:"),
  blank(),
  flush("George E. Doty III, Assistant United States Attorney,"),
  flush("or other counsel of record for the United States"),
  flush("United States Attorney’s Office, Southern District of Florida"),
  flush("99 N.E. 4th Street"),
  flush("Miami, FL 33132"),
  blank(),
  body("I declare under penalty of perjury under 28 U.S.C. § 1746 that the foregoing is true and correct, and that I deposited this document in the institution’s internal mail system on ____________________, 2026, with first-class postage prepaid."),
  blank(),
  flush("Executed on this ____ day of ______________, 2026."),
  blank(), blank(),
  flush("________________________________"),
  flush("SERGE NKORINA"),
  flush("Petitioner-Appellant, Pro Se"),
  flush("Reg. No. 26432-509"),
];

const words = process.argv[2] || "____";
tail[1] = body(`This application complies with the length limits of Federal Rule of Appellate Procedure 27(d)(2)(A) and Eleventh Circuit Rule 22-2 because, excluding the parts of the document exempted by Rule 32(f), it contains ${words} words. It complies with the typeface and type-style requirements of Rules 27(d)(1)(E), 32(a)(5), and 32(a)(6) because it was prepared in a 14-point proportionally spaced serif typeface.`);

const doc = new Document({
  styles: { default: { document: { run: { font: "Times New Roman", size: 28 } } } },
  sections: [
    { properties: { page: L.page }, headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) }, children: caption },
    { properties: { page: { ...L.page, margin: { ...L.page.margin, top: 2160, header: 1440 }, pageNumbers: { start: 1 } } }, headers: { default: cipHeader }, children: cip },
    { properties: { page: { ...L.page, pageNumbers: { start: 1 } } }, headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) }, footers: { default: L.footer() }, children: [...T, brk(), ...tail] },
  ],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[3] || "Nkorina_COA_Application.docx", b); console.log("COA written"); });
// export body text for word count
fs.writeFileSync("coa_body_words.txt", T.map(p => "").join(""));
