import gfg from "../constants/gfg-dsa-sheet.json";
import striver from "../constants/striver-sde-sheet.json";
import arsh from "../constants/arsh-goyel-sheet.json";
export interface DSAQuestion {
  topic: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  id: string;
  sheet: SheetType;
}

export type SheetType = 'gfg' | 'striver' | 'arsh';

export const dsaQuestions: DSAQuestion[] = (gfg as Omit<DSAQuestion, 'sheet'>[]).map(q => ({ ...q, sheet: 'gfg' as SheetType }));
export const striverSheet: DSAQuestion[] = (striver as Omit<DSAQuestion, 'sheet'>[]).map(q => ({ ...q, sheet: 'striver' as SheetType }));
export const arshSheet: DSAQuestion[] = (arsh as Omit<DSAQuestion, 'sheet'>[]).map(q => ({ ...q, sheet: 'arsh' as SheetType }));

export const sheets = {
  gfg: dsaQuestions,
  striver: striverSheet,
  arsh: arshSheet,
} as const;

export const sheetOptions = [
  { value: 'striver', label: 'Striver SDE Sheet' },
  { value: 'arsh', label: 'Arsh Goyel Sheet' },
  { value: 'gfg', label: 'GFG DSA Sheet' },
] as const;
