import { LegalAdviceResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const MOCK_RESPONSE: LegalAdviceResponse = {
  advice: `1. YOUR RIGHTS IN THIS SITUATION
You have the right to communicate with a lawyer and family immediately upon arrest (Constitution of Kenya, Article 49(1)(b)). The police cannot deny you this right.

2. WHAT TO DO RIGHT NOW
- Clearly and calmly state: I am invoking my right to call a lawyer under Article 49 of the Constitution.
- Ask to speak to the officer in charge of the station.
- If refused, remember the names and badge numbers of officers involved.

3. WHAT EVIDENCE TO PRESERVE
- Note the exact time you requested access to a lawyer and were denied.
- Remember names and badge numbers of officers.
- Get witness contacts if anyone else was present.

4. WHERE TO GET HELP
- IPOA hotline: 0800 720 990 (free)
- Legal Aid: 0800 720 903
- Law Society of Kenya: 0719 112 000

5. LEGAL REFERENCES
- Constitution of Kenya, Article 49(1)(b): right to communicate with a lawyer.
- Criminal Procedure Code, Section 36A: 24-hour rule before court.`,
  sources: ['Constitution of Kenya', 'Criminal Procedure Code', 'IPOA Act'],
  disclaimer: 'This is legal information only and not a substitute for professional legal advice. In case of emergency, call 999 or contact IPOA on 0800 720 990.',
  response_time_ms: 0,
};

export async function getLegalAdvice(scenario: string): Promise<LegalAdviceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenario,
        language: 'en',
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching legal advice:', error);
    // Return mock response on any error (network error, API down, etc.)
    return MOCK_RESPONSE;
  }
}
