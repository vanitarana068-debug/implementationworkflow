// Change the brand name here.
export const BRAND = "Aurevix";
export const TAGLINE = "Intelligence beyond operations.";
export const DESCRIPTION = "We engineer intelligent systems that automate operations, accelerate growth and transform the way businesses work.";
export const PILLARS = ["Automate", "Integrate", "Accelerate"];

// Where every "Get your free AI audit" button goes.
export const AUDIT_URL = "https://www.northstarai.online/";

export const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Workflows", href: "#workflows" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
];

export type CalcInput = {
  employees: number;
  salary: number; // monthly per employee
  repetitiveHours: number; // per employee per day
  enquiries: number; // monthly
  missedPct: number; // %
  customerValue: number;
};

// Transparent assumptions
export const ASSUMPTIONS = {
  workDays: 22,
  hoursPerMonth: 176,
  automationRate: 0.6, // share of repetitive hours AI can realistically take over
  recoveryRate: 0.3, // share of missed enquiries recovered
  conversionRate: 0.2, // share of recovered enquiries that convert
};

export function calculate(i: CalcInput) {
  const a = ASSUMPTIONS;
  const repetitiveMonthly = i.employees * i.repetitiveHours * a.workDays;
  const hoursSaved = repetitiveMonthly * a.automationRate;
  const hourly = i.salary / a.hoursPerMonth;
  const costSavings = hoursSaved * hourly;
  const missed = i.enquiries * (i.missedPct / 100);
  const extraSales = missed * a.recoveryRate * a.conversionRate;
  const extraRevenue = extraSales * i.customerValue;
  return {
    repetitiveMonthly,
    hoursSaved,
    costSavings,
    extraSales,
    extraRevenue,
    annual: (costSavings + extraRevenue) * 12,
  };
}
