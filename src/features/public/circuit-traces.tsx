const pads = [
  [6, 17],
  [86, 5],
  [74, 26],
  [196, 5],
  [234, 17],
  [171, 26],
];

function TraceBranch() {
  return (
    <svg viewBox="0 0 240 31">
      <path d="M6 17h38L56 5h30M44 17l9 9h21M117 5h79m-58 0 12 12h84m-80 0 9 9h8" />
      {pads.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3.5" />
      ))}
    </svg>
  );
}

export function CircuitTraces() {
  return (
    <div className="robot-circuit" aria-hidden="true">
      <div className="robot-traces">
        <TraceBranch />
        <TraceBranch />
      </div>
      <div className="robot-traces robot-traces-lit">
        <TraceBranch />
        <TraceBranch />
      </div>
    </div>
  );
}
