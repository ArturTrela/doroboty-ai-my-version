import { useId } from "react";
import {
  experienceLabels,
  experienceLevel,
  skillLabels,
  type SkillId,
  type ExperienceChoices,
  type ExperienceLevel,
  type experienceSnapshot,
} from "./experience";
import type { z } from "zod";

export function ExperienceFields({
  skills,
  values,
  onChange,
  disabled,
}: {
  skills: readonly SkillId[];
  values: ExperienceChoices;
  onChange: (values: ExperienceChoices) => void;
  disabled?: boolean;
}) {
  const group = useId();
  return (
    <div className="experience-fields">
      {skills.map((id) => (
        <fieldset key={id} disabled={disabled}>
          <legend>{skillLabels[id]}</legend>
          <div className="experience-options">
            {[...experienceLevel.options].reverse().map((level) => (
              <label key={level} data-level={level}>
                <input
                  className="sr-only"
                  type="radio"
                  name={group + id}
                  checked={values[id] === level}
                  onChange={() => onChange({ ...values, [id]: level })}
                />
                <span>{experienceLabels[level]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

function comparison(declared: ExperienceLevel | undefined, expected: ExperienceLevel) {
  if (!declared) return "missing";
  const levels = experienceLevel.options;
  const difference = levels.indexOf(declared) - levels.indexOf(expected);
  return difference < 0 ? "below" : difference > 0 ? "above" : "equal";
}

export function ExperienceCard({ entries }: { entries: z.infer<typeof experienceSnapshot> }) {
  return (
    <section className="experience-fields" aria-label="Karta doświadczenia">
      <h3>Karta doświadczenia</h3>
      {entries.map(({ skill, expected, declared }) => {
        const status = comparison(declared, expected);
        return (
          <div className="experience-result" key={skill} data-status={status}>
            <strong>{skillLabels[skill]}</strong>
            <p>Oczekiwanie: {experienceLabels[expected]}</p>
            <p>Deklaracja: {declared ? experienceLabels[declared] : "Brak deklaracji"}</p>
            {status === "below" && <p>Poniżej oczekiwań</p>}
            {status === "above" && <p>Powyżej oczekiwań</p>}
          </div>
        );
      })}
    </section>
  );
}
