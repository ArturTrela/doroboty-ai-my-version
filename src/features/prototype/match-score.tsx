export function MatchScore({ score }: { score: number }) {
  const band = score >= 80 ? "green" : score >= 60 ? "yellow" : score >= 40 ? "orange" : "red";
  return (
    <span className="match-score" data-score-band={band}>
      Match Score: {score}%
    </span>
  );
}
