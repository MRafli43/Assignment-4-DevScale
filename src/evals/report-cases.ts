import type { EvalCase } from "@anvia/core/evals";

type ReportCase = EvalCase<string, string | RegExp> & {
    expected: string | RegExp;
};

export const reportCases: ReportCase[] = [
    {
        // Clear answer: a well-known technique, the output must name it correctly.
        id: "clear-answer",
        input: "Apa kepanjangan SMOTE dan bagaimana cara kerjanya secara singkat?",
        expected: /Synthetic\s+Minority\s+Over-?sampling\s+Technique/i,
    },
    {
        // Ambiguous: no technique named, agent must ask back and write no report.
        id: "ambiguous",
        input: "Gimana cara benerin data yang jelek buat model?",
        expected: "NO_REPORT",
    },
    {
        // No useful result: made-up technique, agent must not write a report.
        id: "no-useful-result",
        input: "Jelaskan teknik Zorbakashi Resampling untuk imbalanced data",
        expected: "NO_REPORT",
    },
    {
        // Source citation: the report must contain a source URL.
        id: "source-citation",
        input: "Jelaskan teknik random undersampling untuk imbalanced data",
        expected: /\*\*Source:\*\*\s*https?:\/\/\S+/,
    },
    {
        // Report file created: the report exists and starts with a heading.
        id: "report-created",
        input: "Jelaskan class weighting untuk imbalanced data",
        expected: "=== REPORT ===\n# ",
    },
];
