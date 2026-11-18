import React, { useState } from 'react';
import { BarChart3, Compass, Info, Scale, TrendingUp, MapPin } from 'lucide-react';
import { StimulusVisual } from '../types/quiz';

interface Props {
  visual: StimulusVisual;
  imagePath?: string;
  stimulusTitle: string;
}

export const StimulusVisualRenderer: React.FC<Props> = ({
  visual,
  imagePath,
  stimulusTitle,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="space-y-4">
      {imagePath && !imgError && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          <img
            src={imagePath}
            alt={`Ilustrasi ${stimulusTitle}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-44 sm:h-52 object-cover"
          />
          <div className="px-3.5 py-2 bg-white border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Ilustrasi Kontekstual Kecamatan Wanaraya, Barito Kuala</span>
          </div>
        </div>
      )}

      {visual.kind === 'bar_chart' && <BarChartSVG visual={visual} />}
      {visual.kind === 'line_chart' && <LineChartSVG visual={visual} />}
      {visual.kind === 'pythagoras_diagram' && <PythagorasDiagramSVG visual={visual} />}
      {visual.kind === 'infographic_cards' && <InfographicCards visual={visual} />}
      {visual.kind === 'scale_equation' && <ScaleEquationSVG visual={visual} />}
    </div>
  );
};

function BarChartSVG({
  visual,
}: {
  visual: Extract<StimulusVisual, { kind: 'bar_chart' }>;
}) {
  const maxVal = Math.max(...visual.data.map((d) => d.value), 1);
  const svgW = 540;
  const svgH = 220;
  const padL = 48;
  const padR = 20;
  const padT = 26;
  const padB = 42;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const barStep = chartW / visual.data.length;
  const barW = Math.min(54, barStep * 0.56);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{visual.title}</h4>
          <p className="text-xs text-slate-500">{visual.subtitle}</p>
        </div>
        <BarChart3 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      </div>

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full h-auto"
        role="img"
        aria-label={visual.title}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padT + chartH * (1 - t);
          const tickVal = Math.round(maxVal * t * 10) / 10;
          return (
            <g key={i}>
              <line
                x1={padL}
                y1={y}
                x2={svgW - padR}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={t === 0 ? undefined : '3 3'}
              />
              <text
                x={padL - 8}
                y={y + 3.5}
                textAnchor="end"
                className="fill-slate-500 text-[10px] font-mono"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        <text
          x={12}
          y={padT + chartH / 2}
          textAnchor="middle"
          transform={`rotate(-90 12 ${padT + chartH / 2})`}
          className="fill-slate-500 text-[10px] font-medium"
        >
          {visual.yAxisLabel}
        </text>

        {visual.data.map((d, idx) => {
          const h = (d.value / maxVal) * chartH;
          const x = padL + idx * barStep + (barStep - barW) / 2;
          const y = padT + chartH - h;
          const fill = d.highlight ? '#059669' : '#0284C7';
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barW} height={h} rx={5} fill={fill} opacity={0.92} />
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                className="fill-slate-800 text-[10.5px] font-mono font-semibold"
              >
                {d.value}
                {d.unit ? ` ${d.unit}` : ''}
              </text>
              <text
                x={x + barW / 2}
                y={svgH - 16}
                textAnchor="middle"
                className="fill-slate-700 text-[10.5px] font-medium"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChartSVG({
  visual,
}: {
  visual: Extract<StimulusVisual, { kind: 'line_chart' }>;
}) {
  const maxVal = Math.max(...visual.data.map((d) => d.value), 1) * 1.1;
  const svgW = 540;
  const svgH = 220;
  const padL = 50;
  const padR = 26;
  const padT = 26;
  const padB = 42;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const points = visual.data.map((d, idx) => {
    const x =
      visual.data.length === 1
        ? padL + chartW / 2
        : padL + (idx / (visual.data.length - 1)) * chartW;
    const y = padT + chartH - (d.value / maxVal) * chartH;
    return { ...d, x, y };
  });

  const polylinePts = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{visual.title}</h4>
          <p className="text-xs text-slate-500">{visual.subtitle}</p>
        </div>
        <TrendingUp className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      </div>

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full h-auto"
        role="img"
        aria-label={visual.title}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padT + chartH * (1 - t);
          const tickVal = Math.round(maxVal * t * 10) / 10;
          return (
            <g key={i}>
              <line
                x1={padL}
                y1={y}
                x2={svgW - padR}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={t === 0 ? undefined : '3 3'}
              />
              <text
                x={padL - 8}
                y={y + 3.5}
                textAnchor="end"
                className="fill-slate-500 text-[10px] font-mono"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        <text
          x={12}
          y={padT + chartH / 2}
          textAnchor="middle"
          transform={`rotate(-90 12 ${padT + chartH / 2})`}
          className="fill-slate-500 text-[10px] font-medium"
        >
          {visual.yAxisLabel}
        </text>

        <polyline
          fill="none"
          stroke="#0284C7"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={polylinePts}
        />

        {points.map((p) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.highlight ? 6 : 4.5}
              fill={p.highlight ? '#059669' : '#0284C7'}
              stroke="#FFFFFF"
              strokeWidth={2}
            />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              className="fill-slate-800 text-[10px] font-mono font-semibold"
            >
              {p.value}
            </text>
            <text
              x={p.x}
              y={svgH - 14}
              textAnchor="middle"
              className="fill-slate-700 text-[9.5px] font-medium"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PythagorasDiagramSVG({
  visual,
}: {
  visual: Extract<StimulusVisual, { kind: 'pythagoras_diagram' }>;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{visual.title}</h4>
          <p className="text-xs text-slate-500">{visual.subtitle}</p>
        </div>
        <Compass className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      </div>

      <svg
        viewBox="0 0 520 230"
        className="w-full h-auto"
        role="img"
        aria-label={visual.title}
      >
        {/* Grid background */}
        <defs>
          <pattern id="mathGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="520" height="230" rx="8" fill="url(#mathGrid)" />

        {/* Right Triangle: B=(120,180), A=(380,180), C=(120,45) */}
        <polygon
          points="120,180 380,180 120,45"
          fill="#E0F2FE"
          fillOpacity="0.6"
          stroke="#0284C7"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Right angle square at B (120,180) */}
        <polyline
          points="120,162 138,162 138,180"
          fill="none"
          stroke="#0F172A"
          strokeWidth="1.8"
        />

        {/* Vertices */}
        <circle cx="380" cy="180" r="5" fill="#0284C7" />
        <circle cx="120" cy="180" r="5" fill="#0F172A" />
        <circle cx="120" cy="45" r="5" fill="#059669" />

        {/* Vertex Labels */}
        <text x="386" y="198" textAnchor="end" className="fill-slate-900 text-[11px] font-semibold">
          {visual.pointA}
        </text>
        <text x="115" y="198" textAnchor="start" className="fill-slate-900 text-[11px] font-semibold">
          {visual.pointB}
        </text>
        <text x="120" y="32" textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold">
          {visual.pointC}
        </text>

        {/* Side Labels */}
        <text x="250" y="200" textAnchor="middle" className="fill-slate-800 text-[11.5px] font-mono font-semibold">
          {visual.sideALabel}
        </text>
        <text x="108" y="116" textAnchor="end" className="fill-slate-800 text-[11.5px] font-mono font-semibold">
          {visual.sideBLabel}
        </text>
        <text
          x="266"
          y="102"
          textAnchor="start"
          className="fill-sky-700 text-[11.5px] font-mono font-semibold"
        >
          {visual.hypotenuseLabel}
        </text>
      </svg>

      <p className="mt-2 text-xs font-medium text-slate-600">{visual.contextCaption}</p>
    </div>
  );
}

function InfographicCards({
  visual,
}: {
  visual: Extract<StimulusVisual, { kind: 'infographic_cards' }>;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{visual.title}</h4>
          <p className="text-xs text-slate-500">{visual.subtitle}</p>
        </div>
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {visual.facts.map((fact) => (
          <div
            key={fact.label}
            className="bg-slate-50 border border-slate-200/80 rounded-lg p-3"
          >
            <div className="text-xs text-slate-500 mb-1">{fact.label}</div>
            <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
              {fact.value}
            </div>
            {fact.note && (
              <div className="text-xs text-sky-700 mt-1 font-medium">{fact.note}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 text-[11.5px] text-slate-500">
        Sumber: {visual.sourceNote}
      </div>
    </div>
  );
}

function ScaleEquationSVG({
  visual,
}: {
  visual: Extract<StimulusVisual, { kind: 'scale_equation' }>;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{visual.title}</h4>
          <p className="text-xs text-slate-500">{visual.subtitle}</p>
        </div>
        <Scale className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-center">
          <div className="text-[11px] text-slate-500 mb-0.5">Ruas Kiri</div>
          <div className="text-sm sm:text-base font-mono font-semibold text-slate-900">
            {visual.leftPan}
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-mono font-bold text-lg flex items-center justify-center shrink-0">
          {visual.relationSymbol}
        </div>

        <div className="flex-1 w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-center">
          <div className="text-[11px] text-slate-500 mb-0.5">Ruas Kanan</div>
          <div className="text-sm sm:text-base font-mono font-semibold text-slate-900">
            {visual.rightPan}
          </div>
        </div>
      </div>

      {visual.numberLineHint && (
        <p className="mt-2.5 text-xs text-slate-600 font-medium">
          Petunjuk model: {visual.numberLineHint}
        </p>
      )}
    </div>
  );
}
