"use client";

import { Button } from "@/components/ui/button";
import { withdrawApplication } from "@/features/applications/actions";

export function WithdrawApplicationForm({ applicationId }: { applicationId: string }) {
  return (
    <form
      action={withdrawApplication}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Wycofać aplikację? Pracodawca zobaczy zmianę i nie będzie można wysłać jej ponownie.",
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="applicationId" value={applicationId} />
      <Button type="submit" variant="destructive">
        Wycofaj aplikację
      </Button>
    </form>
  );
}
