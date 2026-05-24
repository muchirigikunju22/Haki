import { ParsedAdvice } from '@/types';

export function parseAdvice(advice: string): ParsedAdvice {
  const sections: ParsedAdvice = {
    rights: '',
    actionItems: '',
    evidence: '',
    help: '',
    references: '',
  };

  if (!advice) return sections;

  // Strip markdown bold markers ** from the text first
  const cleaned = advice.replace(/\*\*/g, '');

  const rightsMatch = cleaned.match(
    /1\.\s*YOUR RIGHTS IN THIS SITUATION[:\s]*([\s\S]*?)(?=\n\s*2\.|$)/i
  );
  if (rightsMatch) sections.rights = rightsMatch[1].trim();

  const actionMatch = cleaned.match(
    /2\.\s*WHAT TO DO RIGHT NOW[:\s]*([\s\S]*?)(?=\n\s*3\.|$)/i
  );
  if (actionMatch) sections.actionItems = actionMatch[1].trim();

  const evidenceMatch = cleaned.match(
    /3\.\s*WHAT EVIDENCE TO PRESERVE[:\s]*([\s\S]*?)(?=\n\s*4\.|$)/i
  );
  if (evidenceMatch) sections.evidence = evidenceMatch[1].trim();

  const helpMatch = cleaned.match(
    /4\.\s*WHERE TO GET HELP[:\s]*([\s\S]*?)(?=\n\s*5\.|$)/i
  );
  if (helpMatch) sections.help = helpMatch[1].trim();

  const referencesMatch = cleaned.match(
    /5\.\s*LEGAL REFERENCES[:\s]*([\s\S]*?)$/i
  );
  if (referencesMatch) sections.references = referencesMatch[1].trim();

  return sections;
}