# Mitra AI Tutor — CMAT 2026

A CMAT study dashboard with a 35-module course, step-by-step lessons, local progress tracking and downloadable Hinglish notes across all five exam sections.

## What is included

- **35 in-app modules** across Quantitative Techniques & Data Interpretation, Logical Reasoning, Language Comprehension, General Awareness, and Innovation & Entrepreneurship.
- **Five editable Hinglish study guides** with basic-to-advanced explanations, worked examples, formula and process maps, common traps, and explained practice.
- **Expanded syllabus coverage map** connecting each topic group in the supplied CMAT 2026 expanded checklist to the corresponding app lesson.
- **Practice and progress tools** with sectional navigation, topic learning states and saved quiz attempts.

## Hinglish study guides

Open the dashboard’s **Hinglish Study Library** to download the Word guides, or use these links:

| Subject | Guide |
|---|---|
| Quantitative Techniques & Data Interpretation | [Download](public/study-guides/CMAT_Hinglish_Quantitative_DI_Notes.docx) |
| Logical Reasoning | [Download](public/study-guides/CMAT_Hinglish_Logical_Reasoning_Notes.docx) |
| Language Comprehension | [Download](public/study-guides/CMAT_Hinglish_Language_Comprehension_Notes.docx) |
| General Awareness | [Download](public/study-guides/CMAT_Hinglish_General_Awareness_Notes.docx) |
| Innovation & Entrepreneurship | [Download](public/study-guides/CMAT_Hinglish_Innovation_Entrepreneurship_Notes.docx) |

The guides contain 25 topic modules and 30 explained practice entries per module, including five additional multistep challenge questions per module. See [the complete topic-group coverage map](docs/CMAT_2026_HINGLISH_COVERAGE_MAP.md).

## Syllabus and changing facts

The student-supplied `CMAT_2026_Detailed_Expanded_Syllabus.pdf` describes itself as a practical study checklist expanded from broad syllabus headings. Its added subtopics are preparation guidance, not a guarantee that each item is officially prescribed or will appear. Check the [official NTA CMAT site](https://exams.nta.ac.in/CMAT/) for the latest year’s syllabus and exam rules.

General Awareness and entrepreneurship notes distinguish stable concepts from changing facts. Verify current affairs, government-scheme eligibility, office holders, rates and economic figures using dated official sources close to the exam.

The supplied 2025 Slot 1 and Slot 2 PDFs did not expose complete question bodies in text extraction. The project’s practice questions are original and syllabus-aligned; the project does not claim a complete question-by-question paper analysis or reproduce candidate response records.

## Run locally

```bash
npm install
npm run dev
```

Build the production site with:

```bash
npm run build
```

Deploy on Vercel by importing this repository. No environment variables are required for the study dashboard.
