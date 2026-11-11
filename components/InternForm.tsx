"use client";

import { useRef, useState } from "react";
import { INTERN_FORM, WHATSAPP } from "@/lib/data";

/*
 * Our own intern application form. Answers are sent to the club's existing Google Form,
 * so responses still show up in the same Google Forms / Sheets results as before.
 *
 * If someone edits the Google Form's questions, the entry IDs below can change.
 * To refresh them, open the Google Form, view the page source and search for "entry",
 * or ask whoever maintains the site.
 */
const FORM_ID = "1FAIpQLSdP9euvjz7ovwf4HqdUZiMnWqIlLjIIVJbScNk1spUzFCGY3g";
const POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
const WHEN2MEET = "https://www.when2meet.com/?39035567-4wMPZ";

const E = {
  availability: "entry.1930860739",
  name: "entry.2005620554",
  cwid: "entry.220331821",
  email: "entry.1045781291",
  phone: "entry.1166974658",
  year: "entry.762409985",
  why: "entry.839337160",
  experience: "entry.942918086",
  position: "entry.282029896",
  meetings: "entry.1411914984",
  whatsapp: "entry.656252082",
  jumuah: "entry.436328282",
  extra: "entry.815795530",
};

const STEPS = ["About you", "Your answers", "Commitments"];

type Status = "editing" | "sending" | "done" | "error";

export default function InternForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("editing");
  const [year, setYear] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);

  /** Runs the browser's built-in validation on just the current step. */
  const stepValid = (i: number) => {
    const fs = stepRefs.current[i];
    if (!fs) return true;
    const fields = Array.from(fs.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"));
    for (const f of fields) {
      if (!f.checkValidity()) { f.reportValidity(); return false; }
    }
    return true;
  };

  const next = () => { if (stepValid(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stepValid(step)) return;
    if (step < STEPS.length - 1) { next(); return; }

    const fd = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      if (typeof v === "string" && v.trim() !== "") body.append(k, v.trim());
    }
    body.append("fvv", "1");
    body.append("pageHistory", "0");

    setStatus("sending");
    try {
      // Google doesn't allow reading the reply from another site ("no-cors"),
      // so a completed request is treated as success.
      await fetch(POST_URL, { method: "POST", mode: "no-cors", body });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="apply-card apply-done" role="status">
        <svg className="check" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" />
          <path fill="none" d="M15 27l7 7 15-16" />
        </svg>
        <h3>JazakAllahu khayran!</h3>
        <p>Your application is in. An officer will reach out to set up a quick 15-minute chat.</p>
        <a className="btn btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Join the WhatsApp community</a>
      </div>
    );
  }

  return (
    <form ref={formRef} className="apply-card" onSubmit={submit} noValidate>
      <ol className="apply-steps" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
            <span>{i < step ? "✓" : i + 1}</span>{s}
          </li>
        ))}
      </ol>
      <div className="apply-bar" aria-hidden="true"><i style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>

      {/* Step 1 */}
      <fieldset ref={(el) => { stepRefs.current[0] = el; }} hidden={step !== 0} className="apply-step">
        <legend className="sr-only">About you</legend>
        <div className="field-grid">
          <label className="field">
            <span>Full name <b aria-hidden="true">*</b></span>
            <input name={E.name} autoComplete="name" required placeholder="First and last name" />
          </label>
          <label className="field">
            <span>CWID <b aria-hidden="true">*</b></span>
            <input name={E.cwid} inputMode="numeric" autoComplete="off" required placeholder="Your De Anza student ID" />
          </label>
          <label className="field">
            <span>Email <b aria-hidden="true">*</b></span>
            <input name={E.email} type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>Phone number <b aria-hidden="true">*</b></span>
            <input name={E.phone} type="tel" autoComplete="tel" required placeholder="(408) 555-0123" />
          </label>
        </div>

        <div className="field">
          <span>What year are you in?</span>
          <div className="chips" role="radiogroup">
            {["1st", "2nd", "3rd"].map((y) => (
              <label key={y} className="chip">
                <input type="radio" name={E.year} value={y} checked={year === y} onChange={() => setYear(y)} />
                <span>{y}</span>
              </label>
            ))}
            <label className="chip">
              <input type="radio" name={E.year} value="__other_option__" checked={year === "other"} onChange={() => setYear("other")} />
              <span>Other</span>
            </label>
          </div>
          {year === "other" && (
            <input className="other-input" name={`${E.year}.other_option_response`} required placeholder="Tell us your year" />
          )}
        </div>
      </fieldset>

      {/* Step 2 */}
      <fieldset ref={(el) => { stepRefs.current[1] = el; }} hidden={step !== 1} className="apply-step">
        <legend className="sr-only">Your answers</legend>
        <p className="apply-hint">Keep it meaningful but short. Don&apos;t worry about perfect answers.</p>
        <label className="field">
          <span>Why do you want to be an MSA intern? <b aria-hidden="true">*</b></span>
          <textarea name={E.why} required rows={3} />
        </label>
        <label className="field">
          <span>What experience would you bring to this role? <b aria-hidden="true">*</b></span>
          <textarea name={E.experience} required rows={3} />
        </label>
        <label className="field">
          <span>If you were an officer, which position would interest you most, and why? <b aria-hidden="true">*</b></span>
          <textarea name={E.position} required rows={3} />
        </label>
      </fieldset>

      {/* Step 3 */}
      <fieldset ref={(el) => { stepRefs.current[2] = el; }} hidden={step !== 2} className="apply-step">
        <legend className="sr-only">Commitments</legend>

        <div className="field">
          <span>Pick times for a quick 15-minute meeting with an officer <b aria-hidden="true">*</b></span>
          <p className="apply-hint">Fill in <strong>all</strong> the times you&apos;re free on <a href={WHEN2MEET} target="_blank" rel="noreferrer">our when2meet ↗</a>, then check the box.</p>
          <label className="check-row">
            <input type="checkbox" name={E.availability} value="Filled out!" required />
            <span>I filled out my availability</span>
          </label>
        </div>

        <div className="field">
          <span>Weekly meetings <b aria-hidden="true">*</b></span>
          <label className="check-row">
            <input type="checkbox" name={E.meetings} value="Yes" required />
            <span>I will join the <strong>mandatory</strong> weekly MSA meetings</span>
          </label>
        </div>

        <div className="field">
          <span>Have you been added to the WhatsApp group chat? <b aria-hidden="true">*</b></span>
          <div className="chips" role="radiogroup">
            {[["Yes!", "Yes!"], ["No :(", "Not yet"]].map(([v, l]) => (
              <label key={v} className="chip">
                <input type="radio" name={E.whatsapp} value={v} required checked={whatsapp === v} onChange={() => setWhatsapp(v)} />
                <span>{l}</span>
              </label>
            ))}
          </div>
          {whatsapp === "No :(" && (
            <p className="apply-hint">No problem. <a href={WHATSAPP} target="_blank" rel="noreferrer">Join the WhatsApp community here ↗</a></p>
          )}
        </div>

        <div className="field">
          <span>Would you come to Friday Jumu&apos;ah at De Anza? <b aria-hidden="true">*</b></span>
          <p className="apply-hint">Jumu&apos;ah is every Friday, 1:00–2:30 PM, in Campus Center Room 223. This helps us plan for headcount.</p>
          <div className="chips" role="radiogroup">
            {[["Yes count me in!", "Yes, count me in!"], ["No, I am not available", "Not available"]].map(([v, l]) => (
              <label key={v} className="chip">
                <input type="radio" name={E.jumuah} value={v} required />
                <span>{l}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="field">
          <span>Anything else you&apos;d like us to know? <b aria-hidden="true">*</b></span>
          <textarea name={E.extra} required rows={2} placeholder={'Write "No" if nothing'} />
        </label>
      </fieldset>

      {status === "error" && (
        <p className="apply-error" role="alert">
          Something went wrong sending your application. Please try again, or use the <a href={INTERN_FORM} target="_blank" rel="noreferrer">Google Form version ↗</a>.
        </p>
      )}

      <div className="apply-actions">
        {step > 0 ? <button type="button" className="btn btn-ghost" onClick={back}>← Back</button> : <span />}
        {step < STEPS.length - 1
          ? <button type="button" className="btn btn-primary" onClick={next}>Next →</button>
          : <button type="submit" className="btn btn-primary btn-shine" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Submit application"}
            </button>}
      </div>
    </form>
  );
}
